import { ScrollBoard } from '@jiaminghi/data-view-react';

const Allerway = () => {
  const config = {
    header: ['编号', '时间', '类型', '区域', '单号'],
    data: [
      ['1', '2023-06-01 12:00:00', '入库', 'A1', 'b12c3'],
      ['2', '2023-06-01 12:00:00', '出库', 'A2', 'b12c3'],
      ['3', '2023-06-01 12:00:00', '入库', 'A3', 'b12c3'],
      ['4', '2023-06-01 12:00:00', '出库', 'A4', 'b12c3'],
      ['5', '2023-06-01 12:00:00', '入库', 'A5', 'b12c3'],
      ['6', '2023-06-01 12:00:00', '出库', 'A6', 'b12c3'],
      ['7', '2023-06-01 12:00:00', '入库', 'A7', 'b12c3'],
      ['8', '2023-06-01 12:00:00', '出库', 'A8', 'b12c3'],
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

export default Allerway;
