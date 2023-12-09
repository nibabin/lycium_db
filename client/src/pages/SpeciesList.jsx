import React from 'react';
import GeneticsAPI from '../../services/GeneticsAPI';
import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react'
import '../css/SpeciesList.css'
import { useNavigate } from 'react-router-dom';


export default function SpeciesList(){
    const [species, setSpecies] = useState([]);

    useEffect(()=>{
        fetchSpecies()

    }, [GeneticsAPI])

    const fetchSpecies = async() =>{
        try{
            const data = await GeneticsAPI.getAllGenetics({})
            setSpecies(data)
        }catch(error){
            console.error('Error catching species:', error)
        }
    }


    let navigate = useNavigate(); 
    const handleViewSpecimenClick = (id) =>{ 
        let path = `/species/${id}`; 
        navigate(path);
    }

    return(
        <div className='species-container'>
            {species.length === 0 && <p>No species found.</p>}
            {species.map((s, idx) => {
                return (
                    <div key={idx} className='species-item'>
                        <p><strong>Species</strong>: {s.species}</p>
                        <p><strong>Genus</strong>: {s.genus}</p>
                        <Button className="species-button" onClick={() => handleViewSpecimenClick(s.genetics_id)} colorScheme='teal'>View Specimen</Button>
                    </div>
                );
            })}

        </div>
    )
}