import { pool } from '../config/database.js'

const getSpecimen = async(req, res) =>{
    try{
        const result = await pool.query('SELECT * FROM specimen');
        res.status(200).json(result.rows);
    }catch(error){
        res.status(400).json( { error: error.message } )
    }
}

export default{
    getSpecimen,
}