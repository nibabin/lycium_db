import { pool } from '../config/database.js'

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

const getSpecimenById = async(req, res) =>{

}

export default{
    getSpecimen,
}