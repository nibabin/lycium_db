import React from 'react'
import '../css/Navigation.css'
import { Button } from '@chakra-ui/react'



const Navigation = () => {
    return (
        <div className='navigation'>
            <div className='header'> 
                <h1>Lycium Database</h1>
               
            </div>
            <nav>
                <ul className="options">
                    <li><a className="option" href='/' role='button'>Custom View</a></li>
                    <li><a className="option" href='/table' role='button'>Table View</a></li>
                    <li><a className="option" href='/map' role='button'>Map View</a></li>
                </ul>
            </nav>

            <Button colorScheme='teal' className="button">Log Out</Button>
        </div>
        
    )
}

export default Navigation