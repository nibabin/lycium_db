import { pool } from '../config/database.js'



/**
 * 
 * {
    "filterParameters":[
        {
            "type":"sorting", 
            "value":"", 
            "parameter":"genus", 
            "operator":"ASC"
        }, 
        {
            "type":"filtering", 
            "parameter":"country", 
            "operator":"=",
            "value":"South Africa"
        }, 
        {
            "type":"filtering", 
            "parameter":"genus", 
            "operator":"contains",
            "value":"l"
        }
    ]
}
 * 
 */
const getFilteredSpecimen = async(req, res) =>{
    try{
        console.log("starting")
        const params = req.body.filterParameters;

        //define the initial query
        let query = `SELECT * FROM SpecimenData \n`

        let filterQuery = ``
        let sortingQuery = `ORDER BY`

        //variables to compose the query
        let addAnd = false
        let val = 0
        let addComma = false

        //iterate through every parameter and change initial query due to them 
        for (const param of params){
            //apply sorting logic
            const type = param.type
            if(type == 'sorting'){
                const operator = param.operator;
                const parameter = param.parameter

                if(addComma){
                    sortingQuery += `, ${parameter} ${operator}`

                }else{
                    sortingQuery += ` ${parameter} ${operator}`
                    addComma = true
                }

            }else{
                //apply filtering logic
                let operator = param.operator;
                let value = param.value

                switch (param.operator) {
                    case 'equal':
                        operator = '=';
                        value = param.value;
                        break;
                    case 'greater':
                        operator = '>';
                        value = param.value;
                        break;
                    case 'smaller':
                        operator = '<';
                        value = param.value;
                        break;
                    case 'contains':
                        operator = 'LIKE';
                        value = `%${param.value}%`; // For partial matches with LIKE operator
                        break;
                    
                }

                if(addAnd){
                    //if it's a string
                    if(isNaN(value)){
                        filterQuery += ` AND ${param.parameter} ${operator} '${value}'`
                    }else{
                        filterQuery += ` AND ${param.parameter} ${operator} ${value}`
                    }
                    
                }else{
                    //if it's a string
                    if(isNaN(value)){
                        filterQuery += `WHERE ${param.parameter} ${operator} '${value}'`;

                    }else{
                        filterQuery += `WHERE ${param.parameter} ${operator} ${value}`;
                    }
                    
                }
            
                addAnd = true
                val +=1
            }            
        }

        //append both queries to the initial query
        if(filterQuery){
            query += filterQuery
            query += '\n'
        }
        
        if(sortingQuery != `ORDER BY`){
            query += sortingQuery
        }
        

        console.log(query);

        const result = await pool.query(query);
        res.status(200).json(result.rows);

    }catch(error){
        console.log(error)
        res.status(400).json( { error: error.message } )
    }
}
  


const getSpecimen = async(req, res) =>{
    try{

        const query = `SELECT * FROM SpecimenData;`

        const result = await pool.query(query);
        res.status(200).json(result.rows);
    }catch(error){
        res.status(400).json( { error: error.message } )
    }
}

const getSpecimenInfoById = async(req, res) =>{
    try{
        const specimen_id = req.params.specimen_id
        const query = `SELECT * FROM SpecimenData
                    WHERE specimen_id = $1;
                    `

        const result = await pool.query(query, [specimen_id])
        res.status(200).json(result.rows[0])

    }catch(error){
        res.status(409).json({error: error.message})        
    }
}


