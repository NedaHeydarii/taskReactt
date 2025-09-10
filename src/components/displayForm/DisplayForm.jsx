import React, { useEffect, useState } from 'react'
import DataTab from "../../json/tab.json"
import { AddField } from '../buildNewForm/AddField'

const DisplayForm = () => {

    const[tab , setTab] = useState([])
    const[activeTab , setActiveTab] = useState(null)
    const[formvalue , setFormValue] = useState({})

    const[addTab , setAddTab]= useState('')
    const [activeId, setActiveId] = useState(DataTab.tab[0]?.id || null);
  


    useEffect(()=>{
        setTab(DataTab.tab)
        console.log(tab)
        if(DataTab.tab.length > 0){
        setActiveTab(DataTab.tab[0].id)
        }
   
    },[])

    const theTab =  Array.isArray(tab) ? tab.find((tab)=> tab?.id == activeTab):null

     const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValue((feildvalue) => ({ ...feildvalue, [name]: value }));
  };

  
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted for tab', theTab?.name);
  };
    
/////////////////////////////////////////////////////////

  const handleaddTab = () => {
    const TabName = addTab.trim();
    if (!TabName) return;

   
    const newTab = {  name: TabName};

    setTab(prev => [...prev, newTab]);
    setActiveId(newTab);
    setAddTab('');
  };

  return (
    <div>
       <div style={{border:"1px solid blue"}}>
         {Array.isArray(tab) && tab?.map((tab)=>(
            <button onClick={()=>setActiveTab(tab.id)}>
                {tab.name}
            </button>
                   
        ))}

        
              <input 
               placeholder='name of new Tab...'
               value={addTab}
               onChange={(e)=>setAddTab(e.target.value)}
              />
              <button onClick={handleaddTab}>addNew</button>
        
       </div>

    {theTab &&(
        <form onSubmit={handleSubmit}>
            {Array.isArray(theTab.fields) &&  theTab?.fields.map((field)=>(
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
              <AddField/>
            <button type='submit'>submit</button>

        </form>
    )}
    </div>

  )
}

export {DisplayForm} 