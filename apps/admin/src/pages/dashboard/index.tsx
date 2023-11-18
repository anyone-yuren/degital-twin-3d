import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Col, Row, Spin, Statistic } from 'antd';
import { FC, Suspense } from 'react';

import { currentTimeRange } from 'utils';
import Left from './components/left';
import Right from './components/right';
import Bottom from './components/bottom';

import styles from './style.module.scss';
import { Canvas } from 'threejs';
import { ThreeMobx, observer } from 'mobx-threejs-store';

const Workplace: FC = () => {
  return (
    <ThreeMobx>
      <Suspense fallback={<Spin size="small" />}>
        <Canvas />
        <Left />
        <Right />
        {/* <Bottom /> */}
      </Suspense>
    </ThreeMobx>
  );
};
export default observer(Workplace);
