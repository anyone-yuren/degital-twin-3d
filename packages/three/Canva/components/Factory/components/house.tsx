import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import * as CSG from "@react-three/csg";
interface IHouse {
  // 墙的厚度
  wallThickness?: number;
  width?: number;
  length?: number;
  // aside 仓库周围的宽度，主要是算仓库地板的大小
  aside_width?: number;
  aside_length: number;
  height?: number;
  position?: THREE.Vector3;
  // 整个空间的大小
  space_width?: number;
  space_length?: number;
  // 门口的马路的宽度
  road_width?: number;
  // 草坪的宽度
  grass_width: number;
  // 下水管道的宽度
  cross_width: number;
}

type extraAry = {
  i?: number;
  setShape?: (shape: THREE.Shape, point: THREE.Vector2) => void;
};

const House = (props: IHouse) => {
  const {
    wallThickness = 2,
    width = 1400,
    length = 1200,
    height = 400,
    aside_width = 130,
    aside_length = 130,
    position = new THREE.Vector3(200, 0, 0),
  } = props;

  const getPointToShape = (points: THREE.Vector2[], extra?: extraAry[]) => {
    const shape = new THREE.Shape();
    const obj: Record<string, any> = {};
    extra?.forEach((item: any) => {
      obj[item.i] = item.setShape;
    });
    points.forEach((point, index) => {
      const { x, y } = point;
      if (!index) {
        shape.moveTo(x, y);
      }
      if (obj[index]) {
        obj[index](shape, point);
      } else {
        shape.lineTo(x, y);
      }
    });
    return shape;
  };

  // const texture = new THREE.TextureLoader().load('/static/wall_pic5.jpg');
  const texture = new THREE.TextureLoader().load(
    process.env.NODE_ENV == 'development'
      ? '/static/wall_pic5.jpg'
      : `/degital-twin-3d/static/wall_pic5.jpg`
  );
  texture.wrapS = THREE.RepeatWrapping; // 水平方向重复
  texture.repeat.set(0.02, 0.02);

  const roofTexture = new THREE.TextureLoader().load(
    process.env.NODE_ENV == 'development'
      ? '/static/wall_pic7.png'
      : `/degital-twin-3d/static/wall_pic7.png`
  );
  roofTexture.wrapS = THREE.RepeatWrapping; // 水平方向重复
  roofTexture.wrapT = THREE.RepeatWrapping; // 垂直方向重复
  roofTexture.rotation = Math.PI / 2;
  roofTexture.repeat.set(0.005, 0.005);

  const floorTexture = new THREE.TextureLoader().load(
    process.env.NODE_ENV == 'development'
      ? '/static/floor_02.png'
      : `/degital-twin-3d/static/floor_02.png`
  );
  floorTexture.wrapS = THREE.RepeatWrapping; // 水平方向重复
  floorTexture.wrapT = THREE.RepeatWrapping; // 垂直方向重复
  floorTexture.repeat.set(0.01, 0.01);
  // 仓库底下的那一块地板，会比仓库略大
  const HouseFloor = () => {
    return (
      <extrudeGeometry
        args={[
          getPointToShape([
            // 下面的不要
            new THREE.Vector2(-width - aside_width, -length - aside_length),
            new THREE.Vector2(width + aside_width, -length - aside_length),
            new THREE.Vector2(width + aside_width, length + aside_length),
            new THREE.Vector2(-width - aside_width, length + aside_length),
          ]),
          { depth: wallThickness },
        ]}
      />
    );
  };

  return (
    <group position={position} receiveShadow>
      {/* 地板 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <HouseFloor></HouseFloor>
      </mesh>
    </group>
  );
};

export default House;
