import react from 'react'
import { useCallback } from 'react'
import { ContextConsumer } from '../utils/context'



export default function NewSessionButton(props){
    return(
        <ContextConsumer>
            {context => {
                
                return(
                    <div>
                            <button  onClick={context.showForm} className='add-session-btn'>
                                <p>+</p>
                            </button>
                    </div>
                    )

                }
            }
        </ContextConsumer>
      
    )
}