const addSpecimen = async(req, res) =>{
    try{

        const formData = req.body

        //check if this genetics already exist and if no - create a new one
        const geneticsQuery = 'SELECT genetics_id FROM Genetics WHERE genus = $1 AND species = $2';
        const geneticsResult = await pool.query(geneticsQuery, [formData.genus, formData.species]);


        let geneticsId;

        if (geneticsResult.rows.length > 0) {
            geneticsId = geneticsResult.rows[0].genetics_id;
        } else {
            // Step 2: Create new Genetics entry if not found
            const newGeneticsQuery = 'INSERT INTO Genetics (genus, species) VALUES ($1, $2) RETURNING genetics_id';
            const newGeneticsResult = await pool.query(newGeneticsQuery, [formData.genus, formData.species]);
            geneticsId = newGeneticsResult.rows[0].genetics_id;
        }

        console.log('gentics id', geneticsId)

        //create a specimen with this genetics data
        const specimenQuery = `
        INSERT INTO Specimen (genetics_id, material, notes, collection_date, voucher_specimen, greenhouse, field_pop_id, published, nanodrop_concentration, nanodrop_ratio)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING specimen_id
        `;

        const specimenResult = await pool.query(specimenQuery, [
            geneticsId,
            formData.material,
            formData.notes,
            formData.collection_date,
            formData.voucher_specimen,
            formData.greenhouse,
            formData.field_pop_id,
            formData.published,
            formData.nanodrop_concentration,
            formData.nanodrop_ratio,
          ]);

        const specimenId = specimenResult.rows[0].specimen_id;

        console.log('specimen id', specimenId)

        //create a location entry for the new specimen
        const locationQuery = `
      INSERT INTO Location (specimen_id, provenance, country, state_provenance, specific_locality, lat, long)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING location_id
      `;

        const locationResult = await pool.query(locationQuery, [
            specimenId,
            formData.provenance,
            formData.country,
            formData.state_provenance,
            formData.specific_locality,
            formData.lat,
            formData.long,
        ]);

        console.log('location_id', locationResult.rows[0].location_id)

        // handle the string with genomics data
        const extraction_number = formData.extraction_number
        const extraction_date = formData.extraction_date

        const genomicsQuery = `
                INSERT INTO Genomics (extraction_number, extraction_date, specimen_id)
                VALUES ($1, $2, $3)
                RETURNING genomic_id
                `;
          
        const genomicRes = await pool.query(genomicsQuery, [
            extraction_number, 
            extraction_date,
            specimenId,
        ]);

        console.log('genomic_id', genomicRes.rows[0].genomic_id)

        
        res.status(200).json()
        return { success: true, specimenId };

    }catch(error){
        res.status(409).json({error: error.message})
        return { success: false, error: error.message };

    }
}


 
const deleteSpecimen = async(req, res) =>{
    try{
        const specimen_id = req.params.specimen_id
        const query = `DELETE FROM specimen
                        WHERE specimen_id = $1
                    `
        await pool.query(query, [specimen_id])
        res.status(200).json({})

    }catch(error){
        res.status(409).json({error: error.message})
    }
}

const updateSpecimen = async(req, res) =>{
    try{

        const specimen_id = req.params.specimen_id
        const formData = req.body

        //check if this genetics already exist and if no - create a new one
        const geneticsQuery = 'SELECT genetics_id FROM Genetics WHERE genus = $1 AND species = $2';
        const geneticsResult = await pool.query(geneticsQuery, [formData.genus, formData.species]);


        let geneticsId;

        if (geneticsResult.rows.length > 0) {
            geneticsId = geneticsResult.rows[0].genetics_id;
        } else {
            // Step 2: Create new Genetics entry if not found
            const newGeneticsQuery = 'INSERT INTO Genetics (genus, species) VALUES ($1, $2) RETURNING genetics_id';
            const newGeneticsResult = await pool.query(newGeneticsQuery, [formData.genus, formData.species]);
            geneticsId = newGeneticsResult.rows[0].genetics_id;
        }

        

        // update the specimen
        const specimenUpdate = `
        UPDATE Specimen
        SET material = $1,
            notes = $2,
            collection_date = $3,
            voucher_specimen = $4,
            greenhouse = $5,
            field_pop_id = $6,
            published = $7,
            nanodrop_concentration = $8,
            nanodrop_ratio = $9,
            genetics_id = $10
        WHERE specimen_id = $11;
        `

        await pool.query(specimenUpdate, [formData.material, formData.notes, formData.collection_date, formData.voucher_specimen, 
        formData.greenhouse, formData.field_pop_id, formData.published, formData.nanodrop_concentration, formData.nanodrop_ratio, geneticsId, specimen_id])


    
       //update location of this specimen       
       const LocationUpdate = `
       UPDATE Location 
       SET provenance = $1,
            country = $2,
            state_provenance = $3,
            specific_locality = $4,
            lat  = $5,
            long = $6
        WHERE specimen_id = $7;           
       `

       await pool.query(LocationUpdate, [formData.provenance, formData.country, formData.state_provenance, formData.specific_locality, 
        formData.lat, formData.long, specimen_id
    ])

    //update DNA extraction of this specimen
    const genomicsUpdate = `
    UPDATE Genomics
    SET extraction_number = $1,
    extraction_date =$2
    WHERE specimen_id = $3;     
    `
    
    await pool.query(genomicsUpdate, [formData.extraction_number, formData.extraction_date, specimen_id])

    res.status(200).json()
    return { success: true, specimen_id };
       
    }catch(error){
        res.status(409).json({error: error.message})
        return { success: false, error: error.message };

    }
}
  

export default{
    getSpecimen,
    getSpecimenInfoById, 
    deleteSpecimen, 
    addSpecimen, 
    updateSpecimen, 
    getFilteredSpecimen
}