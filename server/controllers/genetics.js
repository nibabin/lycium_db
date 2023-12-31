import { pool } from '../config/database.js';

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

const getGenetics = async(req, res) =>{
    try{

        const query = `
        SELECT genetics_id, species, genus
        FROM genetics;`
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    }catch(error){
        res.status(409).json({error: error.message})
    }
}

const addGenetics = async(req, res) =>{
    try{

        const {species, genus} = req.body;

        const query = `
        INSERT INTO genetics (species, genus)
        VALUES ($1, $2);
        `
        
        const result = await pool.query(query, [species, genus]);
        res.status(200).json(result.rows);
        return;

        

    }catch(error){
        res.status(409).json({error: error.message});
        return;
    }
}

export default {
    getGeneticsByParams, 
    addGenetics,
    getGenetics
};