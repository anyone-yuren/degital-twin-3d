import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useLoader } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import Goods from './goods';

interface IMxwCar {
  hasGoods?: boolean;
  position?: THREE.Vector3;
  radian?: number;
}

function MxwCar(props: IMxwCar) {
  const { hasGoods, position, radian } = props;
  const carModel = useMemo(() => {
    // const res = useLoader(FBXLoader, '/static/models/maixiaowei-1.FBX');
    const res = useLoader(
      FBXLoader,
      process.env.NODE_ENV == 'development'
        ? '/static/models/maixiaowei-1.FBX'
        : `/degital-twin-3d/static/models/maixiaowei-1.FBX`
    );
    res.scale.set(0.05, 0.05, 0.05);
    return res;
  }, []);
  return (
    <group position={position} rotation-y={radian}>
      {hasGoods && <Goods groupProps={{ position: [0, 0, -10] }} />}
      {carModel && <primitive object={carModel} />}
    </group>
  );
}

export default MxwCar;
