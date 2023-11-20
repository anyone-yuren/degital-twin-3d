import React, { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const TreeModel = ({ position, scale }) => {
  const gltfRef = useRef(null);
  const gltf = useLoader(
    GLTFLoader,
    process.env.NODE_ENV == 'development'
      ? '/static/models/tree/scene.gltf'
      : `/degital-twin-3d/static/models/tree/scene.gltf`
  );

  const setShadow = (obj) => {
    if (obj.children) {
      obj.children.forEach((child) => {
        child.castShadow = true;
        child.receiveShadow = true;
        setShadow(child);
      });
    }
  };
  if (gltf.scene) {
    console.log(position);
    setShadow(gltf.scene);
    gltfRef.current = gltf.scene.clone();
  }

  return (
    <>
      <primitive position={position} object={gltfRef.current} castShadow scale={scale} />
    </>
  );
};

export default TreeModel;
