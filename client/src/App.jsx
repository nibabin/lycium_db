import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import SpecimenList from './pages/SpecimenList'
import Navigation from './components/Navigation'
import Filter from './components/Filter'
import TableView from './pages/TableView'
import MapView from './pages/MapView'

function App() {
  let element = useRoutes([
    {
      path:'/',
      element: <SpecimenList/>

    },
    {
      path:'/table',
      element: <TableView/>
    },

    {
      path:'/map',
      element:<MapView/>
    }

  ])
  

  return (
    <div className='app'>

      <Navigation />
      <Filter/>

      { element }

    </div>
  )
}

export default App
