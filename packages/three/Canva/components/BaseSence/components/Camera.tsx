// 添加场景相机
import { useThree, PerspectiveCameraProps } from '@react-three/fiber';
import {
  PerspectiveCamera,
  CameraControls,
  PresentationControls,
  FlyControls,
  OrbitControls,
  FirstPersonControls,
  MapControls,
} from '@react-three/drei';
import * as THREE from 'three';

import PointerCtrl from './CtrlPointerLock';
import React, { useContext, useEffect } from 'react';
import { observer, ThreeStoreContext } from 'mobx-threejs-store';

const Camera = (props: any) => {
  const threeObj = useThree();
  const camera = threeObj.camera;
  const mobxStore = useContext(ThreeStoreContext);
  const flyCtrl = () => {
    return (
      <group>
        <FirstPersonControls
          far={100000}
          movementSpeed={100}
          activeLook={false}
          lookVertical={true}
        ></FirstPersonControls>
        {/* <OrbitControls /> */}
        <MapControls zoomSpeed={0.1} />
      </group>
    );
  };

  const ctrl = () => {
    return (
      <group>
        {/* 相机控制器 */}
        {/* <PresentationControls /> */}
        <CameraControls />
        {/* <PointerCtrl /> */}
      </group>
    );
  };
  return (
    <>
      {mobxStore.threeStore.cameraCtrls.choiceCtrls === '1' ? ctrl() : flyCtrl()}
      <PerspectiveCamera
        makeDefault
        position={[-100, 200, 1000]}
        fov={48}
        near={1}
        far={100000}
        maxDistance={10}
        {...props}
      />
    </>
  );
};
export default observer(Camera);
