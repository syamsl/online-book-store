import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';


const PieChart = ({ paymentData }) => {

    let myChart

    useEffect(() => {

        pieChart()

        return () => myChart.destroy()

    }, [paymentData])


    let methods = paymentData.map((method) => {
        if (method._id === 'succeeded') {
            return 'Stripe'
        } else {
            return method._id
        }
    })

    let datas = paymentData.map(i => i.count)

    // console.log("ans--->", methods)

    const pieChart = () => {

        const ctx = document.getElementById('pie');
        myChart = new Chart(ctx, {

            type: 'doughnut',
            data: {
                labels: methods,
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Level',
                    data: datas,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: [
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
            <canvas id="pie" width="400" height="400"></canvas>
        </div>
    )


}

export default PieChart;