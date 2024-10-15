/**
 * @file index.tsx
 * @description 存放仓库模型
 */

import React from 'react';
import House from './components/house';
import Boundary from './components/boundary';

import WarehouseMap from './components/WarehouseMap';

const Factory = () => {
  return (
    <>
      {/* <House /> */}
      <Boundary />
      {/* <WarehouseMap /> */}
    </>
  );
};

export default Factory;
