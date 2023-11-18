import { ScrollBoard } from '@jiaminghi/data-view-react';

const AgvPanel = () => {
  const config = {
    header: ['编号', '电量', '位置', '速度'],
    data: [
      ['AGV1', '100%', 'A1', '1m/s'],
      ['AGV2', '100%', 'A2', '1m/s'],
      ['AGV3', '100%', 'A3', '1m/s'],
      ['AGV4', '100%', 'A4', '1m/s'],
      ['AGV5', '100%', 'A5', '1m/s'],
      ['AGV6', '100%', 'A6', '1m/s'],
      ['AGV7', '100%', 'A7', '1m/s'],
      ['AGV8', '100%', 'A8', '1m/s'],
      ['AGV9', '100%', 'A9', '1m/s'],
      ['AGV10', '100%', 'A10', '1m/s'],
      ['AGV11', '100%', 'A11', '1m/s'],
    ],
    headerBGC: '#00fff138',
    oddRowBGC: '#00000017',
    evenRowBGC: '#ededed13',
    headerHeight: 28,
    rowNum: 8,
    columnWidth: [80, 70, 60, 100],
  };
  return (
    <ScrollBoard
      config={config}
      style={{ width: '100%', height: '220px', fontSize: '12px', marginBottom: '8px' }}
    />
  );
};

export default AgvPanel;
