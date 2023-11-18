import { LeftOutlined, RightOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useSpring, animated } from 'react-spring';
import { useState } from 'react';
import styles from '../style.module.scss';

import Panel from '@/components/Panel';

import Allerway from './modules/Allerway';
import Statistics from './modules/Statistics';
import Tasks from './modules/Tasks';
import { Modal } from 'antd';

import Handles from './modules/Handles';

const Right = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [open, setOpen] = useState(false);
  // 定义动画属性
  const containerAnimation = useSpring({
    // width: isExpanded ? '280px' : '0px',
    transform: isExpanded ? 'translate(0%)' : 'translateX(100%)',
    // padding: isExpanded ? '16px' : '0px',
    // borderWidth: isExpanded ? '1px' : '0px',
    config: { precision: 0.01 },
  });

  // 切换容器状态
  const toggleContainer = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <animated.div
        style={{
          ...containerAnimation,
        }}
        className={`absolute top-2 w-[280px] right-2 bottom-2 ${styles.panel}`}
      >
        <div className="overflow-auto h-full">
          <Panel title="出入库信息">
            <Allerway />
          </Panel>
          <Panel title="出入库统计">
            <Statistics />
          </Panel>
          <Panel
            title="任务分布"
            right={
              <span className="hover:scale-120 transition-transform duration-300 ">
                <UnorderedListOutlined
                  onClick={() => {
                    setOpen(true);
                  }}
                />
              </span>
            }
          >
            <Tasks />
          </Panel>
        </div>
        <div
          className={`${'absolute text-white top-1/2 -translate-y-1/2 left-[-21px] bg-black bg-opacity-20 text-xl font-bold bg'}`}
        >
          {isExpanded ? (
            <RightOutlined
              className="hover:scale-110 transition-transform duration-300"
              onClick={toggleContainer}
            />
          ) : (
            <LeftOutlined
              className="hover:scale-110 transition-transform duration-300 "
              onClick={toggleContainer}
            />
          )}
        </div>
        <Handles />
      </animated.div>

      <Modal
        title="任务列表"
        centered
        open={open}
        // mask={false}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  );
};

export default Right;
