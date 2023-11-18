// 新建楼群
import React from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Buildings = () => {
  const { scene } = useThree();
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0xeeeeee, flatShading: true });
  for (let i = 0; i < 300; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    // 设置mesh透明度
    // mesh.material.opacity = 0.5;
    const randomValue = Math.random() < 0.5 ? -1 : 1;
    const randomValue1 = Math.random() < 0.5 ? -1 : 1;
    // mesh接收投影
    mesh.receiveShadow = true;
    mesh.position.x = Math.random() * 8000 * randomValue1 + randomValue1 * 2000;
    mesh.position.y = 0;
    mesh.position.z = Math.random() * 8000 * randomValue + randomValue * 2000;
    mesh.scale.x = 10;
    mesh.scale.y = Math.random() * 80 + 10;
    mesh.scale.z = 10;
    // 设置放大基点位置
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    group.add(mesh);
  }
  // group.add(cube);
  scene.add(group);
  // 雾添加模糊效果
  scene.fog = new THREE.FogExp2(0x000000, 0.000085);
  return <group>{/* <fog attach="fog" args={['#ff0000', 100, 10000]} /> */}</group>;
};
export default Buildings;
