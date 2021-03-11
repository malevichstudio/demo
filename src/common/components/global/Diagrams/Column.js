import React from "react";
import Chart from "react-apexcharts";

const Column = ({
   fontSize,
 }) => {
  const colors = ["#0583F8"];
  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50]
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false,
      },
      events: {
        click: function(chart, w, e) {
          // console.log(chart, w, e)
        }
      }
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [
        'Подписчики',
        'Охват',
        'Показы',
        'Вовлечение',
      ],
      labels: {
        style: {
          colors: ["#474747"],
          fontSize: `${fontSize}px`
        }
      }
    }
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
      />
    </div>
  )
};

export default Column;