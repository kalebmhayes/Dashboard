import { getRedGradient,getDarkGreenGradient,getDarkBlueGradient,getYellowGradient,getPurpleGradient } from '../utils/gradients'
import shadowPlugin from './shadowPlugin'
import {db} from './Firestore'
import {getFirestore, collection, getDocs } from'firebase/firestore'


let mapData = (data)=>{
    data = data.map(ele => ele.practices.map(ele => ele.minutesPracticed).reduce((prev,curr) => prev + curr,0))
    .reduce((prev,curr) => prev+curr,0)
    return data
}


export const getDailyPractices = async()=>{
    const response = await getDocs(collection(db, 'userData'))
    let data  = response.docs.map(doc =>{
        return doc.data()
    }).filter((doc)=>{
        return(
            doc.timeStamp.toDate().getFullYear() === year &&
            doc.timeStamp.toDate().getMonth()=== month &&
            doc.timeStamp.toDate().getDate()=== day
        )
    })
    return data
}


export const getWeeklyEntries = async ()=>{
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay() +(curr.getDay()==0 ? -6:1); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    let days = []

    for(let i=0; i<=6;i++){
        days.push(new Date(curr.setDate(first +i)).toLocaleDateString())
    }

  

    const response = await getDocs(collection(db,'userData'))
    let entries  = response.docs.map(doc =>{
        return doc.data()
    }).filter((doc)=>{
        return(
            
            doc.timeStamp.toDate().toLocaleDateString() ===days[0]||
            doc.timeStamp.toDate().toLocaleDateString() ===days[1]||
            doc.timeStamp.toDate().toLocaleDateString() ===days[2]||
            doc.timeStamp.toDate().toLocaleDateString() ===days[3]||
            doc.timeStamp.toDate().toLocaleDateString() ===days[4]||
            doc.timeStamp.toDate().toLocaleDateString() ===days[5]||
            doc.timeStamp.toDate().toLocaleDateString() ===days[6]
        )
    })
    return entries
}

export const getWeeklyData = async () => {
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay() +(curr.getDay()==0 ? -6:1); // First day is the day of the month - the day of the week
    let days = []

    for(let i=0; i<=6;i++){
        days.push(new Date(curr.setDate(first +i)).toLocaleDateString())
    }

    let data = await getWeeklyEntries()
   
    let array = new Array(7)
    for(let i=0;i<7;i++){
        let res = mapData(data.filter((doc)=> doc.timeStamp.toDate().toLocaleDateString()===days[i]))
        array[i] =res
    }                
    return array
}

//////////////////////////////////////////////////////////
/////////////////////////GET MONTHLY DATA/////////////////////
let getMonthlyEntries =async () =>{
    let curr = new Date()
    const response = await getDocs(collection(db,'userData'))
    let entries  = response.docs.map(doc =>{
        return doc.data()
    }).filter((doc)=>{
        return(
            doc.timeStamp.toDate().getFullYear()=== curr.getFullYear()
        )
    })
    return entries//returns all of the entries for the year, the getMonthlyData function will filter them in to months
}
////////////THIS FUNCTION GROUPS THE PRACTICE TIMES FOR MONTHS INTO AN ARRAY////////
////////////////////////////////////////////////////////////////////////////////////
export let getMonthlyData = async ()=>{
    
    let data = await getMonthlyEntries()

    let january = data.filter((doc)=> doc.timeStamp.toDate().getMonth()===0)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let february = data.filter((doc)=> doc.timeStamp.toDate().getMonth()===1)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let march = data.filter((doc)=> doc.timeStamp.toDate().getMonth()===2)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let april = data.filter((doc)=> doc.timeStamp.toDate().getMonth()===3)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let may = data.filter((doc)=> doc.timeStamp.toDate().getMonth()===4)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let june = data.filter((doc)=> doc.timeStamp.toDate().getMonth()===5)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let july = data.filter((doc)=> doc.timeStamp.toDate().getMonth()===6)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let august = data.filter((doc)=> doc.timeStamp.toDate().getMonth()===7)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let september = data.filter((doc)=> doc.timeStamp.toDate().getMonth()===8)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let october = data.filter((doc)=> doc.timeStamp.toDate().getMonth()===9)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let november = data.filter((doc)=> doc.timeStamp.toDate().getMonth()===10)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let december = data.filter((doc)=> doc.timeStamp.toDate().getMonth()===11)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)

    let array = new Array(12)

    array[0]=january
    array[1]=february
    array[2]=march
    array[3]=april
    array[4]=may
    array[5]=june
    array[6]=july
    array[7]=august
    array[8]=september
    array[9]=october
    array[10]=november
    array[11]=december

    return array
}

