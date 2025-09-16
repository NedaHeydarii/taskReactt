import React, { useEffect, useState } from 'react'
import axios from 'axios'


const FeildCard = ({stepId}) => {

     const [feildItem , setFeildItem] = useState([])
  

 


       const getFeildData = async()=>{
          if (!stepId) return;
        const result=  await axios.get(`https://68c827615d8d9f5147347bbd.mockapi.io/steps/${stepId}/feildsData`)
        setFeildItem(result.data)
        console.log(result.data)
      }

     useEffect(()=>{
      getFeildData()
    },[stepId])
  return (
    <div  > 
    <form style={{border:"2px solid blue", padding:"20px" , width:"450px" , background:" rgba(0, 123, 255, 0.08)"}}>
       {Array.isArray(feildItem) &&feildItem.map((feild)=>(
          <div>
              <label style={{paddingRight:"20px"}}>{feild.label}</label>
            <input 
              name={feild.label || "text" }
              placeholder={feild.placeHolder|| "مقدار وارد کنید"}
              type={feild.feildType || "type"}
            />
          </div>
            ))}
    </form>
       
         
        
    
    </div>
  )
}

export {FeildCard} 