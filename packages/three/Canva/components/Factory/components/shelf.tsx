import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';
import { useMemo, useEffect } from 'react';
import { locationSize, shelfRackDiameter } from './stereoscopicShelf';

interface IShelf {
  layout: {
    col: number;
    layer: number;
  };
  groupProps?: ThreeElements['group'];
}

function Shelf(props: IShelf) {
  const {
    layout: { col, layer },
    groupProps,
  } = props;
  const lenX = locationSize.x + shelfRackDiameter;
  const lenY = (layer + 1) * (locationSize.y + shelfRackDiameter);
  const lenZ = locationSize.z * col + (col + 1) * shelfRackDiameter;
  const rowXShelfRackGeometry = new THREE.BoxGeometry(
    locationSize.z,
    shelfRackDiameter,
    shelfRackDiameter
  );
  const rowZShelfRackGeometry = new THREE.BoxGeometry(shelfRackDiameter, shelfRackDiameter, lenZ);
  const colShelfRackGeometry = new THREE.BoxGeometry(shelfRackDiameter, lenY, shelfRackDiameter);
  const crawlLenX = Math.sqrt(locationSize.x * locationSize.x + locationSize.y * locationSize.y);
  const crawlGeometry = new THREE.BoxGeometry(crawlLenX, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 'blue' });

  return (
    <group {...groupProps}>
      {/* 竖直方向支架 */}
      <mesh
        geometry={colShelfRackGeometry}
        material={material}
        position={[-lenX / 2, lenY / 2, -lenZ / 2]}
      ></mesh>
      <mesh
        geometry={colShelfRackGeometry}
        material={material}
        position={[lenX / 2, lenY / 2, lenZ / 2]}
      ></mesh>
      <mesh
        geometry={colShelfRackGeometry}
        material={material}
        position={[-lenX / 2, lenY / 2, lenZ / 2]}
      ></mesh>
      <mesh
        geometry={colShelfRackGeometry}
        material={material}
        position={[lenX / 2, lenY / 2, -lenZ / 2]}
      ></mesh>
      {new Array(layer).fill(1).map((_, index) => {
        const posY = (locationSize.y + shelfRackDiameter) * (index + 1);
        return (
          <>
            <mesh
              geometry={rowZShelfRackGeometry}
              material={material}
              position={[-lenX / 2, posY, 0]}
            ></mesh>
            <mesh
              geometry={rowZShelfRackGeometry}
              material={material}
              position={[lenX / 2, posY, 0]}
            ></mesh>
            <mesh
              geometry={crawlGeometry}
              material={material}
              position={[0, posY + locationSize.y / 2 + shelfRackDiameter / 2, lenZ / 2]}
              rotation={[0, 0, Math.atan(locationSize.y / locationSize.x)]}
            ></mesh>
            <mesh
              geometry={crawlGeometry}
              material={material}
              position={[0, posY + locationSize.y / 2 + shelfRackDiameter / 2, lenZ / 2]}
              rotation={[0, 0, -Math.atan(locationSize.y / locationSize.x)]}
            ></mesh>
            <mesh
              geometry={crawlGeometry}
              material={material}
              position={[0, posY + locationSize.y / 2 + shelfRackDiameter / 2, -lenZ / 2]}
              rotation={[0, 0, Math.atan(locationSize.y / locationSize.x)]}
            ></mesh>
            <mesh
              geometry={crawlGeometry}
              material={material}
              position={[0, posY + locationSize.y / 2 + shelfRackDiameter / 2, -lenZ / 2]}
              rotation={[0, 0, -Math.atan(locationSize.y / locationSize.x)]}
            ></mesh>
          </>
        );
      })}
      {new Array(layer).fill(1).map((_, layerIndex) =>
        new Array(col + 1).fill(1).map((_, colIndex) => {
          const posY = (locationSize.y + shelfRackDiameter) * (layerIndex + 1);
          const posZ =
            -lenZ / 2 + colIndex * (shelfRackDiameter + locationSize.z) + shelfRackDiameter / 2;
          return (
            <>
              <mesh
                geometry={rowXShelfRackGeometry}
                material={material}
                position={[0, posY, posZ]}
              ></mesh>
              <mesh
                geometry={rowXShelfRackGeometry}
                material={material}
                position={[0, posY, posZ]}
              ></mesh>
            </>
          );
        })
      )}
    </group>
  );
}

export default Shelf;
