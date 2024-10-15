import { useThree, PerspectiveCameraProps } from '@react-three/fiber';
import { PerspectiveCamera, CameraControls } from '@react-three/drei';
import * as THREE from 'three';
import React, { useContext } from 'react';
import { observer, ThreeStoreContext } from 'mobx-threejs-store';

const Camera = (props: any) => {
  const threeObj = useThree();
  const camera = threeObj.camera;
  const mobxStore = useContext(ThreeStoreContext);

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

  // Calculate the center point
  const centerX = (coordinates.UpRight.X + coordinates.DownLeft.X) / 2;
  const centerY = (coordinates.UpRight.Y + coordinates.DownLeft.Y) / 2;

  // Set camera position above the center point
  const cameraHeight = 1000; // Adjust this value as needed for height
  camera.position.set(centerX, cameraHeight, centerY);
  camera.lookAt(centerX, 0, centerY); // Look at the center point

  return (
    <>
      <CameraControls />
      <PerspectiveCamera makeDefault fov={48} near={1} far={100000} {...props} />
    </>
  );
};

export default observer(Camera);
