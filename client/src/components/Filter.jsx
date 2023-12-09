import React, {useState} from 'react'
import '../css/Filter.css'
import { Button, Select, Input } from '@chakra-ui/react'
import AddButton from './AddButton'
import FilterOption from './FilterOption'
import SpecimenAPI from '../../services/SpecimenAPI';
import { useDataContext } from '../context/DataProvider';
import { useToast } from '@chakra-ui/react'
export default function Filter(){
    const { specimenData, setSpecimenData } = useDataContext();
    const toast = useToast()

    const defaultCurFilter = {
        'type': 'filter',
        "parameter": 'genus',
        'operator': '',
        'value': '',
    }
    
    const [currentFilters, setCurrentFilters] = useState([
        {
            'type': 'filter',
            "parameter": 'genus',
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
            filterRadioOptions: [
                'equal',
                'contains',
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Specimen',
            value: 'specimen',
            filterRadioOptions: [
                'equal',
                'contains'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Field ID',
            value: 'field_pop_id',
            filterRadioOptions: [
                'equal',
                'contains'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Greenhouse',
            value: 'greenhouse',
            filterRadioOptions: [
                'equal',
                'contains'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Voucher',
            value: 'voucher_specimen',
            filterRadioOptions: [
                'equal',
                'contains'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Collection Date',
            value: 'collection_date',
            filterRadioOptions: [
                'equal',
                'contains',
                'greater',
                'less'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Provenance',
            value: 'provenance',
            filterRadioOptions: [
                'equal',
                'contains'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Country',
            value: 'country',
            filterRadioOptions: [
                'equal',
                'contains'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'State',
            value: 'state_provenance',
            filterRadioOptions: [
                'equal',
                'contains'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Specific Local',
            value: 'specific_locality',
            filterRadioOptions: [
                'equal',
                'contains'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Latitude',
            value: 'lat',
            filterRadioOptions: [
                'equal',
                'contains',
                'less',
                'greater'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Longitude',
            value: 'long',
            filterRadioOptions: [
                'equal',
                'contains',
                'less', 
                'greater'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Notes',
            value: 'notes',
            filterRadioOptions: [
                'equal',
                'contains'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Material',
            value: 'material',
            filterRadioOptions: [
                'equal',
                'contains'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Nanodrop Concentration',
            value: 'nanodrop_concentration',
            filterRadioOptions: [
                'equal',
                'contains',
                'greater',
                'less'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Nanodrop Ratio',
            value: 'nanodrop_ratio',
            filterRadioOptions: [
                'equal',
                'contains',
                'greater',
                'less'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Published',
            value: 'published',
            filterRadioOptions: [
                'equal',
                'contains'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Extraction Number',
            value: 'extraction_number',
            filterRadioOptions: [
                'equal',
                'contains'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
        {
            name: 'Extraction Date',
            value: 'extraction_date',
            filterRadioOptions: [
                'equal',
                'contains',
                'greater',
                'less'
            ],
            sortRadioOptions:[
                'ascending',
                'descending'
            ]
        },
    ]

    const submitFilters = async() =>{
        try{
            //setSpecimenData([])
            let filter = {
                filterParameters: currentFilters
            }
            const response = await SpecimenAPI.getFilteredSpecimen(filter)
            setSpecimenData(response)
            toast({
                title: 'Filtering Successful', 
                description: 'Successfully filtered specimen data', 
                status: 'success',
                duration: 3000,
                isClosable: true,
            
            })
        } catch(err){
            toast({
                title: 'Filtering Error', 
                description: 'There was an issue filtering, please ensure you have selected all valid options', 
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }


    }

    const addDefaultFilter = () =>{
        const tempFilter = possibleFilters[0]
        setExistingFilters([...existingFilters, tempFilter])
        setCurrentFilters([...currentFilters, defaultCurFilter]) 
    }

    const onFilterOptionChange = (type, value, index) =>{
        const tempFilters = [...currentFilters]
        tempFilters[index][type] = value
        setCurrentFilters(tempFilters)
    }

    const onFilterOptionClear = () =>{
        setCurrentFilters([])
        setExistingFilters([])
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