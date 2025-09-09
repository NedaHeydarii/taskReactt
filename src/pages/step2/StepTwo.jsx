import { Field, Formik } from 'formik'
import React, { Fragment } from 'react'
import { Form } from 'react-router-dom'

const StepTwo = () => {
  return (
    <Fragment>
      <Formik>

        <Form  style={{display:"flex", flexFlow:"column",gap:"5px", width:"500px", }}>
          <Field  name="date" type="date"  />
          <Field name="code" type="number" placeholder="your code..."/>
            <button > Submit</button>
        </Form>

      </Formik>
    </Fragment>
    
    
  )
}

export {StepTwo} 