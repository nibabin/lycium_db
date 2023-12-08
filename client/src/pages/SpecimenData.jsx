import React from 'react';
import SpecimenAPI from '../../services/SpecimenAPI';
import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function SpecimenData(){
    const { id } = useParams();
    console.log(id)
    const [specimen, setSpecimen] = useState([]);

    useEffect(()=>{
        fetchSpecimen()
    }, [SpecimenAPI])



    const fetchSpecimen = async() =>{
        try{
            const data = await SpecimenAPI.getSpecimenById(id)
            setSpecimen(data)

        }catch(error){
            console.error('Error catching species:', error)
        }
    }


    return(
        <div className=''>
            <p>{specimen.genus}</p>
        </div>
    )
}