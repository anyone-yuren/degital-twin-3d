import ThreeStore, { ThreeStoreContext } from './store';
import React from 'react';
import { observer } from 'mobx-react-lite';
interface IProps {
  children: React.ReactNode;
}

// 实例化根store
// const context = React.createContext(new RootStore());
// export const useStore = () => React.useContext(context);

function ThreeMobx({ children }: IProps) {
  return <ThreeStore>{children}</ThreeStore>;
}

export { ThreeStoreContext, observer };

export { ThreeMobx };
