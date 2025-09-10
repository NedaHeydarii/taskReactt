import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, Route, Router, Routes } from 'react-router-dom'
import { StepOne } from './pages/step1/StepOne'
import { StepTwo } from './pages/step2/StepTwo'
import { Tab } from './components/bigTab/Tab'
import { DisplayForm } from './components/displayForm/DisplayForm'
import { AddField } from './components/buildNewForm/AddField'
 

function App() {
 

  return (
    <>
     {/* <Tab/> */}
     <main>
      {/* <Outlet/> */}
     </main>
     <DisplayForm/>
    </>
  )
}

export default App
