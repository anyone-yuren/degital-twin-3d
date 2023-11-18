import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { config } from '../../config';
import * as echarts from 'echarts/core';
import { GetCurrentLocationSummary } from 'apis';

const Buffer: React.FC = () => {
  const { data } = useRequest(() => GetCurrentLocationSummary({}), {
    ...config,
  });

  const resultData = data?.resultData || {};

  var barWidth = 3;
  const option3_xdata = [
    'A12',
    'A2',
    'A3',
    'A4',
    'A5',
    'A7',
    'B1',
    'B3',
    'Y2',
    'Y1',
    'C1',
    'C2',
    'C4',
    'A1',
    'B4',
    'C6',
  ];
  const option3_Ydata = [75, 62, 57, 42, 35, 32, 29, 27, 75, 62, 57, 42, 35, 32, 29, 27];

  const option3_Ydatamax = [];
  var yMax2 = Math.max.apply(null, option3_Ydata);
  for (var i = 0; i < option3_Ydata.length; i++) {
    option3_Ydatamax.push(yMax2);
  }

  const option = {
    title: {
      show: false,
    },
    tooltip: {
      trigger: 'item',
    },
    grid: {
      borderWidth: 0,
      top: '10',
      left: '10',
      right: '30',
      bottom: '3%',
    },
    // color: color,
    yAxis: [
      {
        inverse: true,
        type: 'category',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          inside: false,
        },
        data: option3_xdata,
      },
    ],
    xAxis: {
      type: 'value',

      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        right: 0,
        width: 8,
        height: '84%',
        top: '7%',
        start: 0,
        end: 50,
        zoomLock: true,
        // show: false,
        showDetail: false,
        showDataShadow: false,
        brushSelect: false,
        fillerColor: 'rgba(200,200,200,.3)',
        backgroundColor: 'rgba(200,200,200,.05)',
        borderColor: 'transparent',
        handleSize: '0%',
      },
    ],

    series: [
      {
        name: '',
        type: 'bar',
        zlevel: 2,
        barWidth: barWidth,
        itemStyle: {
          normal: {
            barBorderRadius: 2,
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: '#248ff7',
              },
              {
                offset: 1,
                color: '#6851f1',
              },
            ]),
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 1, color: '#83bff6' },
            ]),
          },
        },
        data: option3_Ydata,
        animationDuration: 1500,
        label: {
          normal: {
            color: '#555',
            show: true,
            position: [0, '-16px'],
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
            formatter: function (a, b) {
              return a.name;
            },
          },
        },
      },
      {
        // 背景
        type: 'pictorialBar',
        animationDuration: 0,
        symbolRepeat: 'fixed',
        symbolMargin: '20%',
        symbol: 'roundRect',
        symbolSize: [barWidth * 1.2, barWidth],
        itemStyle: {
          normal: {
            color: 'rgba(200,200,200,.06)',
          },
        },
        label: {
          normal: {
            color: '#fff',
            show: true,
            position: 'right',
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
            formatter: function (a) {
              console.log(a);
              return option3_Ydata[a.dataIndex];
            },
          },
        },
        data: option3_Ydatamax,
        z: 0,
        animationEasing: 'elasticOut',
      },
    ],
    animationEasing: 'cubicOut',
  };

  return (
    <>
      <div>
        <ReactECharts style={{ height: '240px' }} option={option} />
      </div>
    </>
  );
};

export default Buffer;
