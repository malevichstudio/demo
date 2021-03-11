import React from "react";
import Chart from "react-apexcharts";

const Pie = ({
  colors,
  data,
  round = 2,
 }) => {
  const series = data.map(({ percentage }) => Number(percentage.toFixed(2)));
  const options = {
    chart: {
      type: 'donut',
    },
    colors,
    labels: data.map(({ name }) => name),
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        // startAngle: 70,
        // customScale: 1,
        donut: {
          size: '50%'
        }
      },
    },
    responsive: [{
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div>
      <div>
        <Chart
          options={options}
          series={series}
          type="donut"
        />
      </div>
    </div>
  )
};

export default Pie;