import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { config } from '../../config';
import * as echarts from 'echarts/core';
import { GetCurrentLocationSummary } from 'apis';

const Task: React.FC = () => {
  const trafficWay = [
    {
      name: 'HG',
      value: 20,
    },
    {
      name: 'RG',
      value: 10,
    },
    {
      name: 'MG',
      value: 20,
    },
    {
      name: 'FM',
      value: 10,
    },
    {
      name: 'PG',
      value: 30,
    },
  ];

  const data = [];
  const color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00'];
  for (let i = 0; i < trafficWay.length; i++) {
    data.push(
      {
        value: trafficWay[i].value,
        name: trafficWay[i].name,
        itemStyle: {
          normal: {
            borderWidth: 5,
            shadowBlur: 20,
            borderColor: color[i],
            shadowColor: color[i],
          },
        },
      },
      {
        value: 2,
        name: '',
        itemStyle: {
          normal: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0,
          },
        },
      }
    );
  }
  const seriesOption = [
    {
      name: '',
      type: 'pie',
      clockWise: false,
      radius: [35, 39],
      center: ['50%', '35%'],
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: 'outside',
            color: '#ddd',
            formatter: function (params) {
              let percent = 0;
              let total = 0;
              for (let i = 0; i < trafficWay.length; i++) {
                total += trafficWay[i].value;
              }
              percent = ((params.value / total) * 100).toFixed(0);
              if (params.name !== '') {
                return '' + params.name + '\n' + '\n' + '' + percent + '%';
              } else {
                return '';
              }
            },
          },
          labelLine: {
            length: 10,
            length2: 20,
            show: true,
            color: '#00ffff',
          },
        },
      },
      data: data,
    },
  ];
  const option = {
    color: color,
    title: {
      text: '',
      top: '48%',
      textAlign: 'center',
      left: '49%',
      textStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '400',
      },
    },
    tooltip: {
      show: true,
    },
    legend: {
      icon: 'circle',
      // 设置icon大小
      itemWidth: 8,
      orient: 'horizontal',
      // x: 'left',
      data: ['HG', 'RG', 'MG', 'FM', 'PG'],
      left: 10,
      bottom: 20,
      align: 'left',
      textStyle: {
        color: '#fff',
      },
      itemGap: 10,
    },
    toolbox: {
      show: false,
    },
    grid: {
      // left: '25%', // 调整网格左侧位置
      // top: '20%', // 调整网格顶部位置
      // right: '25%', // 调整网格右侧位置
      // bottom: '20%', // 调整网格底部位置
    },
    series: seriesOption,
  };
  return (
    <>
      <div>
        <ReactECharts style={{ height: '200px' }} option={option} />
      </div>
    </>
  );
};

export default Task;
