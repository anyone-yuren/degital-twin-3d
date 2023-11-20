import * as THREE from 'three';
import { ThreeElements, useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const { Vector3 } = THREE;

const goodsSize = new Vector3(50, 50, 50);
const palletPlaneSize = new Vector3(56, 1, 56);
const palletRackSize = new Vector3(4, 6, 4);

export const goodsItemSize = {
  x: palletPlaneSize.x,
  y: goodsSize.y + palletPlaneSize.y * 2 + palletRackSize.y,
  z: palletPlaneSize.z,
};

function calculatePositions() {
  const goodsPosition = new Vector3(
    0,
    palletRackSize.y + palletPlaneSize.y * 2 + goodsSize.y / 2,
    0
  );
  const palletPlaneTopPosition = new Vector3(0, palletRackSize.y + palletPlaneSize.y * 1.5, 0);
  const palletPlaneBottomPosition = new Vector3(0, palletPlaneSize.y / 2, 0);
  const palletRackPositionTopLeft = new Vector3(
    -palletPlaneSize.x / 2 + palletRackSize.x / 2,
    palletPlaneSize.y + palletRackSize.y / 2,
    -palletPlaneSize.z / 2 + palletRackSize.z / 2
  );
  const palletRackPositionTopRight = new Vector3(
    palletPlaneSize.x / 2 - palletRackSize.x / 2,
    palletPlaneSize.y + palletRackSize.y / 2,
    -palletPlaneSize.z / 2 + palletRackSize.z / 2
  );
  const palletRackPositionDownLeft = new Vector3(
    -palletPlaneSize.x / 2 + palletRackSize.x / 2,
    palletPlaneSize.y + palletRackSize.y / 2,
    palletPlaneSize.z / 2 - palletRackSize.z / 2
  );
  const palletRackPositionDownRight = new Vector3(
    palletPlaneSize.x / 2 - palletRackSize.x / 2,
    palletPlaneSize.y + palletRackSize.y / 2,
    palletPlaneSize.z / 2 - palletRackSize.z / 2
  );

  return {
    goodsPosition,
    palletPlaneTopPosition,
    palletPlaneBottomPosition,
    palletRackPositionTopLeft,
    palletRackPositionTopRight,
    palletRackPositionDownLeft,
    palletRackPositionDownRight,
  };
}

interface IGoodsItem {
  groupProps?: ThreeElements['group'];
}

function GoodsItem(props: IGoodsItem) {
  const { groupProps } = props;

  // const colorMap = useLoader(TextureLoader, '/static/goods_texture.png');
  const colorMap = useLoader(
    TextureLoader,
    process.env.NODE_ENV == 'development'
      ? '/static/goods_texture.png'
      : `/degital-twin-3d/static/goods_texture.png`
  );

  const goodsGeometry = useMemo(
    () => new THREE.BoxGeometry(goodsSize.x, goodsSize.y, goodsSize.z),
    []
  );
  const goodsMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ color: '#d0975d', map: colorMap }),
    [colorMap]
  );
  const palletMaterial = useMemo(() => new THREE.MeshPhongMaterial({ color: 'grey' }), []);
  const palletPlaneGeometry = useMemo(
    () => new THREE.BoxGeometry(palletPlaneSize.z, palletPlaneSize.y, palletPlaneSize.z),
    []
  );
  const palletRackGeometry = useMemo(
    () => new THREE.BoxGeometry(palletRackSize.x, palletRackSize.y, palletRackSize.z),
    []
  );

  const {
    goodsPosition,
    palletPlaneTopPosition,
    palletPlaneBottomPosition,
    palletRackPositionTopLeft,
    palletRackPositionTopRight,
    palletRackPositionDownLeft,
    palletRackPositionDownRight,
  } = useMemo(calculatePositions, []);

  return (
    <group {...groupProps}>
      {/* 货物 */}
      <mesh geometry={goodsGeometry} material={goodsMaterial} position={goodsPosition} />
      {/* 货架托盘 */}
      <mesh
        geometry={palletPlaneGeometry}
        material={palletMaterial}
        position={palletPlaneTopPosition}
      />
      <mesh
        geometry={palletPlaneGeometry}
        material={palletMaterial}
        position={palletPlaneBottomPosition}
      />
      {/* 货架底部支柱 */}
      <mesh
        geometry={palletRackGeometry}
        material={palletMaterial}
        position={palletRackPositionTopLeft}
      />
      <mesh
        geometry={palletRackGeometry}
        material={palletMaterial}
        position={palletRackPositionTopRight}
      />
      <mesh
        geometry={palletRackGeometry}
        material={palletMaterial}
        position={palletRackPositionDownLeft}
      />
      <mesh
        geometry={palletRackGeometry}
        material={palletMaterial}
        position={palletRackPositionDownRight}
      />
    </group>
  );
}

export default GoodsItem;
