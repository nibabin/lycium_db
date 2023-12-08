import React, {useEffect, useState} from 'react'
import '../css/Filter.css'
import { Button, Select, Input } from '@chakra-ui/react'
import AddButton from './AddButton'
import { Radio, RadioGroup } from '@chakra-ui/react'
import '../css/FilterOption.css'
export default function FilterOption({ onChange, possibleFilters, index }){

    const typeOptions = [
        {
            "name": "Filter",
            "value": "filter",
        },
        {
            "name": "Sort",
            "value": "sort",
        }
    ]

    const [typeSelection, setTypeSelection] = useState(typeOptions[0])
    const [selectionOption, setSelectionOption] = useState(possibleFilters[0])
    const [selectedRadio, setSelectedRadio] = useState(possibleFilters[0].filterRadioOptions[0])
    const [filterText, setFilterText] = useState('')

    const handleSelectionChange = (e) => {
        const selectedValue = e.target.value;
        const selectedOption = possibleFilters.find((option) => option.value === selectedValue);
        setSelectionOption(selectedOption);
        onChange('parameter', e.target.value, index)
      };

      const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
        console.log(e.target.value)
        onChange('operator', e.target.value, index)
      }

     const handleInputTextChange = (e) => {
            setFilterText(e.target.value)
            onChange('value', e.target.value, index)
        }

    const handleTypeSelectionChange = (e) =>{
        const selectedValue = e.target.value;
        const selectedOption = typeOptions.find((option) => option.value === selectedValue);
        setTypeSelection(selectedOption);
        setFilterText('')
        onChange('type', e.target.value, index)
        onChange('parameter', '', index)
    }

    return(
        <div className='filter-option'>
            <div>
                <label>
                    Type
                </label>
                <Select
                    bg='white'
                    borderColor='teal'
                    color='teal'
                    onChange={handleTypeSelectionChange}
                    value = {typeSelection.value}>
                    {typeOptions.map((option) => (
                        <option key={option.value} className="filterOption" value={option.value}>{option.name}</option>
                    ))}
                </Select>
            </div>
            <div>
                <label>
                    Select Option
                </label>
                <Select  
                        bg='white'
                        borderColor='teal'
                        color='teal'
                        onChange={handleSelectionChange}
                        value={selectionOption ? selectionOption.value : ''}
                        >
                        {possibleFilters.map((option) => (
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
                    placeholder="Herb..."
                    onChange={(e) => handleInputTextChange(e)}
                    value={filterText}
                    disabled={typeSelection.value == "sort"}
                    />
            </div>
            <div>
                <label>
                    Radio Options
                </label>
                <RadioGroup className="radio-group">
                    {typeSelection.value == "filter" ?
                    selectionOption.filterRadioOptions.map((option, idx) => (
                        <div key={idx} className="radio-option">
                            <Radio onChange={handleRadioChange} value={option}>{option}</Radio>
                            {idx === selectionOption.filterRadioOptions.length - 1 ? null : <span > | </span>}
                        </div>
                    ))
                    : selectionOption.sortRadioOptions.map((option, idx) => (
                        <div key={idx} className="radio-option">
                            <Radio onChange={handleRadioChange} value={option}>{option}</Radio>
                            {idx === selectionOption.sortRadioOptions.length - 1 ? null : <span > | </span>}
                        </div>
                    ))}
                </RadioGroup>

            </div>
        </div>  
    )
}