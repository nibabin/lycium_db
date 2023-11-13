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



export default{
    getSpecimen,
    getSpecimenInfoById
}