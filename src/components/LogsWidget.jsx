import react, { useEffect, useState } from 'react'
import {db} from '../utils/Firestore'
import {getFirestore, collection, getDocs } from'firebase/firestore'
import { getDailyPractices } from '../utils/Firestore'

export default function LogsWidget(props){

    const [logs, setLogs] = useState([])

    useEffect( ()=>{
        async function fetchData(){
            await getDailyPractices().then(res => setLogs(res))

        }
        fetchData()
        
    },[props.show])

 
    

   
    let array = []
    let rows = logs.map((ele, index)=>{
        ele = ele.practices.map(ele =>{
        array.push(ele)
        return array
      })
      return ele
    })

    array = array.map((ele, index) =>{
            return(
            <tr key={index}>
                <td>{index+1}</td>
                <td>{ele.topic}</td>
                <td>{ele.minutesPracticed}</td>
            </tr>
        )
    })

    return(
        <div className='logs'>
            <h1>Daily Logs</h1>
            {rows.length ===0 ? <p>No Logs For Today</p> : 
            <table className='logs-table'>
                <thead>
                    <tr>
                    <th></th>
                    <th>Topic</th>
                    <th>#mins</th>
                    </tr>
                    {array}
                </thead>
                
            </table>
}
        </div>
    )
}