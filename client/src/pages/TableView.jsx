import React from 'react'
import '../css/TableView.css'
import SpecimenAPI from '../../services/SpecimenAPI';
import { useState, useEffect } from 'react';

export default function TableView(){

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
        <table className="table">
            <thead>
                <tr>               
                    <th>DNA Extractions</th>
                    <th>GENUS</th>
                    <th>SPECIES</th>
                    <th>FIELD_POP ID</th>
                    <th>GREENHOUSE</th>
                    <th>VOUCHER SPECIMEN</th>
                    <th>COLLECTION DATE</th>
                    <th>PROVENANCE</th>
                    <th>COUNTRY</th>
                    <th>STATE_PROVINCE</th>
                    <th>SPECIFIC LOCALITY</th>
                    <th>LATITUDE</th>
                    <th>LONGITUDE</th>
                    <th>NOTES</th>
                    <th>MATERIAL</th>
                    <th>NANODROP CONCENTRATION (ng/uL)</th>
                    <th>NANODROP 260:280 RATIO</th>
                    <th>PUBLISHED</th>

                </tr>
            </thead>

            <tbody>
                {specimen.map((item, index) => (
                <tr key={index}>
                    <td>Add Extractions</td>
                    <td>{item.genus}</td>
                    <td>{item.species}</td>
                    <td>{item.field_pop_id}</td>
                    <td>{item.greenhouse}</td>
                    <td>{item.voucher_specimen}</td>
                    <td>{item.collection_date}</td>
                    <td>{item.provenance}</td>
                    <td>{item.country}</td>
                    <td>{item.state_province}</td>
                    <td>{item.specific_locality}</td>
                    <td>{item.latitude}</td>
                    <td>{item.longitude}</td>
                    <td>{item.notes}</td>
                    <td>{item.material}</td>
                    <td>{item.nanodrop_concentration}</td>
                    <td>{item.nanodrop_ratio}</td>
                    <td>{item.published ? 'Yes' : 'No'}</td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}