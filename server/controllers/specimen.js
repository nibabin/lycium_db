import { pool } from '../config/database.js'

function parseGenomicsString(genomicsString) {
    if(!genomicsString){
        return []
    }
    const genomicsArray = genomicsString.split(', '); // Split by comma and space
  
    const genomicsData = genomicsArray.map((entry) => {
      const [extraction_number, extraction_date] = entry.split(':'); // Split each entry by colon
      return { extraction_number: extraction_number, extraction_date };
    });
  
    return genomicsData;
}



const getFilteredSpecimen = async(req, res) =>{
    try{
        const filterParameters = req.body.filterParameters;
        let query = `SELECT * FROM SpecimenData \n`

        let addAnd = false
        let val = 1

        // console.log(filterParameters)

        for (const filter of filterParameters){

            // console.log(filter)
            let operator = filter.operator;
            let value = filter.value

            switch (filter.operator) {
                case 'equal':
                  operator = '=';
                  value = filter.value;
                  break;
                case 'greater':
                  operator = '>';
                  value = filter.value;
                  break;
                case 'smaller':
                  operator = '<';
                  value = filter.value;
                  break;
                case 'contains':
                  operator = 'LIKE';
                  value = `%${filter.value}%`; // For partial matches with LIKE operator
                  break;
                
            }

            if(addAnd){
                //if it's a string
                if(isNaN(value)){
                    query += ` AND ${filter.parameter} ${operator} '${value}'`
                }else{
                    query += ` AND ${filter.parameter} ${operator} ${value}`
                }
                
            }else{
                //if it's a string
                if(isNaN(value)){
                    query += `WHERE ${filter.parameter} ${operator} '${value}'`;

                }else{
                    query += `WHERE ${filter.parameter} ${operator} ${value}`;
                }
                
            }
            

            // console.log(query)
            addAnd = true
            val +=1
        }

        console.log(query);

        const result = await pool.query(query);
        res.status(200).json(result.rows);

    }catch(error){
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
        // the string is represented in this way: (extraction_number:extraction_date, extraction_number:extraction_date format)
        const genomicsData = parseGenomicsString(formData.genomics_string); 

        console.log(genomicsData)

        if(genomicsData){
            for (const genomicsEntry of genomicsData) {
                const genomicsQuery = `
                INSERT INTO Genomics (extraction_number, extraction_date, specimen_id)
                VALUES ($1, $2, $3)
                RETURNING genomic_id`;
          
                const genomicRes = await pool.query(genomicsQuery, [
                  genomicsEntry.extraction_number,
                  genomicsEntry.extraction_date,
                  specimenId,
                ]);

                console.log('genomic_id', genomicRes.rows[0].genomic_id)
            }

        }
        
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

        console.log('gentics id', geneticsId)

        //update a specimen with this genetics data
        const specimenQuery = `
        UPDATE Specimen 
      SET genetics_id = $1, material = $2, notes = $3, collection_date = $4, voucher_specimen = $5,
          greenhouse = $6, field_pop_id = $7, published = $8, nanodrop_concentration = $9, nanodrop_ratio = $10
      WHERE specimen_id = $11
        `;

        await pool.query(specimenQuery, [
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
            specimen_id
        ]);


        //create a location entry for the new specimen
        const locationQuery = `
      INSERT INTO Location (specimen_id, provenance, country, state_provenance, specific_locality, lat, long)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING location_id
      `;

        const locationResult = await pool.query(locationQuery, [
            specimen_id,
            formData.provenance,
            formData.country,
            formData.state_provenance,
            formData.specific_locality,
            formData.lat,
            formData.long,
        ]);

        console.log('location_id', locationResult.rows[0].location_id)

        // handle the string with genomics data
        // the string is represented in this way: (extraction_number:extraction_date, extraction_number:extraction_date format)
        const genomicsData = parseGenomicsString(formData.genomics_string); 

        console.log(genomicsData)

        if(genomicsData){
            for (const genomicsEntry of genomicsData) {
                const genomicsQuery = `
                INSERT INTO Genomics (extraction_number, extraction_date, specimen_id)
                VALUES ($1, $2, $3)
                RETURNING genomic_id`;
          
                const genomicRes = await pool.query(genomicsQuery, [
                  genomicsEntry.extraction_number,
                  genomicsEntry.extraction_date,
                  specimen_id,
                ]);

                console.log('genomic_id', genomicRes.rows[0].genomic_id)
            }

        }
        
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