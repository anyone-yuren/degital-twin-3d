import { useState } from 'react';
import { Spin } from 'antd';
import { FC, Suspense } from 'react';

import DayAlarm from './components/dayAlarm';
import WeekAlarm from './components/weekAlarm';
import MonthAlarm from './components/monthAlarm';
import AlarmScrollBoard from './components/alarmScrollBoard';
import moment from 'moment';
import './style/index.less';

const Workplace: FC = () => {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  return (
    <Suspense fallback={<Spin size="small" />}>
      <div className="flex h-full flex-col text-white">
        <div className="flex py-3 px-5">
          <div className="flex-1 self-center">环境: 温度28°C | 湿度 65°C | 光照 强 | 粉尘 20</div>
          <div className="flex-1 text-right">{moment(date).format('YYYY-MM-DD')}</div>
        </div>
        <div className="alarm-layout flex-1">
          {/* 表格的轮播图 */}
          <div className="bottom p-5">
            <AlarmScrollBoard></AlarmScrollBoard>
          </div>
          {/* 左上方的日告警数 */}
          <div className="left p-3">
            <DayAlarm date={date}></DayAlarm>
          </div>
          <div className="center p-3">
            <WeekAlarm date={date}></WeekAlarm>
          </div>
          <div className="right p-3">
            <MonthAlarm date={date}></MonthAlarm>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default Workplace;
