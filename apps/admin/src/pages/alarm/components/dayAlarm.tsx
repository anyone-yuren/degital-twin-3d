import { useState, useEffect } from 'react';
// import { observer } from "mobx-react-lite";
import ReactECharts from 'echarts-for-react';
// import service from "../services";
import { useRequest } from 'ahooks';
import Pannel from '@/components/Panel';

import { GetDayAlarm } from 'apis';

function DayAlarm(props: any) {
  const [typeOption, setTypeOption] = useState<any>({});
  const [levelOption, setLevelOption] = useState<any>({});
  const { data, runAsync } = useRequest(
    (params: any) => {
      console.log('params', params);
      return GetDayAlarm(params);
    },
    { manual: true }
  );

  useEffect(() => {
    runAsync({ DateParm: props.date }).then(({ resultData }: any) => {
      const { warnListByType, warnListBylevel } = resultData;
      const obj: any = { type: [], level: [] };
      warnListByType.map((it: any) => {
        obj.type.push({
          value: it.warnRate,
          name: `${it.errortype}        ${it.warnRate.toFixed(2) * 100}% | ${it.warnCount}`,
        });
      });
      warnListBylevel.map((it: any) => {
        obj.level.push({
          value: it.warnRate,
          name: `${it.errorLevel}        ${it.warnRate.toFixed(2) * 100}% | ${it.warnCount}`,
        });
      });
      setTypeOption({
        title: {
          text: '日告警类型比例',
          left: 'left',
          textStyle: {
            color: 'white',
          },
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: '35%',
          textStyle: {
            color: 'white',
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['52%', '92%'],
            center: ['85%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 3,
              borderColor: '#1a1c25',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: obj.type,
          },
        ],
      });
      setLevelOption({
        title: {
          text: '日告警等级比例',
          left: 'left',
          textStyle: {
            color: 'white',
          },
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: '35%',
          textStyle: {
            color: 'white',
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['52%', '92%'],
            center: ['85%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 3,
              borderColor: '#1a1c25',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: obj.level,
          },
        ],
      });
    });
  }, [props.date]);

  const CardTitle = (props: any) => {
    const className = props.hasBoard ? 'flex border-b-color pb-2' : 'flex pb-2';
    return (
      <div className={className}>
        <div className="flex-1 text-lg">{props.title || '日告警数'}</div>
        {props.nums && <div className="flex-1 text-2xl text-right">{props.nums}</div>}
      </div>
    );
  };
  return (
    <Pannel title="日告警数" right={(data as any)?.resultData?.warnCount ?? 0}>
      <div className="w-full flex flex-col" style={{ height: '300px' }}>
        <div className="flex-1 flex  border-b-color" style={{ height: 0 }}>
          <div className="flex-1 self-center justify-center h-full py-3">
            <ReactECharts style={{ height: '100%' }} option={typeOption} />
          </div>
        </div>
        <div className="flex-1 flex " style={{ height: 0 }}>
          <div className="flex-1 self-center justify-center h-full py-3">
            <ReactECharts style={{ height: '100%' }} option={levelOption} />
          </div>
        </div>
      </div>
    </Pannel>
  );
}
// export default observer(DayAlarm);
export default DayAlarm;
