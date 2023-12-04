import React from 'react';
import SpecimenAPI from '../../services/SpecimenAPI';
import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react'
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
            console.log(data[0])

        }catch(error){
            console.error('Error catching specimen:', error)
        }

    }

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];



    return(
        <div className='specimen-container'>
            {specimen.map(s =>{
                return(
                <div className='specimen-item'>
                    <p><strong>Species:</strong> {s.species}</p>
                    <p><strong>Genus:</strong> {s.genus}</p>
                    <p><strong>Collection Date:</strong> {new Date(s.collection_date).getDate()} {monthNames[new Date(s.collection_date).getMonth()]} {new Date(s.collection_date).getFullYear()}</p>
                    <p><strong>Collection Location:</strong> {s.state_provenance}, {s.country}</p>  

                    <div className='specimen-buttons'>
                        <Button className="specimen-button" colorScheme='teal'>Edit</Button>
                        <Button className="specimen-button" colorScheme='teal'>Delete</Button>
                    </div>  
                </div>

                
                )
            })}

        </div>
    )
}