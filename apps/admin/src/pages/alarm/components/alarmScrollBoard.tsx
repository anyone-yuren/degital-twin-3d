import { useEffect, useState } from 'react';

import { ScrollBoard } from '@jiaminghi/data-view-react';
import { useRequest } from 'ahooks';
import { GetNowAlarm } from 'apis';
import Pannel from '@/components/Panel';

function AlarmScrollBoard() {
  const { runAsync } = useRequest(GetNowAlarm, { manual: true });
  const [config, setConfig] = useState({});

  useEffect(() => {
    runAsync().then((_data: any) => {
      transform(_data);
    });
  }, []);

  const transform = ({ resultData }: any) => {
    const ary: any = [];
    // tag-gren-box tag-yellow-box tag-pop-box
    resultData.map((r: any) => {
      ary.push([
        `<span class='tag-box rounded-md'>${r.errorType}</span>`,
        `<span class='tag-box rounded-md'>${r.errorLevel}</span>`,
        r.errorArea,
        r.errorMsg,
        r.errorTime,
        r.errorState,
        '',
      ]);
    });
    setConfig({
      // columnWidth: [60],
      headerHeight: 45,
      index: true,
      indexHeader: '序号',
      headerBGC: '#262833',
      oddRowBGC: '#262833',
      evenRowBGC: '#1a1c25',
      rowNum: 6,
      align: ['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center'],
      header: ['告警类型', '告警等级', '告警位置', '告警内容', '告警时间', '处理状态', ''],
      columnWidth: [60, 100, 100],
      data: ary,
    });
  };
  return (
    <Pannel scale={300}>
      <div className="flex flex-col" style={{ height: '370px' }}>
        <div className="flex-1">
          <ScrollBoard style={{ height: '100%' }} config={config}></ScrollBoard>
        </div>
        <div className="flex pb-5" style={{ height: '40px' }}>
          <div className="justify-self-center self-center">
            <span>告警类型</span>
            <span className="ml-5 tag-box rounded-md">天眼</span>
            <span className="ml-5 tag-box rounded-md">AGV</span>
            <span className="ml-5 tag-box rounded-md">上线口</span>
            <span className="ml-5 tag-box rounded-md">下线口</span>
          </div>
          <div className="ml-10 justify-self-center self-center">
            <span>告警等级</span>
            <span className="ml-5 tag-box rounded-md">警告</span>
            <span className="ml-5 tag-gren-box rounded-md">一级</span>
            <span className="ml-5 tag-yellow-box rounded-md">二级</span>
            <span className="ml-5 tag-pop-box rounded-md">三级</span>
          </div>
        </div>
      </div>
    </Pannel>
  );
}
export default AlarmScrollBoard;
