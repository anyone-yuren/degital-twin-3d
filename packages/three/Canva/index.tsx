import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Help from './components/Help';
import Goods from './components/Factory/components/goods';
import WarehouseMap from './components/Factory/components/WarehouseMap';
import * as THREE from 'three';
import {
  Select,
  useSelect,
  Sky,
  ContactShadows,
  Edges,
  Environment,
  OrbitControls,
  MeshTransmissionMaterial,
  useCursor,
  Grid,
  Plane,
  Sphere,
} from '@react-three/drei';

import { PointData } from './data';

const coordinates = {
  UpRight: {
    X: 82750,
    Y: 19640,
  },
  DownLeft: {
    X: -9000,
    Y: -9000,
  },
};

function Ground() {
  const gridConfig = {
    /**
     * Creates a grid that is centered at the origin and has a size of 10.5 x 10.5.
     * The grid is rendered with a cell size of 0.5, a cell thickness of 0.5,
     * and a section size of 3. The grid color is #6f6f6f and the section color is #9d4b4b.
     * The grid fades out at a distance of 30 units from the camera.
     * @returns {JSX.Element}
     */
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: '#6f6f6f',
    sectionSize: 300,
    sectionThickness: 1,
    sectionColor: '#9d4b4b',
    fadeDistance: 30000,
    fadeStrength: 1,
    followCamera: true,
    infiniteGrid: true,
  };
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />;
}

const Floor = () => {
  // Calculate the width and depth of the floor
  const width = coordinates.UpRight.X - coordinates.DownLeft.X;
  const depth = coordinates.UpRight.Y - coordinates.DownLeft.Y;

  const centerX = (coordinates.UpRight.X + coordinates.DownLeft.X) / 2;
  const centerY = (coordinates.UpRight.Y + coordinates.DownLeft.Y) / 2;

  // Calculate the center position of the floor

  return (
    <Plane
      receiveShadow
      args={[width, depth]} // Set width and depth based on the coordinates
      // position={[0, 0, 0]}
      // position={[
      //   (coordinates.UpRight.X + coordinates.DownLeft.X) / 2, // Center X
      //   0, // Set the floor at Y = 0
      //   (coordinates.UpRight.Y + coordinates.DownLeft.Y) / 2, // Center Y
      // ]}
      rotation={[-Math.PI / 2, 0, 0]} // Rotate the plane to be horizontal
    >
      <meshStandardMaterial color="#4a4a4a" /> {/* Optional: Customize color */}
      {PointData.map((point) => (
        // <Goods
        //   key={point.id}
        //   groupProps={{ position: [point.position.X - centerX, point.position.Y - centerY, 0] }}
        // />
        <Sphere
          key={point.id}
          args={[50, 16, 16]} // 设置球体的半径和细分
          position={[point.position.X - centerX, point.position.Y - centerY, 0]} // 设置点的位置
        >
          <meshStandardMaterial color="red" /> {/* 点的颜色 */}
        </Sphere>
      ))}
    </Plane>
  );
};

export default function App() {
  const orbitControlsRef = useRef();

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        orthographic
        scene={
          {
            // fog: new THREE.Fog('lightblue', 10000, 100000),
          }
        }
        camera={{
          position: [30000, 50000, 20000],
          zoom: 0.8,
          fov: 45,
          far: 200000,
        }}
      >
        <directionalLight color={0xffffff} intensity={3} position={[1, 1, 1]} castShadow />
        <pointLight position={[1000, 10000, 1000]} castShadow />
        <Environment preset="night" />
        <OrbitControls
          makeDefault
          rotateSpeed={2}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 3}
          minAzimuthAngle={-Math.PI / 2} // 限制相机绕 Y 轴旋转的最小角度
          maxAzimuthAngle={Math.PI / 2} // 限制相机绕 Y 轴旋转的最大角度
        />
        <WarehouseMap />
        {/* <Sky /> */}
        {/* <Ground /> */}
        {/* <Floor /> */}
        <Help />
      </Canvas>
    </>
  );
}
