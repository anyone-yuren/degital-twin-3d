// import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import ReactECharts from 'echarts-for-react';
import { GetAreaLocationWeekSummary } from 'apis';
import { config } from '../../config';
import { useRequest } from 'ahooks';

function Capacity() {
  const [data, setData] = useState<Record<string, any>[]>([]);
  useRequest(init, { ...config });

  async function init() {
    const res = await GetAreaLocationWeekSummary<Record<string, any>[]>({});
    setData(res.resultData || []);
  }

  const options = {
    title: {
      text: '一周库容曲线图',
      top: 16,
      left: 16,
      textStyle: {
        color: '#FBFBFB',
        //字体风格,'normal','italic','oblique'
        fontStyle: 'normal',
        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
        fontWeight: 'bold',
        //字体系列
        fontFamily: 'sans-serif',
        //字体大小
        fontSize: 15,
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#414348',
        },
      },
      axisLabel: {
        textStyle: {
          color: 'white',
        },
      },
      axisLine: {
        show: false,
      },
      data: data.map((item) => item.reportDate.split(' ')[0]),
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
    },
    grid: {
      x: 50,
      y: 50,
      x2: 20,
      y2: 30,
    },
    series: [
      {
        data: data.map((item) => item.emptyLocationTotal),
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#06CDCE',
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#06CDCE' },
              { offset: 1, color: '#06CDCE00' },
            ]),
          },
        },
      },
    ],
  };

  return <ReactECharts option={options} />;
}
// export default observer(Capacity);
export default Capacity;
