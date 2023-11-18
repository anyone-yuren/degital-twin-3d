import { observer, ThreeStoreContext } from 'mobx-threejs-store';
import React, { useContext } from 'react';
import { Text, AntButton } from 'components';
const Tools = () => {
  const mobxStore = useContext(ThreeStoreContext);
  return (
    <>
      <AntButton
        className="relative"
        type="primary"
        onClick={() => {
          mobxStore.threeStore.setCameraStatus(!mobxStore.threeStore.cameraStatus);
        }}
      >
        切换相机状态
      </AntButton>
      <Text className="absolute top-0 right-0" type="danger">
        {mobxStore.threeStore.cameraStatus}
      </Text>
    </>
  );
};

export default observer(Tools);
