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

const getGeneticsByParams = async(req, res) =>{
    try{
        const {species, genus} = req.body

        const query = `
        SELECT genetics_id
        FROM genetics
        WHERE species = $1 AND genus = $2;
        `
        const result = await pool.query(query, [species, genus]);
        res.status(200).json(result.rows);

        


    }catch(error){
        res.status(409).json({error: error.message})
    }
}

const addGenetics = async(req, res) =>{
    try{
        const genetics_id = generateRandomString(25);

        const {species, genus} = req.body;

        const query = `
        INSERT INTO genetics (genetics_id, species, genus)
        VALUES ($1, $2, $3);
        `
        
        const result = await pool.query(query, [genetics_id, species, genus]);
        res.status(200).json(result.rows);
        return;

        

    }catch(error){
        res.status(409).json({error: error.message});
        return;
    }
}

export default {
    getGeneticsByParams, 
    addGenetics
};