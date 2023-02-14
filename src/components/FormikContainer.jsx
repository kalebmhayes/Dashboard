import React from 'react'
import { Formik, Field,Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

function FormikContainer () {

  const dropdownOptions=[
    { key: 'Select an option', value: '' },
    { key: 'Option 1', value: 'option1' },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option3' }
  ]
  const initialValues = {
    // email: '',
    // textarea: '',
    // selectOption: '',
    practices:[
        {topic:'', minutesPracticed:''}
    ]

   
  }
  const validationSchema = Yup.object({
    // email: Yup.string().required('Required'),
    // textarea: Yup.string().required('Required'),
    // selectOption: Yup.string().required('Required')
  })
  const onSubmit = values => {
    console.log('Form data', values)

  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form>
          {/* <FormikControl
            control='input'
            type='email'
            label='Email'
            name='email'
          />
          <FormikControl
            control='textarea'
            label='Text Box'
            name='textarea'
          />
          <FormikControl
            control='select'
            label='Select a topic'
            name='selectOption'
            options={dropdownOptions}
          /> */}
          <FieldArray name='practices'>
          {fieldArrayProps =>{
                   
                    const {push, remove, form} = fieldArrayProps
                    const {values} = form
                    const { practices} = values
                    return (
                    <div>
                        {practices.map((practice, index)=>(
                            <div className='practices-container' key={index}>
                                <div>

                                   <FormikControl
                                    control='select'
                                    label='Select a topic'
                                    name={`practices[${index}].topic`}
                                    options={dropdownOptions}
                                />
                                <FormikControl
                                    control='input'
                                    type='number'
                                    label='minutes practiced'
                                    name={`practices[${index}].minutesPracticed`}
                                />
                                </div>

                                <div>
                                {index > 0 && <button type='button' onClick={()=>remove(index)}>-</button>}
                                <button type='button' onClick={()=>push('')}>+</button>
                                </div>
                            </div>
                        ))}
                     
                    </div>)
                }}
          </FieldArray>
        
        
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  )
}

export default FormikContainer