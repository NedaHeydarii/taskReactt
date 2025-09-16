import { useState } from 'react'
import { Link, Outlet, Route, Router, Routes } from 'react-router-dom'
import { DisplayForm } from './components/displayForm/DisplayForm'
import { StepCard } from './components/stepCard/StepCard'
import { FeildCard } from './components/fieldCard/FeildCard'

 

function App() {
 
  return (
    <>
      {/* <DisplayForm/>     */}
    <StepCard/>
   <main>
    <Outlet/>
   </main>
   
   
    </>
  )
}

export default App
