import React,{useEffect , useState} from 'react';
import Chart from 'chart.js/auto';


const BarChart = ({weekOrderData}) =>{

    let myChart 

    useEffect(() => {

        chart()

        return () => myChart.destroy()

    },[weekOrderData])

    let days =  weekOrderData.map(i =>i.day)
    let revenue =  weekOrderData.map(i=>i.revenue)

    // console.log("ans--->",revenue)
    
    const chart = () =>{

        
        const ctx = document.getElementById('myChart');
        myChart = new Chart(ctx, {

         
            type: 'bar',
            data: {
                labels : days,
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','blue'],
                datasets: [{
                    label: 'Level',
                    data: revenue,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

  
    return (
      <div>
          <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    )


}

export default BarChart;