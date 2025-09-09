import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Tab = () => {

    const[addStep , setAddStep]= useState()

    

  return (
   <div >
     <div  style={{display:"flex" ,gap:"13px", border:"1px solid blue",padding:"10px" }}>
     <Link to="/step1"> <h2  >my info1</h2></Link>
    <Link to="/step2">  <h2> my info2</h2></Link>
      <h2>my info3</h2>

      <input style={{width:"200px" , height:"34px" , marginTop:"20px"}}
       name='addStep'
        type='text' 
        placeholder='Add Step...'/>
    </div>
   </div>
  )
}

export {Tab} 