let getYearlyEntries =  async ()=>{
    let curr = new Date()
    const response = await getDocs(collection(db,'userData'))
    let entries  = response.docs.map(doc =>{
        return doc.data()
    }).filter((doc)=>{
        return(
            doc.timeStamp.toDate().getFullYear()===curr.getFullYear()||
            doc.timeStamp.toDate().getFullYear()===curr.getFullYear()-1||
            doc.timeStamp.toDate().getFullYear()===curr.getFullYear()-2||
            doc.timeStamp.toDate().getFullYear()===curr.getFullYear()-3||
            doc.timeStamp.toDate().getFullYear()===curr.getFullYear()-4
        )
    })
    return entries //returns entries from the last 5 years
}

export let getYearlyData = async ()=>{
    let currYear = new Date().getFullYear()
    let data = await getYearlyEntries()

    // let minusFour = data.filter((doc)=> doc.timeStamp.toDate().getYear()===currYear-4)
    // .map((ele)=>  ele.practices[0].minutesPracticed)
    // .reduce((prev, curr) => prev + curr,0)
    function combineData(data, year){
        data.filter((doc)=> doc.timeStamp.toDate().getFullYear()===year)
    .map(ele => ele.practices.map(ele => ele.minutesPracticed).reduce((prev,curr) => prev + curr,0))
    .reduce((prev,curr) => prev+curr,0)
    }

    let minusFour = data.filter(doc => doc.timeStamp.toDate().getFullYear() ===currYear - 4)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let minusThree = data.filter((doc)=> doc.timeStamp.toDate().getYear()===currYear-3)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let minusTwo = data.filter((doc)=> doc.timeStamp.toDate().getFullYear()===currYear-2)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)
    let minusOne = data.filter((doc)=> doc.timeStamp.toDate().getFullYear()===currYear-1)
    .map((ele)=>  ele.practices[0].minutesPracticed)
    .reduce((prev, curr) => prev + curr,0)

    let currentYear = data.filter((doc)=> doc.timeStamp.toDate().getFullYear()===currYear)
    .map(ele => ele.practices.map(ele => ele.minutesPracticed).reduce((prev,curr) => prev + curr,0))
    .reduce((prev,curr) => prev+curr,0)
 

    let array = new Array(5)
    array[0] = minusFour
    array[1]= minusThree
    array[2] = minusTwo
    array[3] = minusOne
    array[4]= currentYear
    return array
}

getYearlyData()


//write a function that retunrs an array of the minutes that have been spent on each topic
//to get the index of 0 you map over all of the entries in the current month
//you filter out all of the ones that match technique, then you use a reducer function to total the minutes spent of that topic

export const getMonthlyDoughnut = async ()=>{
    //this will return an array of the minutes spent on each topic
    let curr = new Date()
    const response = await getDocs(collection(db,'userData'))
    let entries  = response.docs.map(doc =>{
        return doc.data()
    }).filter((doc)=>{
        return(
            doc.timeStamp.toDate().getFullYear()=== curr.getFullYear() &&
            doc.timeStamp.toDate().getMonth()===curr.getMonth()
        )
    })
    
    let array = new Array(5)
    let technique = entries.map(ele => ele.practices)
    .map(ele =>ele.filter(ele=> ele.topic === 'technique'))
    .filter(ele => ele.length > 0)
    .map(ele=> ele.map(ele => ele.minutesPracticed).reduce((prev,curr) => prev+curr,0))
    .reduce((prev,curr) => prev+curr,0)

    let scales = entries.map(ele => ele.practices)
    .map(ele =>ele.filter(ele=> ele.topic === 'scales'))
    .filter(ele => ele.length > 0)
    .map(ele=> ele.map(ele => ele.minutesPracticed).reduce((prev,curr) => prev+curr,0))
    .reduce((prev,curr) => prev+curr,0)
  
    let ensembleMusic = entries.map(ele => ele.practices)
    .map(ele =>ele.filter(ele=> ele.topic === 'ensembleMusic'))
    .filter(ele => ele.length > 0)
    .map(ele=> ele.map(ele => ele.minutesPracticed).reduce((prev,curr) => prev+curr,0))
    .reduce((prev,curr) => prev+curr,0)
 
    let soloRepertoire = entries.map(ele => ele.practices)
    .map(ele =>ele.filter(ele=> ele.topic === 'soloRepertoire'))
    .filter(ele => ele.length > 0)
    .map(ele=> ele.map(ele => ele.minutesPracticed).reduce((prev,curr) => prev+curr,0))
    .reduce((prev,curr) => prev+curr,0)
  
    let other = entries.map(ele => ele.practices)
    .map(ele =>ele.filter(ele=> ele.topic === 'other'))
    .filter(ele => ele.length > 0)
    .map(ele=> ele.map(ele => ele.minutesPracticed).reduce((prev,curr) => prev+curr,0))
    .reduce((prev,curr) => prev+curr,0)

    array[0] = technique
    array[1] = scales
    array[2] = ensembleMusic
    array[3] = soloRepertoire
    array[4] = other
    
   return array

}

