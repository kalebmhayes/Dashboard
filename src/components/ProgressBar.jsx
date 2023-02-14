import react, {useState,useEffect} from 'react'
import {Doughnut} from 'react-chartjs-2'
import {getFirestore, collection, getDocs } from'firebase/firestore'
import {db} from '../utils/Firestore'
import{progressData, progressOptions} from '../utils/Data'
import { getDailyPractices, getDailyPracticeMinutes } from '../utils/Firestore'

// console.log(getDailyPractices().then(data=>console.log(data)))
// let x = getDailyPracticeMinutes(getDailyPractices())


export default function ProgressBar(props){
    const [goal, setGoal] = useState(120)
    const [minutes, setMinutes] = useState(0)
    const [progressChartData , setProgressChartData] = useState(progressData(minutes, goal))
    const [progressChartOptions, setProgressChartOptinos] = useState(progressOptions)
    
    useEffect( ()=>{
        async function fetchData(){
            await getDailyPracticeMinutes(getDailyPractices())
            .then(res => {
                setMinutes(res);
                setProgressChartData(progressData(res, goal)) 
            })
        }
        fetchData()
    },[props.show])



  

    return(
        <div className='progress-chart chart'>
            <Doughnut data={progressChartData}
                
                options={progressChartOptions}/>
            <p id='percent'>
                {Math.floor((minutes / goal)*100)}%
                </p>
        </div>
    )
}

//things to add?
//CHANGE FONT SIZE
//
