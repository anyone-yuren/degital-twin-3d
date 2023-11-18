import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraControls } from '@react-three/drei';
import Text2 from './text';
import Annotation, { IAnnotationDataItem, IAnnotationRef } from './annotation';

export interface IAreaProps {
  x: number;
  y: number;
  width: number;
  height: number;
  areaNumber: string;
  strokeColor: string;
  textHeight?: number;
}
const Y = 1;
const Area: React.FC<IAreaProps> = ({
  x,
  y,
  width,
  height,
  areaNumber,
  textHeight,
  strokeColor,
}) => {
  const [hovered, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const { controls } = useThree((state) => ({
    controls: state.controls as unknown as CameraControls,
  }));

  // 转换为x轴和z轴组成的坐标系中的位置
  const position: THREE.Vector3 = new THREE.Vector3(x + width / 2, Y, y + height / 2);
  const size: [number, number, number] = [width, 1, height];
  textHeight ||= Y + 50;

  // 相机移动到区域的位置
  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    // controls.fitToBox(meshRef.current!, true);
    const mesh = meshRef.current!;
    const { x, y, z } = mesh.position;

    const box = new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(x, (y + textHeight!) / 2, z),
      new THREE.Vector3(width, textHeight, height)
    );
    controls.fitToBox(box, true);

    annotationRef.current?.show();
  };

  // 相机移动回原来的位置
  const handleDoubleClick = () => {
    setClicked(false);
  };

  // 监听鼠标移入和移出事件，改变hover状态
  const handlePointerOver = () => setHover(true);
  const handlePointerOut = () => setHover(false);

  // 每帧更新边框的颜色和粗细
  useFrame(() => {
    const box = meshRef.current;
    if (box) {
      const color = hovered || clicked ? strokeColor : 'white';
      const thickness = clicked ? 0.5 : 0.2;
      const material = box.material as THREE.MeshBasicMaterial & { linewidth: number };
      material.color.set(color);
      material.linewidth = thickness;
    }
  });

  const annotationRef = useRef<IAnnotationRef>(null);
  const annotationData: IAnnotationDataItem[] = [
    {
      label: '长',
      value: width + '米',
    },
    {
      label: '宽',
      value: height + '米',
    },
  ];

  return (
    <group
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onDoubleClick={handleDoubleClick}
      onPointerMissed={() => setClicked(false)}
    >
      <mesh ref={meshRef} position={position}>
        <boxGeometry attach="geometry" args={size} />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(...size)]} />
          <lineBasicMaterial attach="material" color={strokeColor} linewidth={0.2} />
        </lineSegments>
        <meshBasicMaterial attach="material" color={strokeColor} transparent opacity={0.2} />
      </mesh>

      {areaNumber && (
        <Text2
          position={new THREE.Vector3(position.x, textHeight, position.z)}
          text={areaNumber}
          scale={new THREE.Vector3(100, 100, 100)}
          fontSize={100}
        />
      )}
      <Annotation
        ref={annotationRef}
        title={areaNumber}
        position={position}
        data={annotationData}
      ></Annotation>
    </group>
  );
};

export default Area;
