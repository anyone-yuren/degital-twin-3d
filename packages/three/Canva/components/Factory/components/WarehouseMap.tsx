import { useEffect, useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import Shelf from './shelf';
import Goods from './goods';
import ForkTruck from './forkTruck';
import { observer } from 'mobx-threejs-store';
import { useThree } from '@react-three/fiber';
import shelfData from '../data/shelf';
import goodsData from '../data/goods';
import * as THREE from 'three';

const { Vector3 } = THREE;
import animationData from '../data/animation';

const WarehouseMap = observer(() => {
  const { camera } = useThree();
  const [forkTruckCarData, setForkTruckCarData] = useState({
    position: [460, 0, 700],
    hasGoods: false,
    radian: 0,
    liftArmHeight: 0,
    forkArmHeight: 0,
  });

  const [animationIndex, setAnimationIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  function getDis(delta, data) {
    const { from, to, time } = data;
    const dis_x = ((to[0] - from[0]) / time) * delta;
    const dis_y = ((to[1] - from[1]) / time) * delta;
    const dis_z = ((to[2] - from[2]) / time) * delta;
    return [dis_x, dis_y, dis_z];
  }

  function getRad(delta, data) {
    return (data.varyRadian / data.time) * delta;
  }

  function getHeight(type, data, delta) {
    const { formLiftH, toLiftH, formForkH, toForkH, time } = data;
    if (type === 'liftArm') return ((toLiftH - formLiftH) / time) * delta;
    if (type === 'forkArm') return ((toForkH - formForkH) / time) * delta;
    return 0;
  }

  useFrame((_, delta) => {
    if (animationIndex >= animationData.length) return;

    delta *= 1000;
    const curList = animationData[animationIndex];
    const time = curList[0].time;

    setElapsedTime((prevTime) => prevTime + delta);

    curList.forEach((cur) => {
      const { el, hasGoods, radian, type, liftArmHeight = 0, forkArmHeight = 0 } = cur;
      let dis = [0, 0, 0],
        rad = 0,
        liftH = 0,
        forkH = 0;

      if (type === 'move') dis = getDis(delta, cur);
      if (type === 'rotate') rad = getRad(delta, cur);
      if (type === 'liftArm') liftH = getHeight('liftArm', cur, delta);
      if (type === 'forkArm') forkH = getHeight('forkArm', cur, delta);

      if (el === 'forkTruckCar') {
        setForkTruckCarData((state) => {
          const [x, y, z] = state.position;
          return {
            position: [x + dis[0], y + dis[1], z + dis[2]],
            hasGoods,
            radian: (state.radian || radian) + rad,
            liftArmHeight: (state.liftArmHeight || liftArmHeight) + liftH,
            forkArmHeight: (state.forkArmHeight || forkArmHeight) + forkH,
          };
        });
      }
    });

    if (elapsedTime >= time) {
      setElapsedTime(0);
      setAnimationIndex((prevIndex) => prevIndex + 1);

      if (animationIndex >= animationData.length - 1) {
        // 重置动画
        setForkTruckCarData({
          position: [460, 0, 700],
          hasGoods: false,
          radian: 0,
          liftArmHeight: 0,
          forkArmHeight: 0,
        });
        setAnimationIndex(0);
      }
    }
  });

  const goodsEl = useMemo(
    () => goodsData.map((item, index) => <Goods groupProps={{ position: item }} key={index} />),
    []
  );

  const shelfEl = useMemo(
    () =>
      shelfData.map((item, index) => (
        <Shelf layout={item.layout} groupProps={{ position: item.position }} key={index} />
      )),
    []
  );

  const forkTruck = useMemo(() => <ForkTruck {...forkTruckCarData} />, [forkTruckCarData]);

  return (
    <group>
      {goodsEl}
      {shelfEl}
      {forkTruck}
      {!forkTruckCarData.hasGoods && <Goods groupProps={{ position: [600, 146, -722] }} />}
    </group>
  );
});

export default WarehouseMap;
