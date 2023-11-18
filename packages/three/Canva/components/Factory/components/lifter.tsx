import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';
import { useMemo } from 'react';
import { shelfBottomHeight, shelfRackDiameter, locationSize } from './stereoscopicShelf';
import Goods from './goods';
import FourWayCar from './fourWayCar';

const { Vector3 } = THREE;

const baseBoxSize = new Vector3(
  locationSize.x + shelfRackDiameter * 2,
  shelfBottomHeight,
  locationSize.z + shelfRackDiameter * 2
);
const lifterPlaneSize = new Vector3(
  locationSize.x - shelfRackDiameter,
  shelfRackDiameter,
  locationSize.z - shelfRackDiameter
);

interface ILifter {
  hasCar?: boolean;
  hasGoods?: boolean;
  layout: {
    layer: number;
  };
  lifterPosition?: Vector3;
  groupProps?: ThreeElements['group'];
}
function Lifter(props: ILifter) {
  const {
    hasCar,
    hasGoods,
    layout: { layer },
    lifterPosition,
    groupProps,
  } = props;
  const lenY = (shelfRackDiameter + locationSize.y) * layer;
  const lifterRackColGeometry = new THREE.BoxGeometry(shelfRackDiameter, lenY, shelfRackDiameter);
  const lifterRackRowGeometry = new THREE.BoxGeometry(
    locationSize.x,
    shelfRackDiameter,
    shelfRackDiameter
  );
  const lifterPlaneGeometry = new THREE.BoxGeometry(
    lifterPlaneSize.x,
    lifterPlaneSize.y,
    lifterPlaneSize.z
  );
  const baseBoxGeometry = new THREE.BoxGeometry(baseBoxSize.x, baseBoxSize.y, baseBoxSize.z);
  const lifterMaterial = new THREE.MeshPhongMaterial({ color: 'white' });
  const lifterPlaneMaterial = new THREE.MeshPhongMaterial({ color: 'orange' });
  return (
    <group {...groupProps}>
      <mesh
        geometry={lifterRackColGeometry}
        material={lifterMaterial}
        position={[
          -baseBoxSize.x / 2 + shelfRackDiameter / 2,
          lenY / 2 + baseBoxSize.y,
          -baseBoxSize.z / 2 + shelfRackDiameter / 2,
        ]}
      ></mesh>
      <mesh
        geometry={lifterRackColGeometry}
        material={lifterMaterial}
        position={[
          baseBoxSize.x / 2 - shelfRackDiameter / 2,
          lenY / 2 + baseBoxSize.y,
          -baseBoxSize.z / 2 + shelfRackDiameter / 2,
        ]}
      ></mesh>
      <mesh
        geometry={lifterRackColGeometry}
        material={lifterMaterial}
        position={[
          -baseBoxSize.x / 2 + shelfRackDiameter / 2,
          lenY / 2 + baseBoxSize.y,
          baseBoxSize.z / 2 - shelfRackDiameter / 2,
        ]}
      ></mesh>
      <mesh
        geometry={lifterRackColGeometry}
        material={lifterMaterial}
        position={[
          baseBoxSize.x / 2 - shelfRackDiameter / 2,
          lenY / 2 + baseBoxSize.y,
          baseBoxSize.z / 2 - shelfRackDiameter / 2,
        ]}
      ></mesh>
      <mesh
        geometry={lifterRackColGeometry}
        material={lifterMaterial}
        position={[-baseBoxSize.x / 2 + shelfRackDiameter / 2, lenY / 2 + baseBoxSize.y, 0]}
      ></mesh>
      <mesh
        geometry={lifterRackColGeometry}
        material={lifterMaterial}
        position={[baseBoxSize.x / 2 - shelfRackDiameter / 2, lenY / 2 + baseBoxSize.y, 0]}
      ></mesh>
      {/* 电梯底部 */}
      <mesh
        geometry={baseBoxGeometry}
        material={lifterMaterial}
        position={[0, baseBoxSize.y / 2, 0]}
      ></mesh>
      {/* 电梯顶部 */}
      <mesh
        geometry={baseBoxGeometry}
        material={lifterMaterial}
        position={[0, baseBoxSize.y + baseBoxSize.y / 2 + lenY, 0]}
      ></mesh>
      <group position={lifterPosition}>
        {hasCar && (
          <FourWayCar position={new Vector3(0, baseBoxSize.y + lifterPlaneSize.y, 0)}></FourWayCar>
        )}
        {hasGoods && (
          <Goods groupProps={{ position: [0, baseBoxSize.y + lifterPlaneSize.y, 0] }}></Goods>
        )}
        <mesh
          geometry={lifterPlaneGeometry}
          material={lifterPlaneMaterial}
          position={[0, baseBoxSize.y + lifterPlaneSize.y / 2, 0]}
        ></mesh>
      </group>

      {new Array(layer - 1).fill(1).map((_, index) => {
        const posY = baseBoxSize.y + (locationSize.y + shelfRackDiameter) * (index + 1);
        return (
          <>
            <mesh
              geometry={lifterRackRowGeometry}
              material={lifterMaterial}
              position={[0, posY, -baseBoxSize.z / 2 + shelfRackDiameter / 2]}
            ></mesh>
            <mesh
              geometry={lifterRackRowGeometry}
              material={lifterMaterial}
              position={[0, posY, baseBoxSize.z / 2 - shelfRackDiameter / 2]}
            ></mesh>
            <mesh
              geometry={lifterRackRowGeometry}
              material={lifterMaterial}
              rotation={[0, Math.PI / 2, 0]}
              position={[baseBoxSize.x / 2 - shelfRackDiameter / 2, posY, 0]}
            ></mesh>
            <mesh
              geometry={lifterRackRowGeometry}
              material={lifterMaterial}
              rotation={[0, Math.PI / 2, 0]}
              position={[-baseBoxSize.x / 2 + shelfRackDiameter / 2, posY, 0]}
            ></mesh>
          </>
        );
      })}
    </group>
  );
}

export default Lifter;
