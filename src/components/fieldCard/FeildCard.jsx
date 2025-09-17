import React, { useEffect, useState } from 'react'
import axios from 'axios'
 import {api} from "../../api/Interceptor"



const FeildCard = ({stepId}) => {

     const [feildItem , setFeildItem] = useState([])
     const[deleteFeild , setDeleteFeild] = useState(null)
  

       const getFeildData = async()=>{
          if (!stepId) return;
        const result=  await api.get(`/steps/${stepId}/feildsData`)
        setFeildItem(result.data)
        console.log(result.data)
      }

     useEffect(()=>{
      getFeildData()
    },[stepId])

/////////////////////////////////delete feild///////////////////////////

    const handleDeletFeild = async(feildId , stepId) => {
     const res =  await api.delete(`/steps/${stepId}/fieldsData/${feildId}`);
      setFeildItem(feildItem.filter(feild => feild.id !== feildId));
   console.log(handleDeletFeild)
  }


  return (
    <div  > 
    <form  style={{border:"2px solid blue", padding:"20px" , width:"450px" , background:" rgba(0, 123, 255, 0.08)"}}>
       {Array.isArray(feildItem) &&feildItem.map((feild)=>(
          <div key={feild.id}>
              <label  style={{paddingRight:"20px"}}>{feild.label}</label>
            <input className='border-2 p-1 rounded-xl'
              name={feild.label }
              placeholder={feild.placeHolder}
              type={feild.feildType}
            />
            <button onClick={()=>handleDeletFeild(feild.id)}>delete this feild</button>
          </div>
            ))}
    </form>
       
         
        
    
    </div>
  )
}

export {FeildCard} 