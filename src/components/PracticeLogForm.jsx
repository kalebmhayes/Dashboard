import React from 'react'
import { Formik, Field,Form, FieldArray,ErrorMessage } from 'formik'
import TextError from './TextError'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import { useCallback } from 'react'
import {db} from '../utils/Firestore'
import { collection, addDoc, Timestamp, serverTimestamp } from "firebase/firestore"; 
import { ContextConsumer, ContextProvider } from '../utils/context'

export default function PracticeLogForm(props){

    const dropdownOptions=[
        { key: 'What did you practice', value: '' },
        { key: 'Technique', value: 'technique' },
        { key: 'Scales', value: 'scales' },
        { key: 'Solo Repertoire', value: 'soloRepertoire' },
        { key: 'Ensemble Music', value: 'ensembleMusic' },
        { key: 'Other', value:'other'}
      ]

      const initialValues = {
        practices:[
            { minutesPracticed:''}
        ]
      }

      const validationSchema = Yup.object({
        practices: Yup.array(Yup.object({
            minutesPracticed: Yup.number().required('required').max(100),
            topic:  Yup.string().required('required')
        }))
      })

      const onSubmit = (values) => {
        let time = new Date()
        addDoc(collection(db, 'userData'),{
          ...values,
          timeStamp: time
        })

    
    
      }
      let time = new Date()
      
      return (
        <ContextConsumer>
          {context => {
            return(

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            let time = new Date()
            addDoc(collection(db, 'userData'),{
              ...values,
              timeStamp: time
              
            })
            context.hideForm()
          }
          }
        >
          
            <Form className='form'>
              <FieldArray name='practices'>
                {fieldArrayProps =>{
                        const {push, remove, form} = fieldArrayProps
                        const {values} = form
                        const { practices} = values
                        return (
                            <div>
                                {practices.map((practice, index)=>(
                                    <div className='practices-container' key={index}>
                                        <div className='inputs'>
                                            <FormikControl
                                            control='select'
                                            name={`practices[${index}].topic`}
                                            label='What Did You Practice'
                                            options={dropdownOptions}
                                            />

                                            <FormikControl
                                            control='number'
                                            label='#mins'
                                            name={`practices[${index}].minutesPracticed`}
                                            className='minute-input'
                                            />
                                        </div>

                                        <div className='btn-container'>
                                            {index > 0 && <button type='button' onClick={()=>remove(index)} className='remove-btn btn'>-</button>}
                                            <button type='button' onClick={()=>push('')} className='add-btn btn'>+</button>
                                        </div>
                                    </div>
                                ))}
                            
                            </div>)
                    }}
              </FieldArray>
                    <div className='button-container'>

                    <button className='submit-btn btn' type='submit'>Submit</button>
                    <button  onClick={context.hideForm} className='close-btn btn' type='button'>Cancel</button>
                    </div>
            </Form>
        </Formik>
            )
          }}
        </ContextConsumer>
      )
}

