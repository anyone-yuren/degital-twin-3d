import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import Goods from './goods';

interface IFourWayCar {
  hasGoods?: boolean;
  position?: THREE.Vector3;
  radian?: number;
  liftArmHeight?: number;
  forkArmHeight?: number;
}

function ForkTruck(props: IFourWayCar) {
  const { hasGoods, position, liftArmHeight = 0, forkArmHeight = 0, radian = 0 } = props;
  const model1 = useMemo(() => {
    // const res = useLoader(FBXLoader, "/static/models/SE-1.FBX");
    const res = useLoader(
      FBXLoader,
      process.env.NODE_ENV == 'development'
        ? '/static/models/SE-1.FBX'
        : `/degital-twin-3d/static/models/SE-1.FBX`
    );
    res.scale.set(0.05, 0.05, 0.05);
    return res.clone();
  }, []);
  const model2 = useMemo(() => {
    const res = useLoader(
      FBXLoader,
      process.env.NODE_ENV == 'development'
        ? '/static/models/SE-2.FBX'
        : `/degital-twin-3d/static/models/SE-2.FBX`
    );
    res.scale.set(0.05, 0.05, 0.05);
    return res.clone();
  }, []);
  const model3 = useMemo(() => {
    const res = useLoader(
      FBXLoader,
      process.env.NODE_ENV == 'development'
        ? '/static/models/SE-3.FBX'
        : `/degital-twin-3d/static/models/SE-3.FBX`
    );
    res.scale.set(0.05, 0.05, 0.05);
    return res.clone();
  }, []);
  return (
    <group position={position} rotation-y={radian}>
      {/* 叉臂 */}
      <group position-y={liftArmHeight}>
        <group>
          {hasGoods && <Goods groupProps={{ position: [0, forkArmHeight + 2, -77] }}></Goods>}
          <primitive object={model1} position={[0, forkArmHeight, -30]} />
        </group>
        {/* 举升臂 */}
        <primitive object={model2} position={[0, 0, -28]} />
      </group>
      {/* 车体 */}
      <primitive object={model3} position={[0, 0, 0]} />
    </group>
  );
}

export default ForkTruck;
