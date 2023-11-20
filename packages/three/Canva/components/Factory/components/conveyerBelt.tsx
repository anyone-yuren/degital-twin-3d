import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import Goods from './goods';

interface IConveyerBelt {
  hasGoods?: boolean;
  goodsPosition: number;
  position: THREE.Vector3;
}
const width = 315;
function ConveyerBelt(props: IConveyerBelt) {
  const { hasGoods, position, goodsPosition } = props;
  const model = useMemo(() => {
    // const res = useLoader(FBXLoader, '/static/models/GTX.FBX');
    const res = useLoader(
      FBXLoader,
      process.env.NODE_ENV == 'development'
        ? '/static/models/GTX.FBX'
        : `/degital-twin-3d/static/models/GTX.FBX`
    );
    const belt = res.clone();
    belt.scale.set(0.08, 0.05, 0.08);
    return belt;
  }, []);
  return (
    <group position={position}>
      {hasGoods && <Goods groupProps={{ position: goodsPosition }}></Goods>}
      <primitive object={model} position={[-width, 0, 0]} />
      <primitive object={model.clone()} position={[0, 0, 0]} />
      <primitive object={model.clone()} position={[width, 0, 0]} />
    </group>
  );
}

export default ConveyerBelt;
