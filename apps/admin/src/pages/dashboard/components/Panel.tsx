import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import styles from './style.module.scss';
export default function Card(props: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const config = {
    mass: 1,
    tension: 170,
    friction: 26,
    clamp: false,
    precision: 0.01,
    velocity: 0,
  };

  const [{ xys }, api] = useSpring(() => ({ xys: [0, 0, 1], config }), [config]);

  const handleMouseLeave = () =>
    api.start({
      xys: [0, 0, 1],
    });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    api.start({
      xys: calc(e.clientX, e.clientY, rect),
    });
  };

  return (
    <div className="w-full mt-2" ref={cardRef}>
      <div>
        <animated.div
          className={`border  border-solid ${styles['animate-border-glow']} ${styles.card} `}
          style={{ transform: xys.to(trans) }}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <p className={`${styles.title} text-sm  flex justify-between border-solid`}>
            {props.title} {props.right}
          </p>
          {props.children}
        </animated.div>
      </div>
    </div>
  );
}

const calc = (x: number, y: number, rect: DOMRect | undefined) => [
  -(y - rect!.top - rect!.height / 2) / 50,
  (x - rect!.left - rect!.width / 2) / 50,
  1.01,
];

const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
