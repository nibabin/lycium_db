import React from 'react';
import GeneticsAPI from '../../services/GeneticsAPI';
import { useState, useEffect } from 'react';
import { Button, Spinner } from '@chakra-ui/react'
import '../css/SpeciesList.css'
import { useNavigate } from 'react-router-dom';


export default function SpeciesList(){
    const [species, setSpecies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
        fetchSpecies()

    }, [GeneticsAPI])

    const fetchSpecies = async() =>{
        try{
            const data = await GeneticsAPI.getAllGenetics({})
            setSpecies(data.filter(s => (s.species || s.genus)))
            setIsLoading(false)
        }catch(error){
            console.error('Error catching species:', error)
            setIsLoading(false)
        }
    }


    let navigate = useNavigate(); 
    const handleViewSpecimenClick = (id) =>{ 
        let path = `/species/${id}`; 
        navigate(path);
    }

    return(
        <div className='species-container'>
            {isLoading && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Spinner className="spinner" size="xl" />
                </div>
            )}
            {!isLoading && species.length === 0 && <p>No species found.</p>}
            {!isLoading && species.map((s, idx) => {
                return ( 
                    <div key={idx} className='species-item'>
                        <p><strong>Species</strong>: {s.species}</p>
                        <p><strong>Genus</strong>: {s.genus}</p>
                        <Button className="species-button" onClick={() => handleViewSpecimenClick(s.genetics_id)} colorScheme='teal'>View Specimen</Button>
                    </div>
                ) 
            })}

        </div>
    )
}