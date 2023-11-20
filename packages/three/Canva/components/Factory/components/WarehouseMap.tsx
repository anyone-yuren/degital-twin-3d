import { useEffect, useRef, useMemo } from 'react';
import { useFBX } from '@react-three/drei';
import Stats from 'three/examples/jsm/libs/stats.module';
import { useFrame } from '@react-three/fiber';
import React, { useState } from 'react';
import Lifter from './lifter';
import Shelf from './shelf';
import StereoscopicShelf from './stereoscopicShelf';
import StereoscopicTrack from './stereoscopicTrack';
import Goods from './goods';
import FourWayCar from './fourWayCar';
import MxwCar from './mxwCar';
import ForkTruck from './forkTruck';
import Ground from './Ground';
import { observer } from 'mobx-threejs-store';
import Tunnel from './tunnel';
import Area from './area';
import { useThree } from '@react-three/fiber';

import shelfData from '../data/shelf';
import goodsData from '../data/goods';
import stereoscopicShelfData from '../data/stereoscopicShelf';
import * as THREE from 'three';
const { Vector3 } = THREE;
import animationData from '../data/animation';
import tunnelData from '../data/tunnel';
import areaData from '../data/area';
import ConveyerBelt from './conveyerBelt';
import conveyerBeltData from '../data/conveyerBelt';

let index = 0;
let cntTime = 0;

