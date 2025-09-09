import React, { useState } from 'react'

const AddField = () => {

    const[field , setField]=useState([])
     const [values, setValues] = useState({ name: '' })

      const addField = () => {
    const fieldsNew = field.length + 1;
    const newField = { name: `field${fieldsNew}`, label: `field${fieldsNew}`, type: 'text' };
    setField((field) => [...field, newField]);
    setValues((v) => ({ ...v, [newField.name]: '' }));
  }

 const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  const onSubmit = (e)=>{
    e.preventDefault()
     console.log('Submitted values:', values);
  }
  return (
    <div>
        <form onSubmit={onSubmit}>
            {field.map((f,fieldsNew)=>(
                <div key={fieldsNew}>
                    <label>{f.label}</label>
                    <input
                      name={f.name}
                      type={f.type}
                      value={values[f.name] || ''}
                      onChange={handleChange}
                      placeholder={f.label}
                    />
                </div>  
            ))}
               <button type="button" onClick={addField}> Add fielddd</button>
        </form>
    </div>
  )
}

export {AddField} 