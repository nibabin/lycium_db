import React from 'react'
import '../css/Navigation.css'



const Navigation = () => {
    return (
        <div className='navigation'>
            <div className='header'> 
                <h1>Lycium Database</h1>
               
            </div>
            <nav>
                <ul>
                    <li><a href='/' role='button'>Custom View</a></li>
                    <li><a href='/table' role='button'>Table View</a></li>
                    <li><a href='/map' role='button'>Map View</a></li>
                </ul>

            
            </nav>
        </div>
        
    )
}

export default Navigation