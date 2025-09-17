import React, { useState } from 'react'
 import {api} from "../../api/Interceptor"


const NewFeild = ({stepId , onFieldAdded}) => {
      const [showModal , setShowModal]=useState(false)
     const[newFeild , setNewFeild]=useState({label:"", placeholder:"",feildType:"text"})

     const openModal =()=>{
        setShowModal(true)
        setNewFeild({
             label:"",
             placeholder:"",
             feildType:"text"
     })
     }
   const closeModal = () => {
    setShowModal(false)
  }
    const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewFeild(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addFeildToStep= async()=>{
    const feildData={
        label:newFeild.label,
        placeholder:newFeild.placeholder,
        feildType:newFeild.feildType,
        stepId:stepId
    }
    const res = await api.post(`/steps/${stepId}/feildsData` , feildData)

     if (onFieldAdded) {
      onFieldAdded(response.data);
    }

    closeModal();
  }

  return (
    <div>
            <button onClick={openModal}>add new feild</button>
            {showModal&&(
             <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
         <div className="bg-gray p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">add New Feild</h2>
            
           
                <div>
                <label className="block text-sm font-medium mb-1">feild Label: </label>
                <input
                  type="text"
                  name="label"
                  value={newFeild.label}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="label of feild.."
                />
                </div>
                  <div>
                <label className="block text-sm font-medium mb-1">Placeholder:</label>
                <input
                  type="text"
                  name="placeholder"
                  value={newFeild.placeholder}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your Name..."
                />
              </div>
                  <div>
                <label className="block text-sm font-medium mb-1">feild Type:</label>
                <input
                  name="fieldType"
                  value={newFeild.feildType}
                  onChange={handleInputChange}
                  className="w-full p-2 border  rounded"
                  placeholder='type of feild...'
                />
             
              </div>
         </div>
         <div>
            <button onClick={closeModal}>cancel</button>
            <button onClick={addFeildToStep}>addFeild </button>
         </div>



      </div>

    
            )}

    </div>
  )
}

export {NewFeild} 