import React from 'react';
import SpecimenAPI from '../../services/SpecimenAPI';
import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function SpecimenData(){
    const { id } = useParams();
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

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];


    return(
        <div className=''>
            <p><strong>Genus</strong>: {specimen.genus}</p>
            <p><strong>Species</strong>: {specimen.species}</p>
            <p><strong>Extraction Number</strong>: {specimen.extraction_number}</p>
            <p><strong>Extraction Date</strong>: {specimen.extraction_date}</p>
            <p><strong>Field ID</strong>: {specimen.field_pop_id}</p>
            <p><strong>Greenhouse</strong>: {specimen.greenhouse}</p>
            <p><strong>Voucher</strong>: {specimen.voucher_specimen}</p>
            <p><strong>Collection Date:</strong> {new Date(specimen.collection_date).getDate()} {monthNames[new Date(specimen.collection_date).getMonth()]} {new Date(specimen.collection_date).getFullYear()}</p>
            <p><strong>Provenance</strong>: {specimen.provenance}</p>
            <p><strong>Country</strong>: {specimen.country}</p>
            <p><strong>State Provenance</strong>: {specimen.state_province}</p>
            <p><strong>Specific Local</strong>: {specimen.specific_locality}</p>
            <p><strong>Latitude</strong>: {specimen.latitude}</p>
            <p><strong>Longitude</strong>: {specimen.longitude}</p>
            <p><strong>Notes</strong>: {specimen.notes}</p>
            <p><strong>Material</strong>: {specimen.material}</p>
            <p><strong>Nanodrop Concentration</strong>: {specimen.nanodrop_concentration}</p>
            <p><strong>Nanodrop Ratio</strong>: {specimen.nanodrop_ratio}</p>
            <p><strong>Published</strong>: {specimen.published}</p>
        </div>
    )
}