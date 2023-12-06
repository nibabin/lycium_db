import { pool } from '../config/database.js';

const addLocation = async(req, res) =>{
    try{
        
        const {specimen_id, provenance, country, state_provenance, lat, long, specific_locality} = req.body;

        const query = `
        INSERT INTO location (specimen_id, provenance, country, state_provenance, lat, long, specific_locality)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `

        const result = await pool.query(query, [specimen_id, provenance, country, state_provenance, lat, long, specific_locality]);
        res.status(200).json(result.rows);
    }catch(error){
        res.status(409).json({error: error.message})
    }
}

export default {
    addLocation
}