import React, { useEffect, useState } from 'react'
import DataTab from "../../json/tab.json"
import { AddField } from '../buildNewForm/AddField'

const DisplayForm = () => {

    const[tab , setTab] = useState([])
    const[activeTab , setActiveTab] = useState(null)
    const[formvalue , setFormValue] = useState({})

    useEffect(()=>{
        setTab(DataTab.tab)
        console.log(tab)
        if(DataTab.tab.length > 0){
        setActiveTab(DataTab.tab[0].id)
        }

      const formValue = {};
      DataTab.tab[0].fields.forEach((feild) => (formValue[feild.name] = ''));
      setFormValue(formValue);
    
    },[])

    const theTab = tab?.find((tab)=> tab.id == activeTab)

     const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValue((feildvalue) => ({ ...feildvalue, [name]: value }));
  };

    useEffect(()=>{
          if (theTab) {
    
      const formValue = {};
      theTab.fields.forEach((f) => (formValue[f.name] = ''));
      
    //   setFormValue((feildvalue) => ({ ...feildvalue, ...formValue }));
    }
    })
  
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted for tab', theTab?.name, formValue);
  };
  

  return (
    <div>
        {tab?.map((tab)=>(
            <button onClick={()=>setActiveTab(tab.id)}>
                {tab.name}
            </button>

          
        ))}
    {theTab &&(
        <form onSubmit={handleSubmit}>
            {theTab.fields.map((field)=>(
                <div>
                    <label>{field.label}</label>
                    <input
                      name={field.name}
                      type={field.type}
                      placeholder={field.label}
                      value={formvalue[field.name] || ''}
                      onChange={handleFieldChange}
                    />
                
               </div>
            ))}
            <button type='submit'>submit</button>
        </form>
    )}
    </div>

  )
}

export {DisplayForm} 