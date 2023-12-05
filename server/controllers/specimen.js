import { pool } from '../config/database.js'

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
  


const getSpecimen = async(req, res) =>{
    try{
        const query = `SELECT *
                        FROM specimen s
                        JOIN genetics g ON s.genetics_id = g.genetics_id
                        JOIN location l ON s.location_id = l.location_id
                    `

        const result = await pool.query(query);
        res.status(200).json(result.rows);
    }catch(error){
        res.status(400).json( { error: error.message } )
    }
}

const getSpecimenInfoById = async(req, res) =>{
    try{
        const specimen_id = req.params.specimen_id
        const query = `SELECT *
                        FROM specimen s
                        JOIN genetics g ON s.genetics_id = g.genetics_id
                        JOIN location l ON s.location_id = l.location_id
                        WHERE s.specimen_id = $1
        
                    `

        const result = await pool.query(query, [specimen_id])
        res.status(200).json(result.rows[0])

    }catch(error){
        res.status(409).json({error: error.message})        
    }
}


const addSpecimen = async(req, res) =>{
    try{
        const specimen_id = generateRandomString(25);
        const {location_id, genetics_id, material, 
        notes, collection_date, 
    voucher_specimen, greenhouse, field_pop_id, published, nanodrop_concentration, 
    nanodrop_ratio} = req.body
        const result = await pool.query(`
            INSERT INTO specimen (specimen_id, location_id, genetics_id, material, 
                notes, collection_date, 
            voucher_specimen, greenhouse, field_pop_id, published, nanodrop_concentration, 
        nanodrop_ratio)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
        `, [specimen_id, location_id, genetics_id, material, 
            notes, collection_date, 
        voucher_specimen, greenhouse, field_pop_id, published, nanodrop_concentration, 
    nanodrop_ratio])
    res.status(200).json(result.rows[0])


    }catch(error){
        res.status(409).json({error: error.message})

    }
}


 
const deleteSpecimen = async(req, res) =>{
    try{
        const specimen_id = req.params.specimen_id
        const query = `DELETE FROM specimen
                        WHERE specimen_id = $1
                    `
        const result = await pool.query(query, [specimen_id])
        res.status(200).json(result.rows[0])
        
    }catch(error){
        res.status(409).json({error: error.message})
    }
}

const updateSpecimen = async (req, res) => {
    try {
        const specimen_id = req.params.specimen_id
      const { location_id, genetics_id, material, 
        notes, collection_date, voucher_specimen, greenhouse, field_pop_id, published, 
        nanodrop_concentration, nanodrop_ratio } = req.body;
  
      const result = await pool.query(`
        UPDATE specimen
        SET location_id = $2, genetics_id = $3, material = $4, 
        notes = $5, collection_date = $6, voucher_specimen = $7, 
        greenhouse = $8, field_pop_id = $9, published = $10, 
        nanodrop_concentration = $11, nanodrop_ratio = $12
        WHERE specimen_id = $1
        RETURNING *
      `, [specimen_id, location_id, genetics_id, material, 
          notes, collection_date, voucher_specimen, greenhouse, 
          field_pop_id, published, nanodrop_concentration, nanodrop_ratio]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Specimen not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

export default{
    getSpecimen,
    getSpecimenInfoById, 
    deleteSpecimen, 
    addSpecimen, 
    updateSpecimen
}