import React from 'react';
import { CuboidCollider, RigidBody } from '@react-three/rapier';

function Ground(props) {
  return (
    <RigidBody {...props} type="fixed" colliders={false}>
      <mesh receiveShadow position={[0, 20, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        {/* <meshStandardMaterial map-repeat={[240, 240]} color="green" /> */}
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  );
}

export default Ground;
