import React, {useState} from 'react'
import '../css/Filter.css'
import { Button, Select, Input } from '@chakra-ui/react'
import AddButton from './AddButton'
import FilterOption from './FilterOption'
import SpecimenAPI from '../../services/SpecimenAPI';

export default function Filter(){

    const defaultCurFilter = {
        "parameter": '',
        'operator': '',
        'value': '',
    }
    
    const [currentFilters, setCurrentFilters] = useState([
        {
            "parameter": '',
            'operator': '',
            'value': '',
        }
    ])

    const [existingFilters, setExistingFilters] = useState([
        {
            name: 'Specimen',
            value: 'specimen',
            radioOptions: [
                'equal',
                'contains'
            ]
        },
    ])

    const possibleFilters = [
        {
            name: 'Genus',
            value: 'genus',
            radioOptions: [
                'equal',
                'contains',
            ]
        },
        {
            name: 'Specimen',
            value: 'specimen',
            radioOptions: [
                'equal',
                'contains'
            ]
        },
        {
            name: 'Field ID',
            value: 'field_id',
            radioOptions: [
                'equal',
                'contains'
            ]
        },
        {
            name: 'Greenhouse',
            value: 'greenhouse',
            radioOptions: [
                'equal',
                'contains'
            ]
        },
        {
            name: 'Voucher',
            value: 'voucher',
            radioOptions: [
                'equal',
                'contains'
            ]
        },
        {
            name: 'Collection Date',
            value: 'collection_date',
            radioOptions: [
                'equal',
                'contains',
                'greater',
                'less'
            ]
        },
        {
            name: 'Provenance',
            value: 'provenance',
            radioOptions: [
                'equal',
                'contains'
            ]
        },
        {
            name: 'Country',
            value: 'country',
            radioOptions: [
                'equal',
                'contains'
            ]
        },
        {
            name: 'State',
            value: 'state',
            radioOptions: [
                'equal',
                'contains'
            ]
        },
        {
            name: 'Specific Local',
            value: 'specific_local',
            radioOptions: [
                'equal',
                'contains'
            ]
        },
        {
            name: 'Latitude',
            value: 'latitude',
            radioOptions: [
                'equal',
                'contains'
            ]
        },
        {
            name: 'Longitude',
            value: 'longitude',
            radioOptions: [
                'equal',
                'contains',
                'less', 
                'greater'
            ]
        },
        {
            name: 'Notes',
            value: 'notes',
            radioOptions: [
                'equal',
                'contains'
            ]
        },
        {
            name: 'Nanodrop Concentration',
            value: 'nanodrop_concentration',
            radioOptions: [
                'equal',
                'contains',
                'greater',
                'less'
            ]
        },
        {
            name: 'Nanodrop Ratio',
            value: 'nanodrop_ratio',
            radioOptions: [
                'equal',
                'contains',
                'greater',
                'less'
            ]
        },
        {
            name: 'Published',
            value: 'published',
            radioOptions: [
                'equal',
            ]
        },
    ]

    const submitFilters = async() =>{
        const jsonArray = JSON.stringify(currentFilters);
        console.log(jsonArray)
        const x = await SpecimenAPI.getFilteredSpecimen(currentFilters)
        console.log(x)
    }

    const addDefaultFilter = () =>{
        const tempFilter = possibleFilters[0]
        setExistingFilters([...existingFilters, tempFilter])
        setCurrentFilters([...currentFilters, defaultCurFilter]) 
    }

    const onFilterOptionChange = (type, value, index) =>{
        console.log(type, value, index)
        const tempFilters = [...currentFilters]
        tempFilters[index][type] = value
        setCurrentFilters(tempFilters)
        console.log(tempFilters)
    }

    const onFilterOptionClear = () =>{
        setCurrentFilters([defaultCurFilter])
        setExistingFilters([possibleFilters[0]])
    }
    return(
        <div className='filter'>
            <Button className colorScheme='teal' onClick={addDefaultFilter}>Add Filter</Button>
            {existingFilters.map((filter, idx) => (
                <FilterOption key={idx} index={idx} onChange={onFilterOptionChange} possibleFilters={possibleFilters}/>
            ))}
            <div>
                <AddButton colorScheme='teal'>Add Specimen</AddButton>
                <Button onClick={submitFilters} colorScheme='teal'>Submit Filters</Button>
                <Button onClick={onFilterOptionClear} colorScheme='teal'>Clear Filters</Button>
            </div>
        </div>
    )
}