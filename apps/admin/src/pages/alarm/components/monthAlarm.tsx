import { useState, useEffect } from 'react';

import * as echarts from 'echarts/core';
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import moment from 'moment';
import { GetMonthAlarm } from 'apis';
import Pannel from '@/components/Panel';

function MonthAlarm(props: any) {
  const [option, setOption] = useState({});
  const { runAsync } = useRequest(GetMonthAlarm, { manual: true });

  useEffect(() => {
    const monthCount = moment(props.date).daysInMonth();
    const startDays = moment(props.date).startOf('month').format('YYYY-MM-DD');
    let dateAry: any = [startDays],
      dataObj: any = { [startDays]: 0 },
      i = 1;
    while (i < monthCount) {
      const day = moment(startDays).add(i, 'days').format('YYYY-MM-DD');
      dateAry.push(day);
      dataObj[day] = 0;
      i++;
    }

    runAsync({ DateParm: props.date }).then(({ resultData }: any) => {
      const { warnListByType } = resultData;
      warnListByType.map((it: any) => {
        const key = it.warnDate.split(' ')[0];
        dataObj[key] = dataObj[key] + it.warnCount;
      });
      const dataYAry: any = [];
      dateAry.map((it: any, index: number) => {
        dataYAry[index] = dataObj[it];
      });
      setOption({
        title: {
          text: ' ',
          textStyle: {
            color: 'white',
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine: {
            show: true,
            interval: 3,
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
          data: dateAry || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            data: dataYAry || [820, 932, 621, 934, 1290, 1330, 567],
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#2977F3',
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2977F3' },
                  { offset: 1, color: '#2977F300' },
                ]),
              },
            },
          },
        ],
        grid: {
          x: 50,
          y: 40,
          x2: 30,
          y2: 30,
        },
      });
    });
  }, [props.date]);
  return (
    <Pannel title={'月告警数'}>
      <ReactECharts option={option} />
    </Pannel>
  );
}
export default MonthAlarm;
