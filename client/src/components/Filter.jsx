import React from 'react'
import '../css/Filter.css'
import { Button, Select, Input } from '@chakra-ui/react'
import AddButton from './AddButton'

export default function Filter(){

    return(
        <div className='filter'>
            <div className="filterSection">
                <Select  
                    bg='white'
                    borderColor='teal'
                    color='teal'
                    placeholder='Filter by...'>
                    <option className="filterOption" value='option1'>Option 1</option>
                    <option className="filterOption" value='option2'>Option 2</option>
                    <option className="filterOption" value='option3'>Option 3</option>
                </Select>
            </div>
            <div className="filterSection">
                <Input bg='white'
                    borderColor='teal'
                    color='teal'
                    placeholder="Filter query"></Input>
            </div>
            <div className="filterSection">
                <Button colorScheme='teal'>Filter</Button>
                <AddButton/>
            </div>
        </div>
    )
}