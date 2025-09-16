import React, { useEffect, useState } from 'react'
import axios from "axios"
import { FeildCard } from '../fieldCard/FeildCard'
import { NewStep } from '../addNewStep/NewStep'


const StepCard = () => {
         
    const[stepItem , setStepItem]=useState([])
    const[activeStep, setActiveStep]=useState()



    const getStepData = async()=>{
      const result=  await axios.get("https://68c827615d8d9f5147347bbd.mockapi.io/steps")
      setStepItem(result.data)
      console.log(result.data)
    }
 
    useEffect(()=>{
        getStepData()
     
    },[])
    
    const selectStep = (stepId)=>{
          console.log(stepId)
          setActiveStep(stepId)
    }
    ////// add step part/////
     const handleStepAdded = (newStep) => {
    setStepItem([...stepItem, newStep])

    console.log("newww",newStep)

  }
  return (
    <div > 
        {Array.isArray(stepItem) &&stepItem.map((step)=>(
      
                <button key={step.id}  style={{ background : step.id== activeStep ? "blue" :"#1a1a1a", marginInline:"10px"}}  onClick={()=>selectStep(step.id)}>
                   {step.name}
                </button>
        ))}
        <NewStep stepId={activeStep}  onStepAdded={handleStepAdded}/>
   
     <div style={{display:"block" , flexFlow:"column"}} >
       <FeildCard stepId={activeStep}  />
   </div>
    </div>
    
   )
}

export {StepCard} 