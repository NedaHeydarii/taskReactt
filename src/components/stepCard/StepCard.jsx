import React, { useEffect, useState } from 'react'
import axios from "axios"
import { FeildCard } from '../fieldCard/FeildCard'
import { NewStep } from '../addNewStep/NewStep'
 import {api} from "../../api/Interceptor"
import { NewFeild } from '../addNewFeild/NewFeild'


const StepCard = () => {
         
    const[stepItem , setStepItem]=useState([])
    const[activeStep, setActiveStep]=useState()
    const[deleteStep , setDeleteStep]=useState()



    const getStepData = async()=>{
      const result=  await api.get(`/steps`)
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
    //// add step /////
     const handleStepAdded = (newStep) => {
    setStepItem([...stepItem, newStep])

    console.log("newww",newStep)

  }
  /////// delete stepppp//////
    const handleDelet = async(stepId)=>{
          const res =   await api.delete(`/steps/${stepId}`)
          setDeleteStep(stepItem.filter(step => step.id !==stepId)) 
     
    }
    useEffect(()=>{
        handleDelet()
    })
    //////////////////////new feild////////////
      const handleFieldAdded = (newField) => {
    console.log("فیلد جدید ", newField)
 
  }

  return (
    <div  > 
     <div >
           {Array.isArray(stepItem) &&stepItem.map((step)=>(
                    <div className='flex justify-center'>
                <button className='border-2' key={step.id}  style={{ background : step.id== activeStep ? "blue" :"#1a1a1a", marginInline:"10px"}}  onClick={()=>selectStep(step.id)}>
                   {step.name}
                </button>

                <button onClick={() => handleDelet(step.id)}>
                    delete this step
                </button>

                <NewFeild stepId={step.id} onFeildAdded={handleFieldAdded}/>
                </div>
        ))}
     </div>

         <NewStep   onStepAdded={handleStepAdded}/> 
   
     <div style={{display:"block" , flexFlow:"column"}} >
       <FeildCard stepId={activeStep}  />
   </div>
    </div>
    
   )
}

export {StepCard} 