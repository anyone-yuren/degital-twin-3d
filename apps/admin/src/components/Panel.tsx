import { useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import styles from './style.module.scss';
export default function Panel(
  props: {
    title: string;
    children: React.ReactNode;
    right?: React.ReactNode;
    panelConfig?: any; // 具体参数可查看：https://www.react-spring.dev/docs/advanced/config
    scale?: number;
  } = {
    panelConfig: {},
    title: '',
    children: {},
    scale: 50,
  }
) {
  const cardRef = useRef(null);
  const config = {
    mass: 1,
    tension: 170,
    friction: 26,
    clamp: false,
    precision: 0.01,
    velocity: 0,
    ...props.panelConfig,
  };

  const calc = (x, y, rect) => [
    -(y - rect.top - rect.height / 2) / (props.scale || 50),
    (x - rect.left - rect.width / 2) / (props.scale || 50),
    1.01,
  ];

  const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  const [{ xys }, api] = useSpring(() => ({ xys: [0, 0, 1], config }), [config]);

  const handleMouseLeave = () =>
    api.start({
      xys: [0, 0, 1],
    });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    api.start({
      xys: calc(e.clientX, e.clientY, rect),
    });
  };

  return (
    <div className="w-full mt-2" ref={cardRef}>
      {/* <BorderBox8 dur={12}> */}
      <div>
        <animated.div
          className={`border  border-solid ${styles['animate-border-glow']} ${styles.card} `}
          style={{ transform: xys.to(trans) }}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {props.title && (
            <p className={`${styles.title} text-sm  flex justify-between border-solid`}>
              {props.title} {props.right}
            </p>
          )}
          {props.children}
        </animated.div>
      </div>
      {/* </BorderBox8> */}
    </div>
  );
}
