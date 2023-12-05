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

const getLocationByParams = async(req, res) =>{
    try{
        const {provenance, country, state_provenance, lat, long} = req.body;
        const query = `
        SELECT location_id
        FROM location
        WHERE provenance = $1 AND country = $2 AND state_provenance = $3 AND lat = $4 AND long = $5
        `

        const result = await pool.query(query, [provenance, country, state_provenance, lat, long]);
        res.status(200).json(result.rows);

    }catch(error){
        res.status(409).json({error: error.message})
    }
}


const addLocation = async(req, res) =>{
    try{
        const location_id = generateRandomString(25);

        const {provenance, country, state_provenance, lat, long, specific_locality} = req.body;

        const query = `
        INSERT INTO location (location_id, provenance, country, state_provenance, lat, long, specific_locality)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `

        const result = await pool.query(query, [location_id, provenance, country, state_provenance, lat, long, specific_locality]);
        res.status(200).json(result.rows);
    }catch(error){
        res.status(409).json({error: error.message})
    }
}

export default {
    getLocationByParams, 
    addLocation
}