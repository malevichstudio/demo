import React from "react";
import Chart from "react-apexcharts";

const Area = ({ data, isMultiline }) => {
  const series = isMultiline
    ? data
    : [{
      data,
    }];
  const options = {
    tooltip: {
      enabled: false,
    },
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
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
          colors: 'rgba(0, 0, 0, 0.87)',
          fontSize: '16px',
          fontWeight: 500,
          cssClass: 'apexcharts-xaxis-label',
        },
        format: 'MM.dd.yy'
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'rgba(0, 0, 0, 0.87)',
          fontSize: '16px',
          fontWeight: 500,
          cssClass: 'apexcharts-xaxis-label',
        },
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
  };
  return (
    <div>
      <div className={'wrapper'}>
        <Chart
          options={options}
          series={series}
          type="area"
          width="100%"
          height='400'
        />
      </div>
    </div>
  )
};

export default Area;