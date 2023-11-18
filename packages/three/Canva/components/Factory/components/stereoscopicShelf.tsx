import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';
import { useMemo, useEffect } from 'react';

const { Vector3 } = THREE;

interface IStereoscopicShelf {
  layout: {
    row: number;
    col: number;
    layer: number;
  };
  groupProps?: ThreeElements['group'];
}

export const shelfBottomHeight = 20;
export const locationSize = new Vector3(60, 70, 60);
export const shelfRackDiameter = 3;
export const shelfTrackTopDiameter = 2;
export const shelfTrackBottomDiameter = 5;
function StereoscopicShelf(props: IStereoscopicShelf) {
  const {
    layout: { row, col, layer },
    groupProps,
  } = props;
  const lenX = useMemo(() => row * locationSize.x + (row + 1) * shelfRackDiameter, [row]);
  const lenY = useMemo(
    () => shelfBottomHeight + layer * (locationSize.y + shelfRackDiameter),
    [layer]
  );
  const lenZ = useMemo(() => col * locationSize.z + (col + 1) * shelfRackDiameter, [col]);
  const rowShelfRackGeometry = useMemo(
    () => new THREE.BoxGeometry(shelfRackDiameter, shelfRackDiameter, lenZ),
    [col]
  );
  const colShelfRackGeometry = useMemo(
    () => new THREE.BoxGeometry(shelfRackDiameter, lenY, shelfRackDiameter),
    [layer]
  );
  const shelfRackMaterial = useMemo(() => new THREE.MeshPhongMaterial({ color: 'blue' }), []);
  const shelfTrackMaterial = useMemo(() => new THREE.MeshPhongMaterial({ color: 'white' }), []);
  const shelfTrackTopGeometry = useMemo(
    () => new THREE.BoxGeometry(lenX - 1, shelfTrackTopDiameter, shelfTrackTopDiameter),
    [row]
  );
  const shelfTrackBottomGeometry = useMemo(
    () => new THREE.BoxGeometry(lenX - 1, shelfTrackBottomDiameter, shelfTrackBottomDiameter),
    [row]
  );

  useEffect(() => () => {
    rowShelfRackGeometry.dispose();
    colShelfRackGeometry.dispose();
    shelfRackMaterial.dispose();
    shelfTrackMaterial.dispose();
    shelfTrackTopGeometry.dispose();
    shelfTrackBottomGeometry.dispose();
  });

  return (
    <group {...groupProps}>
      {/* 横排 */}
      {new Array(row + 1).fill(1).map((_, rowIndex) =>
        new Array(layer).fill(1).map((_, layerIndex) => {
          const pos = new Vector3(
            -lenX / 2 + rowIndex * (shelfRackDiameter + locationSize.x) + shelfRackDiameter / 2,
            shelfBottomHeight + layerIndex * (locationSize.y + shelfRackDiameter),
            0
          );
          return (
            <mesh
              geometry={rowShelfRackGeometry}
              material={shelfRackMaterial}
              position={pos}
            ></mesh>
          );
        })
      )}
      {/* 竖列 */}
      {new Array(row + 1).fill(1).map((_, rowIndex) =>
        new Array(col + 1).fill(1).map((_, colIndex) => {
          const pos = new Vector3(
            -lenX / 2 + rowIndex * (shelfRackDiameter + locationSize.x) + shelfRackDiameter / 2,
            lenY / 2,
            -lenZ / 2 + colIndex * (shelfRackDiameter + locationSize.z) + shelfRackDiameter / 2
          );
          return (
            <mesh
              geometry={colShelfRackGeometry}
              material={shelfRackMaterial}
              position={pos}
            ></mesh>
          );
        })
      )}
      {/* 轨道 */}
      {new Array(col + 1).fill(1).map((_, colIndex) =>
        new Array(layer).fill(1).map((_, layerIndex) => {
          const posZ =
            -lenZ / 2 + colIndex * (shelfRackDiameter + locationSize.z) + shelfRackDiameter / 2;
          const topPos = new Vector3(
            0,
            shelfBottomHeight +
            layerIndex * (locationSize.y + shelfRackDiameter) +
            shelfTrackBottomDiameter +
            shelfTrackTopDiameter,
            posZ
          );
          const bottomPos = new Vector3(
            0,
            shelfBottomHeight +
            layerIndex * (locationSize.y + shelfRackDiameter) +
            shelfTrackBottomDiameter,
            posZ
          );
          return (
            <>
              <mesh
                geometry={shelfTrackTopGeometry}
                material={shelfTrackMaterial}
                position={topPos}
              ></mesh>
              <mesh
                geometry={shelfTrackBottomGeometry}
                material={shelfTrackMaterial}
                position={bottomPos}
              ></mesh>
            </>
          );
        })
      )}
    </group>
  );
}

export default StereoscopicShelf;
