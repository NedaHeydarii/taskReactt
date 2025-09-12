import { useState } from 'react'
import { Outlet, Route, Router, Routes } from 'react-router-dom'
import { DisplayForm } from './components/displayForm/DisplayForm'
import { AddField } from './components/buildNewForm/AddField'
 

function App() {
 
  return (
    <>
     <DisplayForm/>    
    </>
  )
}

export default App
