import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import * as CSG from "@react-three/csg";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ThreeElements, useLoader, extend } from '@react-three/fiber';
import { Geometry, Base, Subtraction, Addition } from '@react-three/csg';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import myFont from '/static/STXingkai_Regular.json';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
extend({ TextGeometry });

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
    space_width = 10000,
    space_length = 12000,
    road_width = 600,
    grass_width = 400,
    cross_width = 100,
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
  console.log('env', process.env.NODE_ENV);

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

  const roadTexture = new THREE.TextureLoader().load(
    process.env.NODE_ENV == 'development'
      ? '/static/road2.jpg'
      : `/degital-twin-3d/static/road2.jpg`
  );
  roadTexture.wrapS = THREE.RepeatWrapping; // 水平方向重复
  roadTexture.wrapT = THREE.RepeatWrapping; // 垂直方向重复
  roadTexture.repeat.set(5, 1);

  const grassTexture = new THREE.TextureLoader().load(
    process.env.NODE_ENV == 'development'
      ? '/static/grass.jpg'
      : `/degital-twin-3d/static/grass.jpg`
  );
  grassTexture.wrapS = THREE.RepeatWrapping; // 水平方向重复
  grassTexture.wrapT = THREE.RepeatWrapping; // 垂直方向重复
  grassTexture.repeat.set(20, 1);

  const surfaceTexture = new THREE.TextureLoader().load(
    process.env.NODE_ENV == 'development'
      ? '/static/surface.jpg'
      : `/degital-twin-3d/static/surface.jpg`
  );
  surfaceTexture.wrapS = THREE.RepeatWrapping; // 水平方向重复
  surfaceTexture.wrapT = THREE.RepeatWrapping; // 垂直方向重复
  surfaceTexture.repeat.set(0.01, 0.01);

  const crossTexture = new THREE.TextureLoader().load(
    process.env.NODE_ENV == 'development'
      ? '/static/cross.png'
      : `/degital-twin-3d/static/cross.png`
  );
  crossTexture.wrapS = THREE.RepeatWrapping; // 水平方向重复
  crossTexture.wrapT = THREE.RepeatWrapping; // 垂直方向重复
  crossTexture.repeat.set(70, 1);

  const getBackWallShape = () => {
    const shape = getPointToShape([
      new THREE.Vector2(-length, -height),
      new THREE.Vector2(-length, height),
      new THREE.Vector2(length, height),
      new THREE.Vector2(length, -height),
    ]);
    const doorHoles = new THREE.Path();
    doorHoles.moveTo(-width / 30, -height);
    doorHoles.lineTo(-width / 30, (-2 * height) / 5);
    doorHoles.lineTo(width / 30, (-2 * height) / 5);
    doorHoles.lineTo(width / 30, -height);
    doorHoles.moveTo(-width / 30, -height);
    shape.holes.push(doorHoles);
    return shape;
  };

  // 第一层
  const getBackWallTopShape = () => {
    const shape = getPointToShape([
      new THREE.Vector2(-length, -height / 2),
      new THREE.Vector2(-length, -(height / 2 - 5)),
      new THREE.Vector2(-length / 2, height / 4),
      new THREE.Vector2(0, -(height / 2 - 5)),
      new THREE.Vector2(length / 2, height / 4),
      new THREE.Vector2(length, -(height / 2 - 5)), // 右边。x轴是一样的，不断加厚度
      new THREE.Vector2(length, -height / 2),
      new THREE.Vector2(-length, -height / 2),
    ]);
    return shape;
  };

  // 第二层
  const getRoofShape = () => {
    const shape = getPointToShape(
      [
        new THREE.Vector2(-length, -(height / 2 - 5)), // 第一个点,椭圆曲线加载第一第二个点之间
        new THREE.Vector2(-length, -(height / 2 + 5)),
        new THREE.Vector2(-length - wallThickness - 5, -(height / 2 + 5)),
        // new THREE.Vector2(-length - (5 * length) / (height / 2 - 10), -(height / 2 + 10)),
        new THREE.Vector2(-length - wallThickness - 5, -(height / 2 - 5) + 2 * wallThickness), // 做曲线的那一条
        // new THREE.Vector2(-length - wallThickness, -(height / 2 - 5) + wallThickness),
        new THREE.Vector2(-length, -(height / 2 - 5) + 2 * wallThickness),
        new THREE.Vector2(-length, -(height / 2 - 5) + wallThickness), // 第二个点
        new THREE.Vector2(-length / 2, height / 4 + wallThickness),
        new THREE.Vector2(0, -(height / 2 - 5) + wallThickness), // 第二低点顶点
        new THREE.Vector2(length / 2, height / 4 + wallThickness),
        new THREE.Vector2(length, -(height / 2 - 5) + wallThickness), // 第三低点顶点
        // 在这里做圆柱
        new THREE.Vector2(length, -(height / 2 - 5) + 2 * wallThickness),
        new THREE.Vector2(length + 5, -(height / 2 - 5) + 2 * wallThickness),
        new THREE.Vector2(length + 5, -(height / 2 - 5) + 2 * wallThickness - 15), // 做曲线的那一条
        new THREE.Vector2(length, -(height / 2 - 5) + 2 * wallThickness - 15),
        // over
        new THREE.Vector2(length, -(height / 2 - 5)), // 第三低点底点
        new THREE.Vector2(length / 2, height / 4),
        new THREE.Vector2(0, -(height / 2 - 5)), // 第二低点底点
        new THREE.Vector2(-length / 2, height / 4),
        new THREE.Vector2(-length, -(height / 2 - 5)), // 原点
      ],
      [
        {
          i: 3,
          setShape: (shape: THREE.Shape, point: THREE.Vector2) => {
            const { x, y } = point;
            shape.bezierCurveTo(
              -length - wallThickness - 5 - 2.5,
              -(height / 2 + 5 - 14 / 4),
              -length - wallThickness - 5 - 2.5,
              -(height / 2 + 5 - (14 * 3) / 4),
              x,
              y
            );
          },
        },
        {
          i: 12,
          setShape: (shape: THREE.Shape, point: THREE.Vector2) => {
            const { x, y } = point;
            shape.bezierCurveTo(
              length + 5 + 2.5,
              -(height / 2 - 5) + 2 * wallThickness - 14 / 4,
              length + 5 + 2.5,
              -(height / 2 - 5) + 2 * wallThickness - (14 * 3) / 4,
              x,
              y
            );
          },
        },
      ]
    );
    return shape;
  };

  // 第三层
  const getTopRoofShape = () => {
    const shape = getPointToShape([
      new THREE.Vector2(-length, -(height / 2 - 5) + wallThickness),
      new THREE.Vector2(-length, -(height / 2 - 5) + 2 * wallThickness),
      new THREE.Vector2(-length / 2, height / 4 + 2 * wallThickness),
      new THREE.Vector2(0, -(height / 2 - 5) + 2 * wallThickness),
      new THREE.Vector2(length / 2, height / 4 + 2 * wallThickness),
      new THREE.Vector2(length, -(height / 2 - 5) + 2 * wallThickness),
      new THREE.Vector2(length, -(height / 2 - 5) + wallThickness),
      new THREE.Vector2(length / 2, height / 4 + wallThickness),
      new THREE.Vector2(0, -(height / 2 - 5) + wallThickness),
      new THREE.Vector2(-length / 2, height / 4 + wallThickness),
    ]);
    return shape;
  };

  // const Text = (props: any) => {
  //   const font = useLoader(THREE.FontLoader, '/static/STXingkai_Regular.json');
  //   return (
  //     <mesh
  //       scale={[-1, 1, 1]}
  //       position={new THREE.Vector3(width - 50, 2 * height - 150, -length - 10)}
  //     >
  //       <textGeometry args={[props.text, { font, size: 100, height: 10 }]} />
  //       <meshStandardMaterial color={'#22d0d1'} />
  //     </mesh>
  //   );
  // };

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

  // 前面的路，有招牌的那一面
  const FrontRoad = () => {
    return (
      <extrudeGeometry
        args={[
          getPointToShape([
            new THREE.Vector2(width + aside_width, -length - aside_length),
            new THREE.Vector2(width + aside_width, -space_length),
            new THREE.Vector2(-width - aside_width, -space_length),
            new THREE.Vector2(-width - aside_width, -length - aside_length),
          ]),
          { depth: wallThickness },
        ]}
      />
    );
  };
  //后面的路，招牌的那一边的反面
  const BackRoad = () => {
    return (
      <extrudeGeometry
        args={[
          getPointToShape([
            new THREE.Vector2(-width - aside_width, length + aside_length),
            new THREE.Vector2(-width - aside_width, space_length),
            new THREE.Vector2(width + aside_width, space_length),
            new THREE.Vector2(width + aside_width, length + aside_length),
          ]),
          { depth: wallThickness },
        ]}
      />
    );
  };

  // 右边的镂空的，就是没有墙的那一面
  const RightRoad = () => {
    return (
      <extrudeGeometry
        args={[
          getPointToShape([
            new THREE.Vector2(-width - aside_width, -length - aside_length),
            new THREE.Vector2(-space_width, -length - aside_length),
            new THREE.Vector2(-space_width, length + aside_length),
            new THREE.Vector2(-width - aside_width, length + aside_length),
          ]),
          { depth: wallThickness },
        ]}
      />
    );
  };

  const LeftRoad = () => {
    return (
      <extrudeGeometry
        args={[
          getPointToShape([
            new THREE.Vector2(width + aside_width, length + aside_length),
            new THREE.Vector2(space_width, length + aside_length),
            new THREE.Vector2(space_width, -length - aside_length),
            new THREE.Vector2(width + aside_width, -length - aside_length),
          ]),
          { depth: wallThickness },
        ]}
      />
    );
  };

  const RoadMaterial = () => {
    return <meshBasicMaterial map={roadTexture}></meshBasicMaterial>;
  };

  const GrassMaterial = () => {
    return <meshBasicMaterial map={grassTexture}></meshBasicMaterial>;
  };

  const SurfaceMaterial = () => {
    return <meshBasicMaterial map={surfaceTexture}></meshBasicMaterial>;
  };

  const CrossMaterial = () => {
    return <meshBasicMaterial map={crossTexture}></meshBasicMaterial>;
  };

  const OutSideSurface = (props: any) => {
    return (
      <group rotation={[0, props.rotation, 0]}>
        {/* 第一个道路 */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <Geometry>
            <Base position={[0, road_width / 2, 0]}>
              <boxGeometry args={[props.length * 2, road_width, 10]} />
            </Base>
            <Addition position={[0, -road_width / 2, 0]}>
              <boxGeometry args={[props.length * 2, road_width, 10]} />
            </Addition>
            <Subtraction position={[0, 0, 0]}>
              <boxGeometry args={props.subArgs} />
            </Subtraction>
          </Geometry>
          <RoadMaterial></RoadMaterial>
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <Geometry>
            <Base position={[0, road_width + grass_width / 2, 0]}>
              <boxGeometry args={[props.length * 2, grass_width, 10]} />
            </Base>
            <Addition position={[0, -(road_width + grass_width / 2), 0]}>
              <boxGeometry args={[props.length * 2, grass_width, 10]} />
            </Addition>
            <Subtraction position={[0, 0, 0]}>
              <boxGeometry args={props.subArgs} />
            </Subtraction>
          </Geometry>
          <GrassMaterial></GrassMaterial>
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <Geometry>
            <Base position={[0, road_width + grass_width + cross_width / 2, 0]}>
              <boxGeometry args={[props.length * 2, cross_width, 10]} />
            </Base>
            <Addition position={[0, -(road_width + grass_width + cross_width / 2), 0]}>
              <boxGeometry args={[props.length * 2, cross_width, 10]} />
            </Addition>
            <Subtraction position={[0, 0, 0]}>
              <boxGeometry args={props.subArgs} />
            </Subtraction>
          </Geometry>
          <CrossMaterial></CrossMaterial>
        </mesh>
      </group>
    );
  };

  const floorColor = '#535760';

  return (
    <group position={position} receiveShadow>
      {/* 草坪和场景 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        {/* <mesh> */}
        <Geometry>
          <Base>
            <extrudeGeometry
              args={[
                getPointToShape([
                  new THREE.Vector2(-space_width, -space_length),
                  new THREE.Vector2(space_width, -space_length),
                  new THREE.Vector2(space_width, space_length),
                  new THREE.Vector2(-space_width, space_length),
                  new THREE.Vector2(-space_width, -space_length),
                ]),
                { depth: wallThickness },
              ]}
            />
          </Base>
          {/* 中间的镂空的 */}
          <Subtraction>
            <HouseFloor></HouseFloor>
          </Subtraction>
          {/* 正面的镂空的 */}
          <Subtraction>
            <FrontRoad></FrontRoad>
          </Subtraction>
          {/* 后边的镂空的,就是正面对面的那一面 */}
          <Subtraction>
            <BackRoad></BackRoad>
          </Subtraction>
          {/* 右面的镂空的，没有墙的那一面 */}
          <Subtraction>
            <RightRoad></RightRoad>
          </Subtraction>
          {/* 左边的镂空的,有个小门的那一边 */}
          <Subtraction>
            <LeftRoad></LeftRoad>
          </Subtraction>
        </Geometry>
        <meshStandardMaterial color={'white'} />
      </mesh>
      {/* <Text text="劢微机器人"></Text> */}
      {/* 地板 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <HouseFloor></HouseFloor>
        <meshPhongMaterial map={floorTexture} reflectivity={1.5}></meshPhongMaterial>
      </mesh>
      {/* 后面的墙壁,招牌的另一面 */}
      <mesh position={new THREE.Vector3(0, height, length - wallThickness)} receiveShadow>
        <extrudeGeometry
          args={[
            getPointToShape([
              new THREE.Vector2(-width, -height),
              new THREE.Vector2(-width, height),
              new THREE.Vector2(width, height),
              new THREE.Vector2(width, -height),
            ]),
            { depth: wallThickness },
          ]}
        />
        <meshPhongMaterial map={texture} metalness={1.0} reflectivity={1.5}></meshPhongMaterial>
      </mesh>
      {/* 后面的路 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <BackRoad></BackRoad>
        <SurfaceMaterial></SurfaceMaterial>
        {/* <meshPhysicalMaterial color={floorColor}></meshPhysicalMaterial> */}
      </mesh>
      {/* 前面的墙壁,有招牌的那一边 */}
      <mesh position={new THREE.Vector3(0, height, -length)} receiveShadow>
        <extrudeGeometry
          args={[
            getPointToShape([
              new THREE.Vector2(-width, -height),
              new THREE.Vector2(-width, height),
              new THREE.Vector2(width, height),
              new THREE.Vector2(width, -height),
            ]),
            { depth: wallThickness },
          ]}
        />
        <meshPhongMaterial map={texture} metalness={1.0} reflectivity={1.5}></meshPhongMaterial>
      </mesh>
      {/* 前面的墙壁下面的路 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <FrontRoad></FrontRoad>
        <SurfaceMaterial></SurfaceMaterial>
        {/* <meshPhongMaterial
          // color={floorColor}
          map={roadTexture}
          metalness={1.0}
          roughness={0.8}
        ></meshPhongMaterial> */}
      </mesh>
      {/* 没有墙的那一面下面的路 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <RightRoad></RightRoad>
        <SurfaceMaterial></SurfaceMaterial>
        {/* <meshPhysicalMaterial
          color={floorColor}
          metalness={1.0}
          roughness={0.8}
        ></meshPhysicalMaterial> */}
      </mesh>
      {/* 左边的墙壁，有个校门的那一边 */}
      <mesh
        position={new THREE.Vector3(width, height, 0)}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <extrudeGeometry args={[getBackWallShape(), { depth: wallThickness }]} />
        <meshPhysicalMaterial map={texture} metalness={1.0} roughness={0.8}></meshPhysicalMaterial>
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <LeftRoad></LeftRoad>
        <SurfaceMaterial></SurfaceMaterial>
        {/* <meshPhysicalMaterial
          color={floorColor}
          metalness={1.0}
          roughness={0.8}
        ></meshPhysicalMaterial> */}
      </mesh>

      {/* 两个轴的路面参数 */}
      <OutSideSurface
        rotation={0}
        length={space_width}
        subArgs={[width * 2 + aside_width * 2, length * 2 + aside_length * 2, 10]}
      ></OutSideSurface>
      <OutSideSurface
        rotation={Math.PI / 2}
        length={space_length}
        subArgs={[length * 2 + aside_length * 2, width * 2 + aside_width * 2, 10]}
      ></OutSideSurface>

      {/* 后面墙壁的顶部 */}
      <mesh
        position={new THREE.Vector3(width, (5 / 2) * height, 0)}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <extrudeGeometry args={[getBackWallTopShape(), { depth: 2 || wallThickness }]} />
        <meshPhysicalMaterial
          color={'#0069c5'}
          metalness={1.0}
          roughness={0.8}
        ></meshPhysicalMaterial>
      </mesh>
      {/* 顶部第二层 */}
      <mesh
        position={new THREE.Vector3(-width - 5, (5 / 2) * height, 0)}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <extrudeGeometry args={[getRoofShape(), { depth: 2 * width + 10 || wallThickness }]} />
        <meshPhysicalMaterial
          color={'#4895f6'}
          metalness={1.0}
          roughness={0.8}
        ></meshPhysicalMaterial>
      </mesh>
      {/* 顶部第三层 */}
      <mesh
        position={new THREE.Vector3(-width, (5 / 2) * height, 0)}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <extrudeGeometry args={[getTopRoofShape(), { depth: 2 * width || wallThickness }]} />
        <meshPhysicalMaterial
          map={roofTexture}
          metalness={1.0}
          roughness={0.8}
        ></meshPhysicalMaterial>
      </mesh>
    </group>
  );
};

export default House;
