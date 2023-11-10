import React from 'react';
import SpecimenAPI from '../../services/SpecimenAPI';
import { useState, useEffect } from 'react';
import '../css/SpecimenList.css'


export default function SpecimenList(){
    const [specimen, setSpecimen] = useState([]);

    useEffect(()=>{
        fetchSpecimen()

    }, [SpecimenAPI])



    const fetchSpecimen = async() =>{
        try{
            const data = await SpecimenAPI.getAllSpecimen()
            setSpecimen(data)

        }catch(error){
            console.error('Error catching specimen:', error)
        }

    }



    return(
        <div className='specimen-container'>
            {specimen.map(s =>{
                return(
                <div className='specimen-item'>
                    <p>{s.collection_date}</p>
                    <p>{s.specimen_id}</p>
                    
                </div>
                )
            })}
        </div>
    )
}