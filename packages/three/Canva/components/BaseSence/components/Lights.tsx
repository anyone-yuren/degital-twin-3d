// 初始化场景灯光
import * as THREE from 'three';
import React, { useRef } from 'react';
import { useThree, SpotLightProps } from '@react-three/fiber';
import { SpotLight, useDepthBuffer, useHelper } from '@react-three/drei';

function MovingSpot(props: SpotLightProps) {
  const light = useRef();
  return (
    <SpotLight
      ref={light}
      castShadow
      penumbra={2}
      distance={6000}
      angle={Math.PI * 0.6}
      attenuation={5}
      anglePower={Math.PI / 2}
      intensity={6}
      shadow-mapSize={[1024, 1024]}
      shadow-camera-near={200}
      shadow-camera-far={2000}
      {...props}
    />
  );
}

const Lights = () => {
  return (
    <>
      {/* 首先添加个环境光,AmbientLight,影响整个场景的光源 */}
      <ambientLight intensity={0.5} />
      {/* 模拟远处类似太阳的光源 */}
      <directionalLight color={0xffffff} intensity={3} position={[10, 10, 0]} />
      <MovingSpot color="#fff" position={[3, 2000, 2]} />
    </>
  );
};

export { MovingSpot };
export default Lights;
