import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useSpring, animated } from 'react-spring';
import { useState } from 'react';
import styles from '../style.module.scss';

import Panel from '@/components/Panel';

import Buffer from './modules/Buffer';
import Task from './modules/Task';
import AgvPanel from './modules/AgvPanel';

const Left = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  // 定义动画属性
  const containerAnimation = useSpring({
    // width: isExpanded ? '280px' : '0px',
    transform: isExpanded ? 'translate(0%)' : 'translateX(-100%)',
    // padding: isExpanded ? '16px' : '0px',
    // borderWidth: isExpanded ? '1px' : '0px',
    config: { precision: 0.01 },
  });

  // 切换容器状态
  const toggleContainer = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <animated.div
      style={{
        ...containerAnimation,
      }}
      className={`absolute top-2 left-2 bottom-2 w-[280px] ${styles.panel}`}
    >
      <div className="h-full overflow-auto">
        <Panel title="库房情况">
          <Buffer />
        </Panel>
        <Panel title="库存类型">
          <Task />
        </Panel>
        <Panel title="AGV信息">
          <AgvPanel />
        </Panel>
      </div>
      <div
        className={`${'absolute text-white top-1/2 -translate-y-1/2 right-[-21px] bg-black bg-opacity-20 text-xl font-bold bg'}`}
      >
        {isExpanded ? (
          <LeftOutlined
            className="hover:scale-110 transition-transform duration-300 "
            onClick={toggleContainer}
          />
        ) : (
          <RightOutlined
            className="hover:scale-110 transition-transform duration-300"
            onClick={toggleContainer}
          />
        )}
      </div>
    </animated.div>
  );
};

export default Left;
