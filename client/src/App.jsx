import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import SpecimenList from './pages/SpecimenList'
import Navigation from './components/Navigation'
import Filter from './components/Filter'
import TableView from './pages/TableView'
import MapView from './pages/MapView'
import { ChakraProvider } from '@chakra-ui/react'
import AddButton from './components/AddButton'
import SpeciesList from './pages/SpeciesList'
import { DataProvider } from './context/DataProvider'
import SpecimenData from './pages/SpecimenData'

function App() {
  let element = useRoutes([
    {
      path:'/',
      element: <SpeciesList/>
    },
    {
      path:'/table',
      element: <TableView/>
    },

    {
      path:'/map',
      element:<MapView/>
    },
    {
      path:'/species/:id',
      element: <SpecimenList/>
    },
    {
      path:'/specimen/:id',
      element: <SpecimenData/>
    },
    

  ])
  

  return (
    <div className='app'>
      <ChakraProvider>
        <DataProvider>
          <Navigation />
          <Filter/>

          { element }
        </DataProvider>

      </ChakraProvider>

    </div>
  )
}

export default App
