import React from "react";
import Chart from "react-apexcharts";

const Temp = () => {
  const series = [{
    data: [
      [new Date('05 Mar 2012').getTime(),5],
      [new Date('20 Mar 2012').getTime(),10],
      [new Date('10 Jul 2012').getTime(),15],
      [new Date('01 Aug 2012').getTime(),20],
    ],
    name: "Охваты",
  },{
    data: [
      [new Date('05 Mar 2012').getTime(),1],
      [new Date('20 Mar 2012').getTime(),4],
      [new Date('10 Jul 2012').getTime(),5],
      [new Date('01 Aug 2012').getTime(),15],
    ],
    name: "Показы",
  },
    {
      data: [
        [new Date('05 Mar 2012').getTime(),7],
        [new Date('20 Mar 2012').getTime(),11],
        [new Date('10 Jul 2012').getTime(),45],
        [new Date('01 Aug 2012').getTime(),55],
      ],
      name: "Вовлечение",
    }
  ];
  const options = {
    tooltip: {
      enabled: false,
    },
    colors: ['#A6CEE3', '#1F78B4', '#B2DF8A'],
    chart: {
      id: 'area-datetime',
      type: 'line',
      height: 350,
      zoom: {
        autoScaleYaxis: false,
      },
      toolbar: {
        show: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
        format: 'MM.dd.yy'
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
      }
    },
  };
  return (
    <div>
      <div className={'wrapper'}>
        <Chart
          options={options}
          series={series}
          type="line"
          width="100%"
          height='400'
        />
      </div>
    </div>
  )
};

export default Temp;