
import './App.css';
// import Form from './components/Form'
// import NewForm from './components/NewForm';
// import FormikContainer from './components/FormikContainer';
import PracticeLogForm from './components/PracticeLogForm';
import ProgressBar from './components/ProgressBar'
import  {arc} from 'chart.js'
import DoughnutChart from './components/DoughnutChart';
import LineChart from './components/LineChart'
import NewSessionButton from './components/NewSessionButton';
import react,{ useCallback, useState } from 'react';
import { weeklyDataSet, weeklyLabels } from './utils/Data';
import LogsWidget from './components/LogsWidget';
import { ContextConsumer } from './utils/context';

function App() {

  
  






  
  return (
    <div  className='App'>
      {/* <div className={show ? 'form-visible':'form-hidden'}>
        
     <PracticeLogForm  onValueChange={handleValueChange}/> 
      </div> */}
 
      {/* <Context.Provider>
        {context =>{
            console.log(context)
        return  (
            // <div className={context.show ? 'form-visible' : 'form-visible' }>
             
              <PracticeLogForm  />
            // </div>
          )
        }
        }
      </Context.Provider> */}


      <ContextConsumer>
        {context =>{
         
          return(
            <div>

            <div className={context.show ? 'form-visible' : 'form-hidden'}>
              <PracticeLogForm/>
            </div>
            
            </div>
          )
        }}
      </ContextConsumer>

 <ContextConsumer>
  {context =>{
    return(
      
      <div className={!context.show ? 'dashboard-container': 'dashboard-container blur'}>
      
         <div className='dashboard-top'>
             <ProgressBar show={context.show}/>
             <DoughnutChart show={context.show}/>
         </div>
         <div className='dashboard-bottom'>
             <LineChart show ={context.show}/>
            <LogsWidget show={context.show}/>
         </div>
               <NewSessionButton />
       </div>
      
    )
  }}
 </ContextConsumer>
     </div>
  );

}

export default App;