const WarehouseMap = observer(() => {
  const { camera } = useThree();
  const [fourWayCarData, setFourWayCarData] = useState({
    position: [-125, 23, 32],
    hasGoods: true,
  });
  const [mxwCarData, setMxwCarData] = useState({
    position: [400, 0, 700],
    hasGoods: false,
    radian: 0,
  });
  const [forkTruchCarData, setForkTruchCarData] = useState({
    position: [460, 0, 700],
    hasGoods: false,
    radian: 0,
    liftArmHeight: 0,
    forkArmHeight: 0,
  });
  const [forkTruchCarData2, setForkTruchCarData2] = useState({
    position: [-780, 0, -300],
    hasGoods: false,
    radian: 0,
    liftArmHeight: 0,
    forkArmHeight: 0,
  });
  const [conveyerBeltData, setConveyerBeltData] = useState({
    goodsPosition: [76, 25, 0],
    hasGoods: false,
  });
  const statsRef = useRef<Stats | null>(null);

  // useEffect(() => {
  //   const stats = new Stats();
  //   statsRef.current = stats;
  //   document.body.appendChild(stats.dom);
  //   // 渲染循环
  //   const animate = () => {
  //     if (statsRef.current) {
  //       statsRef.current.begin();
  //     }
  //     if (statsRef.current) {
  //       statsRef.current.end();
  //     }
  //     requestAnimationFrame(animate);
  //   };

  //   animate();

  //   // 组件卸载时清理
  //   return () => {
  //     if (statsRef.current) {
  //       document.body.removeChild(statsRef.current.dom);
  //       statsRef.current = null;
  //     }
  //   };
  // }, []);

  function getDis(delta: number, data: any) {
    const { from, to, time } = data;
    const [x1, y1, z1] = from;
    const [x2, y2, z2] = to;
    const dis_x = ((x2 - x1) / time) * delta;
    const dis_y = ((y2 - y1) / time) * delta;
    const dis_z = ((z2 - z1) / time) * delta;
    return [dis_x, dis_y, dis_z];
  }

  function getRad(delta: number, data: any) {
    const { varyRadian, time } = data;
    const rad = (varyRadian / time) * delta;
    return rad;
  }

  function getHeight(type: string, data: any, delta: number) {
    let h = 0;
    if (type === 'liftArm') {
      const { formLiftH, toLiftH, time } = data;
      h = ((toLiftH - formLiftH) / time) * delta;
    } else if (type === 'forkArm') {
      const { formForkH, toForkH, time } = data;
      h = ((toForkH - formForkH) / time) * delta;
    }
    return h;
  }

  useFrame((_, delta) => {
    if (index > animationData.length) return;
    delta *= 1000;
    const curList = animationData[index];
    const time = curList[0].time;
    for (let j = 0; j < curList.length; j++) {
      const cur = curList[j];
      const { el, hasGoods, radian, type, liftArmHeight = 0, forkArmHeight = 0 } = cur;
      let dis: number[] = [0, 0, 0];
      let rad = 0;
      let liftH = 0;
      let forkH = 0;
      if (type === 'move') dis = getDis(delta, cur);
      if (type === 'rotate') rad = getRad(delta, cur);
      if (type === 'liftArm') liftH = getHeight('liftArm', cur, delta);
      if (type === 'forkArm') forkH = getHeight('forkArm', cur, delta);
      const [dis_x, dis_y, dis_z] = dis;
      if (el === 'mxwCar') {
        setMxwCarData((state) => {
          const [x, y, z] = state.position;
          return {
            position: [x + dis_x, y + dis_y, z + dis_z],
            hasGoods,
            radian: (state.radian || radian) + rad,
          };
        });
        // 相机始终跟随mxwCar
        // camera.position.set(
        //   mxwCarData.position[0],
        //   mxwCarData.position[1] + 100,
        //   mxwCarData.position[2] + 300
        // );
        // //相机跟随小车旋转
        // // camera.rotation.setY(mxwCarData.radian);
        // // camera.rotation.set(0, mxwCarData.radian, 0);
        // // 相机角度跟随
        // camera.lookAt(mxwCarData.position[0], mxwCarData.position[1], mxwCarData.position[2]);
      } else if (el === 'forWayCar') {
        setFourWayCarData((state) => {
          const [x, y, z] = state.position;
          return {
            position: [x + dis_x, y + dis_y, z + dis_z],
            hasGoods,
          };
        });
      } else if (el === 'forkTruckCar') {
        setForkTruchCarData((state) => {
          const [x, y, z] = state.position;
          return {
            position: [x + dis_x, y + dis_y, z + dis_z],
            hasGoods,
            radian: (state.radian || radian) + rad,
            liftArmHeight: (state.liftArmHeight || liftArmHeight) + liftH,
            forkArmHeight: (state.forkArmHeight || forkArmHeight) + forkH,
          };
        });
      } else if (el === 'conveyerBelt') {
        setConveyerBeltData((state) => {
          const [x, y, z] = state.goodsPosition;
          return {
            goodsPosition: [x + dis_x, y + dis_y, z + dis_z],
            hasGoods,
          };
        });
      } else if (el === 'forkTruckCar2') {
        setForkTruchCarData2((state) => {
          const [x, y, z] = state.position;
          return {
            position: [x + dis_x, y + dis_y, z + dis_z],
            hasGoods,
            radian: (state.radian || radian) + rad,
            liftArmHeight: (state.liftArmHeight || liftArmHeight) + liftH,
            forkArmHeight: (state.forkArmHeight || forkArmHeight) + forkH,
          };
        });
      }
    }
    cntTime += delta;
    if (cntTime >= time) {
      cntTime = 0;
      index++;
      if (index >= animationData.length) {
        setFourWayCarData({ position: [-125, 23, 32], hasGoods: true });
        setMxwCarData({ position: [400, 0, 700], hasGoods: false, radian: 0 });
        setForkTruchCarData({
          position: [460, 0, 700],
          hasGoods: false,
          radian: 0,
          liftArmHeight: 0,
          forkArmHeight: 0,
        });
        setConveyerBeltData({ goodsPosition: [76, 25, 0], hasGoods: false });
        setForkTruchCarData2({
          position: [-780, 0, -300],
          hasGoods: false,
          radian: 0,
          liftArmHeight: 0,
          forkArmHeight: 0,
        });
        index = 0;
      }
    }
  });

  const goodsEl = useMemo(
    () =>
      goodsData.map((item, index) => <Goods groupProps={{ position: item }} key={index}></Goods>),
    []
  );
  const stereoscopicShelfEl = useMemo(() => {
    return (
      <>
        {stereoscopicShelfData.shelf.map((item, index) => (
          <StereoscopicShelf
            key={index}
            layout={item.layout}
            groupProps={{ position: new Vector3(...item.position) }}
          ></StereoscopicShelf>
        ))}
        {stereoscopicShelfData.track.map((item, index) => (
          <StereoscopicTrack
            key={index}
            layout={item.layout}
            groupProps={{ position: new Vector3(...item.position) }}
          ></StereoscopicTrack>
        ))}
        {stereoscopicShelfData.lifter.map((item, index) => (
          <Lifter
            layout={item.layout}
            groupProps={{ position: new Vector3(...item.position) }}
            key={index}
          ></Lifter>
        ))}
      </>
    );
  }, []);
  const shelfEl = useMemo(
    () =>
      shelfData.map((item, index) => (
        <Shelf layout={item.layout} groupProps={{ position: item.position }} key={index}></Shelf>
      )),
    []
  );
  const mxwCar = useMemo(() => <MxwCar {...mxwCarData}></MxwCar>, [mxwCarData]);
  const forkTruck = useMemo(
    () => <ForkTruck {...forkTruchCarData}></ForkTruck>,
    [forkTruchCarData]
  );
  const forkTruck2 = useMemo(
    () => <ForkTruck {...forkTruchCarData2}></ForkTruck>,
    [forkTruchCarData2]
  );
  const fourWayCar = useMemo(() => <FourWayCar {...fourWayCarData}></FourWayCar>, [fourWayCarData]);
  const tunnelEl = useMemo(
    () => tunnelData.map((tunnel, index) => <Tunnel key={index} {...tunnel} />),
    []
  );
  const areaEl = useMemo(() => areaData.map((area, index) => <Area key={index} {...area} />), []);
  const conveyerBeltEl = useMemo(
    () => <ConveyerBelt position={[-300, 0, 495]} {...conveyerBeltData}></ConveyerBelt>,
    [conveyerBeltData]
  );
  return (
    <group>
      {/* <Ground /> */}
      {goodsEl}
      {stereoscopicShelfEl}
      {shelfEl}
      {mxwCar}
      {forkTruck}
      {fourWayCar}
      {!fourWayCarData.hasGoods && <Goods groupProps={{ position: [129.5, 312, 30] }}></Goods>}
      {!mxwCarData.hasGoods && <Goods groupProps={{ position: [600, 0, 280] }}></Goods>}
      {!forkTruchCarData.hasGoods && <Goods groupProps={{ position: [600, 146, -722] }}></Goods>}
      {tunnelEl}
      {areaEl}
      {conveyerBeltEl}
      {forkTruck2}
    </group>
  );
});

export default WarehouseMap;
