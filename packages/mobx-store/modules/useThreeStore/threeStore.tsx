import { useLocalObservable } from 'mobx-react-lite';
import { observable, action } from 'mobx';

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

export const initalValues = {
  visible: false,
  cameraStatus: false,
  // cameraCtrls对象类型
  cameraCtrls: {
    choiceCtrls: '1',
    autoCruise: false,
  },
};

const ThreeStore = observable({
  ...initalValues,
  setVisible: action(function (bol: boolean) {
    this.visible = bol;
  }),
});
export { ThreeStore };
