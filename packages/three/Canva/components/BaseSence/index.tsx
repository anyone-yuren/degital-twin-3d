// 基础场景

import { useThree } from '@react-three/fiber';
import React from 'react';
import Camera from './components/Camera';
import GridModule from './components/Grid';
import Lights from './components/Lights';
import SkyBox from './components/Sky';
import Man from './components/others/dance';
import { useContext } from 'react';
import TreeGroup from './components/others/treeGroup';
import Buildings from './components/Buidings';
import { ThreeStoreContext, observer, ThreeStore } from 'mobx-threejs-store';
import { CameraControls } from '@react-three/drei';
// 创建Canva组件

const BaseSence = () => {
  const threeStore = useContext(ThreeStoreContext);
  // console.log('3D中的', ThreeStore.visible);

  return (
    <group>
      <Lights />
      <Camera />
      <SkyBox />

      {/* <GridModule /> */}
      {/* 其他 */}
      {/* <Man /> */}
      {/* 建筑 */}
      <Buildings />
      {/* 树 */}
      <TreeGroup />
    </group>
  );
};

export default observer(BaseSence);
