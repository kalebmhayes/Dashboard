import react, {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import {  
         weeklyLabels, 
         monthlyLabels,
         yearlyLabels, 
         lineData, 
         lineOptions, 
         getWeeklyData, 
         getMonthlyData,
         getYearlyData
        } 
from '../utils/Data';




function LineChart(props){
    const [lineChartData, setLineChartData] = useState(lineData)
    const [options, setOptions] = useState(lineOptions)
    const [activeButton, setActiveButton] = useState(1)
    const [weeklyData , setWeeklyData] = useState([])
    const [monthlyData, setMonthlyData] = useState([])
    const [yearlyData, setYearlyData] = useState([])

    useEffect( ()=>{
        async function fetchData(){
            await getWeeklyData().then(res => {changeChart(weeklyLabels, res);setWeeklyData(res)})
            await getMonthlyData().then(res => setMonthlyData(res) )
            await getYearlyData().then(res =>setYearlyData(res) )
             
          
        }
        fetchData()
        
    },[props.show])
   
       
   

    function changeChart(labels, data){
        setLineChartData({
            labels: labels,
            datasets:[{
              label: 'label',
              data: data}]
            })
    }
    function changeActiveButton(buttonId){
        setActiveButton(buttonId)
    }

    

    return(
        <div className='line-chart'>
            <div className='line-chart-buttons-container'>

            <button 
            className={activeButton ===1 ? 'line-chart-buttons active':' line-chart-buttons inactive'    }
            onClick={
                ()=>{changeChart(weeklyLabels,weeklyData)
                    changeActiveButton(1)
                    
                }
                
            }
            >
                Weekly
            </button>

            <button 
                className={activeButton ===2 ? 'line-chart-buttons active':' line-chart-buttons inactive'    }
                onClick={()=> { 
                    changeChart(monthlyLabels,monthlyData) 
                    changeActiveButton(2)}
                }
            >
                Monthly
            </button>
            <button 
                className={activeButton ===3 ? 'line-chart-buttons active':' line-chart-buttons inactive'} 
                onClick={()=>{
                    changeChart(yearlyLabels, yearlyData)
                    changeActiveButton(3)
                    }}
                    >
                    Yearly
                    </button>
            </div>
            <Line data={lineChartData} options={options}/>
        </div>
    )
}

export default LineChart