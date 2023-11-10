import React from 'react'
import '../css/Filter.css'

export default function Filter(){

    return(
        <form className='filter'>
            <select>
                <option value="genomic">Genomic</option>
                <option value="genus">Genus</option>
                <option selected value="species">Species</option>
                <option value="material">Material in Hand</option>
                <option value="country">Country</option>
            </select>

            <label>
                Search for:
            <input type='text' placeholder='ex: herb'/>
            </label>
        </form>
    )
}