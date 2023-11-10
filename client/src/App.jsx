import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import SpecimenList from './pages/SpecimenList'
import Navigation from './components/Navigation'
import Filter from './components/Filter'

function App() {
  let element = useRoutes([
    {
      path:'/',
      element: <SpecimenList/>

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
