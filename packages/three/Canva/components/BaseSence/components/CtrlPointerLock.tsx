// 使用Sky, PointerLockControls, useKeyboard 控制相机移动
import { KeyboardControls, PointerLockControls, useKeyboardControls } from '@react-three/drei';
import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, CapsuleCollider, Physics } from '@react-three/rapier';
import * as THREE from 'three';
import Ground from './Ground';

const PointerCtrl = (props: any) => {
  return (
    <>
      <Physics gravity={[0, -30, 0]}>
        <Ground />
        <KeyboardControls
          map={[
            { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
            { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
            { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
            { name: 'right', keys: ['ArrowRight', 'KeyD'] },
          ]}
        >
          <Player />
        </KeyboardControls>
      </Physics>
      {/* <PointerLockControls /> */}
    </>
  );
};

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const Player = () => {
  const ref = useRef();
  const [, get] = useKeyboardControls();
  useFrame((state) => {
    const { forward, backward, left, right, jump } = get();
    const velocity = ref.current.linvel();
    const { x, y, z } = ref.current.translation();

    state.camera.position.set(x, y, z);
    // movement
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
    // jumping
  });
  return (
    <>
      <RigidBody
        ref={ref}
        colliders={true}
        mass={2}
        type="dynamic"
        position={[0, 20, 0]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
    </>
  );
};

export default PointerCtrl;
