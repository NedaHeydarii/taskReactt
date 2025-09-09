import { Field, Formik } from 'formik'
import React, { Fragment, useState } from 'react'
import { Form } from 'react-router-dom'
import * as yup from "yup";
import { AddFeildButton } from '../../components/addButton/AddFeildButton'

const StepOne = () => {
  //add one feild
  const[addFeild , setAddFeild]=useState()

  const handleAddFeild = ()=>{
    setAddFeild(el => el +1)
  }



  const validation = yup.object().shape({
    name:yup.string().required(),
    gender:yup.string().required()
  })

    const onSubmit = (values)=>{
      console.log("form submited..." , values.name)
    }

  return (
    <Fragment>
        <Formik  
         initialValues={{name:"" , gender:""}}
         onSubmit={(values)=> onSubmit(values)}
        validationSchema={validation}
        >
          <Form style={{display:"flex", flexFlow:"column",gap:"5px", width:"500px", }}>
              <Field  name="name" placeholder="your username..."/>
              <Field  name="gender"  placeholder="female or male...."/>
              <button type='submit' onClick={onSubmit} > Submit</button>
              <AddFeildButton onClick={handleAddFeild}/>
          </Form>
        
        </Formik>
    </Fragment>
  )
}

export {StepOne} 