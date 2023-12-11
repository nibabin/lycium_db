import React from 'react';
import SpecimenAPI from '../../services/SpecimenAPI';
import { useState, useEffect } from 'react';
import { Button, Spinner } from '@chakra-ui/react'
import '../css/SpecimenList.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function SpecimenList(){
    const { id } = useParams();
    const [specimen, setSpecimen] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            setSpecimen(data)
            setIsLoading(false)
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

      return (
        <div>
          {isLoading ? (
            <Spinner className="spinner" size="xl" />
          ) : specimen.length === 0 ? (
            <p>No specimens found.</p>
          ) : <div className='specimen-container'> 
              {specimen.map((s) => (
                <div className='specimen-item' key={s.specimen_id}>
                  <p>
                    <strong>Species:</strong> {s.species}
                  </p>
                  <p>
                    <strong>Genus:</strong> {s.genus}
                  </p>
                  <p>
                    <strong>Collection Date:</strong>{' '}
                    {new Date(s.collection_date).getDate()}{' '}
                    {monthNames[new Date(s.collection_date).getMonth()]}{' '}
                    {new Date(s.collection_date).getFullYear()}
                  </p>
                  <p>
                    <strong>Collection Location:</strong>{' '}
                    {s.state_provenance}, {s.country}
                  </p>
      
                  <div className='specimen-buttons'>
                    <Button
                      onClick={() => handleViewSpecimenClick(s.specimen_id)}
                      className="specimen-button"
                      colorScheme='teal'
                    >
                      View
                    </Button>
                    <Button className="specimen-button" colorScheme='teal'>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
              </div>}
        </div>
      );
      
}