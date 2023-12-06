import React, {useEffect, useState} from 'react'
import '../css/Filter.css'
import { Button, Select, Input } from '@chakra-ui/react'
import AddButton from './AddButton'
import { Radio, RadioGroup } from '@chakra-ui/react'
import '../css/FilterOption.css'
export default function FilterOption({ onChange, possibleFilters, index }){
    const [selectionOption, setSelectionOption] = useState(possibleFilters[0])
    const [selectedRadio, setSelectedRadio] = useState(possibleFilters[0].radioOptions[0])
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
                    value={filterText}/>
            </div>
            <div>
                <label>
                    Radio Options
                </label>
                <RadioGroup className="radio-group">
                    {selectionOption.radioOptions.map((option, idx) => (
                        <div key={idx} className="radio-option">
                            <Radio onChange={handleRadioChange} value={option}>{option}</Radio>
                            {idx === selectionOption.radioOptions.length - 1 ? null : <span > | </span>}
                        </div>
                    ))}
                </RadioGroup>

            </div>
        </div>  
    )
}