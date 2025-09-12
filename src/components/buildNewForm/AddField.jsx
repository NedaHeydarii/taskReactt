import React, { useState } from 'react'
import DataTab from "../../json/tab.json"


const AddField = () => {

    const[field , setField]=useState([])
     const [values, setValues] = useState({})
   

    const addField = () => {
    const fieldsNew = field.length + 1;
    const newField = { name: `field${fieldsNew}`, label: `field${fieldsNew}`, type: 'text' }
     setField((field) => [...field, newField])
    setValues((v) => ({ ...v, [newField.name]: '' }))
  }
 
 

  const onSubmit = (e)=>{
    e.preventDefault()
     console.log('Submitted values:', values)
  }


  return (
    <div>
        <form onSubmit={onSubmit}>
            {field?.map((f,fieldsNew)=>(
                <div key={fieldsNew}>
                    <label>{f.label}</label>
                    <input
                      name={f.name}
                      type={f.type}
                      value={values[f.name] || ''}        
                      placeholder={f.label}
                      onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  [f.name]: e.target.value,
                }))}
                    />
                </div>  
            ))}
               <button type="button" onClick={addField}> Add fielddd</button>
        </form>
    </div>
  )
}

export {AddField} 