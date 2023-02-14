import react,{useState, useEffect} from 'react'
import 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'
import shadowPlugin from '../utils/shadowPlugin'
import { doughnutData, doughnutOptions, getMonthlyDoughnut } from '../utils/Data'

const DoughnutChart = (props)=>{

    const [doughnutChartData, setDoughnutChartData] = useState(doughnutData)
    const [options,setOptions] = useState(doughnutOptions)

     
    useEffect( ()=>{
        async function fetchData(){
            await getMonthlyDoughnut().then(res =>setDoughnutChartData(doughnutData(res)))
        }
        fetchData()
    },[props.show])
 

    return(
        <div  
        // className='chart-container'
        className='doughnut-chart'
        >
            <Doughnut
            
            data={doughnutChartData}
            options={options}
            plugins={[shadowPlugin]}
            className='chart'
            />
           
        </div>
    )
}

export default DoughnutChart