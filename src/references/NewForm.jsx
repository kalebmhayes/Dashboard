import React from 'react'
import {Formik, Form, Field, ErrorMessage, FieldArray} from 'formik'
import * as Yup from 'yup'



function NewForm(){

  const initialValues = {
    name:'',
    email:'',
    channel:'',
    comments:'',
    address:'',
    social:{
        facebook:'',
        twitter:''
    },
    phoneNumbers:['',''],
    phNumbers:['']
  }

  const onSubmit = values =>{
    console.log(values)
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    channel: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    

  })
  return(
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
    >
      <Form>
        <div className='form-control'>
            <label htmlFor='name'>Name</label>
            <Field type='text' id='name' name='name'/>
            <ErrorMessage  name='name'/>
        </div>

        <div className='form-control'>
            <label htmlFor='email'>Email</label>
            <Field type='email' id='email' name='email'/>
            <ErrorMessage name='email'/>
        </div>

        <div className='form-control'>
            <label htmlFor='channel'>Channel</label>
            <Field type='text' id='channel' name='channel' />
            <ErrorMessage name='channel'/>
        </div>

        <div className='form-control'>
            <label htmlFor='comments'>Comments</label>
            <Field as='textarea' type='text' id='comments' name='comments' />
           
        </div>
        <div className='form-control'>
            <label htmlFor='address'>Address</label>
            <Field name='address' >
              {props =>{
                const {field, form, meta} = props
                return(
                    <div>
                        <input type='text' id='address' {...field}/>
                        {meta.touched && meta.error ? <div>{meta.error}</div>:null}
                    </div>
                )
              }}

                  
            </Field>
            <ErrorMessage name='address'/>
        </div>
        <div className='form-control'>
            <label htmlFor='facebook'>Facebook</label>
            <Field type='text' id='facebook' name='social.facebook'/>
        </div>

        <div className='form-control'>
            <label htmlFor='twitter'>Twitter</label>
            <Field type='text' id='twitter' name='social.twitter'/>
        </div>
        <div className='form-control'>
            <label htmlFor='primaryPhone'>Primary Phone Number</label>
            <Field type='text' id='primaryPhone' name='phoneNumbers[0]'/>
        </div>
        <div className='form-control'>
            <label htmlFor='secondaryPhone'>Secondary Phone Number</label>
            <Field type='text' id='secondaryPhone' name='phoneNumbers[1]'/>
        </div>
        <div className='form-control'>
            <label>List of Phone Numbers</label>
            <FieldArray name='phNumbers'>
                {fieldArrayProps =>{
                    console.log(fieldArrayProps);
                    const {push, remove, form} = fieldArrayProps
                    const {values} = form
                    const { phNumbers} = values
                    return (
                    <div>
                        {phNumbers.map((phNumber, index)=>(
                            <div key={index}>
                                <Field name={`phNumbers[${index}]`}/>
                                {index > 0 && <button type='button' onClick={()=>remove(index)}>-</button>}
                                <button type='button' onClick={()=>push('')}>+</button>
                            </div>
                        ))}
                    </div>)
                }}
            </FieldArray>
        </div>

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  )
}
export default NewForm