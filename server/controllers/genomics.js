import { pool } from '../config/database.js';

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}
  

const getSpecimenGenomics = async(req, res) =>{
    try{
        const specimen_id = req.params.specimen_id;
        const query = `
                    SELECT extraction_number, extraction_date
                    FROM genomics g
                    WHERE g.specimen_id = $1
                    `

        const result = await pool.query(query, [specimen_id])
        res.status(200).json(result.rows);


    }catch(error){
        res.status(409).json({error: error.message})               
    }
}

const addGenomicNumber = async(req, res) =>{
    try{
        const specimen_id = req.params.specimen_id;
        const {extraction_number, extraction_date} = req.body;
        const genomic_id = generateRandomString(25);
        const result = await pool.query(`
                                        INSERT INTO genomics (extraction_number, specimen_id, extraction_date, genomic_id)
                                        VALUES ($1, $2, $3, $4)
                                        RETURNING *
                                        `, [extraction_number, specimen_id, extraction_date, genomic_id])
        res.status(200).json(result.rows[0])

    }catch(error){
        res.status(409).json( { error: error.message } )
    }
}

const deleteGenomicNumber = async(req, res) =>{
    try{
        const genomic_id = req.params.specimen_id;
        const query= `
                    DELETE FROM genomics
                    WHERE genomic_id = $1
                    `

        const result = await pool.query(query, [genomic_id])
        res.status(200).json(result.rows)

    }catch(error){
        res.status(409).json( { error: error.message } )
    }
}

export default {
    getSpecimenGenomics, 
    deleteGenomicNumber,
    addGenomicNumber
}