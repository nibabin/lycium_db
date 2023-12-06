import React, {useEffect, useState} from 'react'
import '../css/Filter.css'
import { Button, Select, Input } from '@chakra-ui/react'
import AddButton from './AddButton'
import { Radio, RadioGroup } from '@chakra-ui/react'
import '../css/FilterOption.css'
export default function FilterOption({}){
    const [selectionOption, setSelectionOption] = useState('option1')
    const [selectedRadio, setSelectedRadio] = useState([])

    const filterOptions = [
        {
            name: 'Option 1',
            value: 'option1',
            radioOptions: [
                '>',
                '<',
                '=',
                'contains'
            ]
        },
        {
            name: 'Option 2',
            value: 'option2',
            radioOptions: [
                '=',
                'contains'
            ]
        },
        {
            name: 'Option 3',
            value: 'option3',
            radioOptions: [
                '=',
                'contains'
            ]
        }
    ]

    useEffect(() => {
        const foundObject = filterOptions.find(obj => obj.value === selectionOption);
        if (foundObject) {
            console.log(foundObject)
            const radio = foundObject.radioOptions;
            setSelectedRadio(radio);
        }
    }, [selectionOption])

    return(
        <div className='filter-option'>
            <div>
                <label>
                    Select Option
                </label>
                <Select  
                        bg='white'
                        borderColor='teal'
                        color='teal'
                        placeholder='Filter by...'>
                        {filterOptions.map((option) => (
                            <option key={option.value} className="filterOption" value={option.value}>{option.name}</option>
                        ))}
                </Select>
            </div>
            <div>
                <label>
                    Input Value
                </label>
                <Input bg='white'
                    borderColor='teal'
                    color='teal'
                    placeholder="Herb..."></Input>
            </div>
            <div>
                <label>
                    Radio Options
                </label>
                <RadioGroup onChange={setSelectionOption} value={selectionOption}>
                    {selectedRadio.map((option) => (
                        <Radio key={option} value={option}>{option}</Radio>
                    ))}
                </RadioGroup>

            </div>
        </div>  
    )
}