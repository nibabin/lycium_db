import React from 'react';
import SpecimenAPI from '../../services/SpecimenAPI';
import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react'
import '../css/SpecimenList.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function SpecimenList(){
    const { id } = useParams();
    console.log(id)
    const [specimen, setSpecimen] = useState([]);

    useEffect(()=>{
        fetchSpecimen()
    }, [SpecimenAPI])

    const fetchSpecimen = async() =>{
        try{
            const data = await SpecimenAPI.getFilteredSpecimen({
                filterParameters:[
                    {
                        "type": "filter",
                        "parameter": "genetics_id",
                        "operator": "equal",
                        "value": id
                    }
                ]
            })

            console.log(data)

            setSpecimen(data)
            console.log(data[0])

        }catch(error){
            console.error('Error catching specimen:', error)
        }

    }

    let navigate = useNavigate(); 
    const handleViewSpecimenClick = (id) =>{ 
        let path = `/specimen/${id}`; 
        navigate(path);
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
                        <Button onClick={() => handleViewSpecimenClick(s.specimen_id)} className="specimen-button" colorScheme='teal'>View</Button>
                        <Button className="specimen-button" colorScheme='teal'>Delete</Button>
                    </div>  
                </div>

                
                )
            })}

        </div>
    )
}