import { useEffect, useState } from 'react';

import * as echarts from 'echarts/core';
import ReactECharts from 'echarts-for-react';

import { useRequest } from 'ahooks';
import moment from 'moment';
import { GetWeekAlarm } from 'apis';
import Pannel from '@/components/Panel';

function WeekAlarm(props: any) {
  const { runAsync } = useRequest(GetWeekAlarm, { manual: true });
  const [option, setOption] = useState({});

  useEffect(() => {
    const weekOfDay = parseInt(moment(props.date).format('E')); //计算今天是这周第几天

    let dateAry: any = [],
      dataObj: any = {},
      i = 7;
    while (i > 0) {
      const days = moment()
        .startOf('day')
        .subtract(weekOfDay - i, 'days')
        .format('YYYY-MM-DD');
      dateAry.push(days);
      dataObj[days] = 0;
      i--;
    }
    dateAry.reverse();

    runAsync({ StartDate: dateAry[0], Enddate: dateAry[6] }).then(({ resultData }: any) => {
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
            interval: 0,
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
    <Pannel title={'周告警数'}>
      <ReactECharts option={option} />
    </Pannel>
  );
}
export default WeekAlarm;
