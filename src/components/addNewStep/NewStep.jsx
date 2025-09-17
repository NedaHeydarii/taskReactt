import axios from 'axios'
import React, { useEffect, useState } from 'react'
 import {api} from "../../api/Interceptor"


const NewStep = ({onStepAdded}) => {

  const [showModal , setShowModal]=useState(false)
  const[stepNew , setStepNew]=useState("")
  

  const addNewStep = async()=>{
       if (!stepNew.trim()) return;
    
    const newSteps = {
      name: stepNew
    
    }
    
     const res = await api.post("/steps" , newSteps)

   onStepAdded(res.data)
     setShowModal(false)
        setStepNew("")
 
     
  }
    
  return (
    <div className='flex mt-4 mb-4'>
        <button  onClick={()=>setShowModal(true)}>add new step</button>

        {showModal &&(
          <div style={{position:"fixed" ,   top: 0,  left: 0, right: 0, bottom: 0,background:"black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"}}>

            <div style={{  border:"2px solid blue", padding: "20px",  borderRadius: "10px",  width: "300px"}}>
              <h3>add new step</h3>
              <input
              type="text"
              value={stepNew}
              onChange={(e) => setStepNew(e.target.value)}
              placeholder="Enter step name"
              />

          

            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
                 <button onClick={addNewStep}>
                create
              </button>
            </div>
            

            

          </div>
        )}
    </div>
  )
}

export {NewStep} 