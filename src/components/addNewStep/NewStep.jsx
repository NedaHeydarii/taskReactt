import axios from 'axios'
import React, { useEffect, useState } from 'react'

const NewStep = ({onStepAdded}) => {

  const [showModal , setShowModal]=useState(false)
  const[newStep , setNewStep]=useState({name:""})
  

  const addNewStep = async()=>{
      const newStepName = { name: newStep  };
     const res = await axios.post("https://68c827615d8d9f5147347bbd.mockapi.io/steps" , newStepName)

   onStepAdded(response.data)
     setShowModal(false)
        setNewStep("")
 
     
  }
    
  return (
    <div>
        <button onClick={()=>setShowModal(true)}>add new step</button>

        {showModal &&(
          <div style={{position:"fixed" ,   top: 0,  left: 0, right: 0, bottom: 0,backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"}}>

            <div style={{  backgroundColor: "white", padding: "20px",  borderRadius: "10px",  width: "300px"}}>
              <h3>add new step</h3>
              <input
              type="text"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              placeholder="Enter step name"
              />

          

            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
                 <button onClick={addNewStep}>
                Add
              </button>
            </div>
            

            

          </div>
        )}
    </div>
  )
}

export {NewStep} 