getMonthlyDoughnut()


let date = new Date()
export let year = date.getFullYear()
let month =  date.getMonth()
let day =  date.getDate()
export const weeklyLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
export var weeklyDataSet = getWeeklyData().then(res=>res)



export const monthlyLabels = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export var monthlyDataSet = [30, 21,40,13,67,81,57,24,15,42,33,100]

export var yearlyLabels = [year-4, year-3, year-2, year-1, year]
export var yearlyDataSet = [100,223,250,200,327]








//data for line chare/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lineData= {
    labels: weeklyLabels,
    datasets:[{
      label: 'label',
      data:  [0,0,0,0,0,0,0]
        }]
    }

export const lineOptions = {
    
    borderColor:'rgb(197,57,60)',
    pointBackgroundColor: 'rgb(239,48,84)',
    pointBorderColor: 'rgb(239,48,84)',
    pointBorderWidth: 4,
    pointHoverBorderColor: 'rgb(237,46,17)',
    pointHitRadius: 12,
    plugins:{
        legend:{
            display:false
        }
    },
    scales:{
        x:{
            ticks:{
                color:'black'
            },
            grid:{
                display:false
            }
        },
        y:{
            ticks:{
                color: 'transparent'
            },
            grid:{
                display: false
            }
        }
    }
}
//data for doughnut chart//////////////////////////////
//////////////////////////////////////////////

export const doughnutData = (data) => {
    let obj = {
        labels:[
            'Technique',
            'Scales',
            'Ensemble Music',
            'Solo Repertoire',
            'Other'
        ],
        datasets:[{
            label: 'My First Dataset',
            data: data ? data:[0,0,0,0,0],
            hoverOffset: 50,
            backgroundColor: (context)=>{
                const chart = context.chart
                const {ctx, chartArea} = chart
                if(!chartArea){
                    return null
                }
                if(context.dataIndex ===0){
                    return getRedGradient(chart)
                }if(context.dataIndex ===1){
                    return getDarkGreenGradient(chart)
                } if(context.dataIndex===2){
                    return getDarkBlueGradient(chart)
                }if(context.dataIndex === 3){
                    return getYellowGradient(chart)
                }if(context.dataIndex===4){
                    return getPurpleGradient(chart)
                }else {
                    return 'rgba(0,0,0,.5)'
                }
            }
            
        }],
    }
    return obj
}

export const doughnutOptions = {

    layout:{
        padding: 30
    },
    plugins:{
        legend:{
            display: false
        }
    }
}

//progress Bar Data///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
export const progressData = (minutes, goal)=> {
    let obj = {
            datasets:[{
            label:'Practice Goal Complete',
            data: [minutes,goal-minutes],
            backgroundColor: (context)=>{
                const chart = context.chart
                const {ctx, chartArea} = chart
                if(!chartArea){
                    return null
                }
                if(context.dataIndex ===0){
                    return getPurpleGradient(chart)
                } else {
                    return 'rgba(0,0,0,.5)'
                }
            }
            // backgroundColor: (context) => {
            //     const chart = context.chart
            //     return [getPurpleGradient(chart),'transparent']            
            //     }   
        }]
    }
    return obj
}

export const progressOptions = {
    cutout:'70%',
    borderRadius: 30,
    layout:{
        padding:30
    },
    elements:{
        arc:{
            borderColor:'rgba(0,0,0,0)',
        }
        },
        plugins:{
            legends:{
                display: false
            }
        }
}

