import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import Goods from './goods';

interface IFourWayCar {
  hasGoods?: boolean;
  position: THREE.Vector3;
}

function FourWayCar(props: IFourWayCar) {
  const { hasGoods, position } = props;
  const model = useMemo(() => {
    // const res = useLoader(FBXLoader, '/static/models/SXC-JXB.FBX');
    const res = useLoader(
      FBXLoader,
      process.env.NODE_ENV == 'development'
        ? '/static/models/SXC-JXB.FBX'
        : `/degital-twin-3d/static/models/SXC-JXB.FBX`
    );
    const car = res.clone();
    car.scale.set(0.05, 0.06, 0.04);
    return car;
  }, []);
  return (
    <group position={position}>
      {hasGoods && <Goods groupProps={{ position: [0, 5, 0] }}></Goods>}
      <primitive object={model} />
    </group>
  );
}

export default FourWayCar;
