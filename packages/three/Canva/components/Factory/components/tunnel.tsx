import React from 'react';
import { Vector3 } from 'three';
import { MeshReflectorMaterial, Html } from '@react-three/drei';

export interface ITunnelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  tunnelNumber: string;
}
const Tunnel: React.FC<ITunnelProps> = ({ x, y, width, height, tunnelNumber }) => {
  // 巷道的位置
  const innerPosition = new Vector3(x + width / 2, 1.1, y + height / 2);
  const outerPosition = new Vector3(x + width / 2, 1, y + height / 2);
  const textPosition = new Vector3(x + width / 2, 1.2, y + height / 2);

  return (
    <group>
      <mesh position={innerPosition} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, height]}></planeGeometry>
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={5}
          depthScale={1}
          minDepthThreshold={1}
          color="rgb(0, 73, 45)"
          metalness={0.85}
          roughness={0.95}
          mirror={0}
        ></MeshReflectorMaterial>
      </mesh>
      <mesh position={outerPosition} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry
          args={[width > 0 ? width + 20 : width - 20, height > 0 ? height + 20 : height - 20]}
        ></planeGeometry>
        <meshBasicMaterial color="rgb(221, 165, 15)"></meshBasicMaterial>
      </mesh>
      {/* <Text
				fontSize={24}
				color="white"
				anchorX="center"
				anchorY="middle"
				position={textPosition}
				rotation={[-Math.PI / 2, 0, 0]}
				matrixWorldAutoUpdate
				getObjectsByProperty={null}
				getVertexPosition={null}
			>
				{tunnelNumber}
				<meshPhongMaterial color={"white"}></meshPhongMaterial>
			</Text> */}
      <Html scale={100} rotation={[-Math.PI / 2, 0, 0]} position={textPosition} transform occlude>
        {tunnelNumber}
      </Html>
    </group>
  );
};

export default Tunnel;
