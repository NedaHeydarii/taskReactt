import React, { useEffect, useState } from 'react'
import DataTab from "../../json/tab.json"

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
        setActiveTab(DataTab.tab.id)
        }
   
    },[])

    const theTab =  Array.isArray(tab) ? tab.find((tab)=> tab?.id == activeTab):null

     const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValue((feildvalue) => ({ ...feildvalue, [name]: value }));
  };

  
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted for tab', theTab?.name)
    const nextTab = tab.findIndex(t => t.id === activeTab);
    const theFields = (theTab?.fields ?? [])
    const allFilled = theFields.every(f => (formvalue[f.name] ?? '')!== '')
     if (allFilled) { 
    const next = tab[nextTab + 1];
    if (next) setActiveTab(next.id);
    else alert('All TABSSS ARE completed');
  } else {
    alert('FILL THE FEILDSSSS ');
  }
  }
  
/////////////////////////////////////////////////////////////

  const handleaddTab = () => {
    const TabName = addTab.trim();
    if (!TabName) return;
   
let tabCounter = 0
const getId = ()  => `${Date.now()}_${++tabCounter}`;


   
   const newTab = {  name: TabName ,fields: [] , id:getId()};

    setTab(prev => [...prev, newTab]);
    setActiveId(newTab.id)
    setAddTab('')
  }
  /////////////////////////////////////////////////////////////////////////////
  const addFieldToActiveTab = (e) => {
      e.preventDefault()
   const currentTab = (tab) ? tab.find(t => t.id === activeTab) :null
   const currentFields = currentTab.fields 
  const fieldsNew = currentFields.length

  const newField = {
    name: `field${fieldsNew}_${currentTab.id}`,
    label: `field${fieldsNew}_${currentTab.id}`,
    type: 'text',
  }
  setTab((prev) =>
    prev.map((t) =>
      t.id === currentTab.id
        ? { ...t, fields: [...currentFields, newField] }
        : t
    )
  )  
  setFormValue((fv) => ({
    ...fv,
    [newField.name]: '',
  }))
  }
 
  
  return (
    <div>
       <div  style={{paddingBottom:"20px"}}>
         {Array.isArray(tab) && tab?.map((tab)=>(
            <button 
             style={{ background : tab.id== activeTab ? "blue" :"#1a1a1a" , marginInline:"7px" }}
            onClick={()=>setActiveTab(tab.id)}>
                {tab.name}
            </button>
                   
        ))}

        
              <input  style={{marginLeft:"50px" , marginRight:"6px" , borderRadius:"6px", height:"25px"}}
               placeholder='name of new Tab...'
               value={addTab}
               onChange={(e)=>setAddTab(e.target.value)}
              />
              <button onClick={handleaddTab}>addNew</button>
        
       </div>

    {theTab &&(
        <form  style={{border:"2px solid blue", padding:"20px" , width:"450px" , background:" rgba(0, 123, 255, 0.08)"}}>
            {Array.isArray(theTab.fields) &&  theTab?.fields.map((field)=>(
                <div>
                    
                    <label style={{paddingRight:"20px"}}>{field.label}</label>
                    <input style={{paddingLeft:"10px" , borderRadius:"6px", height:"23px" , marginBottom:"4px"}}
                    
                      name={field.name}
                      type={field.type}
                      placeholder={field.name}
                      value={formvalue[field.name] || ''}
                      onChange={handleFieldChange}
                    />
                     

               </div>

            ))}
              
        <div style={{display:"flex", flexFlow:"column", width:"150px", gap:"8px"}}>
              <button type='submit' onClick={addFieldToActiveTab}> add feildddd </button>
            <button type='submit'  onClick={handleSubmit}>submit</button>

        </div>
        </form>
    )}
    </div>

  )
}

export {DisplayForm} 