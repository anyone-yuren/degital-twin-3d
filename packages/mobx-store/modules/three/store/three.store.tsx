import React from 'react';
import { useLocalObservable } from 'mobx-react-lite';

export const initalValues = {
  visible: false,
  cameraStatus: false,
  // cameraCtrls对象类型
  cameraCtrls: {
    choiceCtrls: '1',
    autoCruise: false,
  },
};

type IPropInit = {
  visible: boolean;
  // 相机状态
  cameraStatus: boolean;
  cameraCtrls: Record<string, any>;
};

export interface ThreeProps extends IPropInit {
  setVisible: (bol: boolean) => void;
  setCameraStatus: (bol: boolean) => void;
  setCameraCtrls?: (bol: any) => void;
}

const ThreeData = () => {
  const store = useLocalObservable<ThreeProps>(() => ({
    ...initalValues,
    setVisible(bol: boolean) {
      store.visible = bol;
    },
    setCameraStatus(bol: boolean) {
      store.cameraStatus = bol;
    },
    setCameraCtrls(bol: any) {
      store.cameraCtrls = bol;
    },
  }));
  return store;
};
export default ThreeData;
