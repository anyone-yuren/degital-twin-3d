// 添加网格线
import { Grid, GridMaterialType } from '@react-three/drei';
import React from 'react';
const GridModule = (gridConfig: GridMaterialType) => {
  return (
    <Grid
      args={[100000, 100000, 100, 100]}
      rotation={[0, 0, 0]}
      position={[0, -10, 0]}
      receiveShadow
      cellColor="#6f6f6f"
      cellSize={50}
      sectionSize={100}
      sectionThickness={1}
      cellThickness={1}
      sectionColor="#9d4b4b"
      fadeDistance={10000}
      material={<meshStandardMaterial color="#aa" />}
      {...gridConfig}
    ></Grid>
  );
};

export default GridModule;
