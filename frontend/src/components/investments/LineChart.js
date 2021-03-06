import React from 'react'
import { Line } from 'react-chartjs-2'



function LineChart(props){
  let totalRental  = 0
  if (props.orders){
    props.orders.forEach(order => {
      totalRental += order.property_detail.rental_value * order.ownership
    })
  }

  const rentOverTime = {
    monthOne: totalRental.toLocaleString(undefined, {
      maximumFractionDigits: 2
    }),
    monthTwo: (totalRental * 2).toLocaleString(undefined, {
      maximumFractionDigits: 2
    }),
    monthThree: (totalRental * 3).toLocaleString(undefined, {
      maximumFractionDigits: 2
    }),
    monthFour: (totalRental * 4).toLocaleString(undefined, {
      maximumFractionDigits: 2
    }),
    monthFive: (totalRental * 5).toLocaleString(undefined, {
      maximumFractionDigits: 2
    }),
    monthSix: (totalRental * 6).toLocaleString(undefined, {
      maximumFractionDigits: 2
    })
  }

 

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const thisMonth = new Date()


  const data = {
    labels: [months[thisMonth.getMonth()], 
      months[thisMonth.getMonth() + 1],
      months[thisMonth.getMonth() + 2],
      months[thisMonth.getMonth() + 3],
      months[thisMonth.getMonth() + 4],
      months[thisMonth.getMonth() + 5]],
    datasets: [
      {
        label: 'Estimated Rental Income (£)',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [rentOverTime.monthOne,rentOverTime.monthTwo,rentOverTime.monthThree,rentOverTime.monthFour,rentOverTime.monthFive,rentOverTime.monthSix]
      }
    ]
  }

  return (
    <Line data={data} />
  )
}

export default LineChart