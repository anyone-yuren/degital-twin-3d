import React, { createContext } from 'react';
import useThreeContext, { ThreeProps } from './three.store';

export interface ThreeStoreContext {
  threeStore: ThreeProps;
}
// @ts-ignore
export const ThreeStoreContext = createContext<ThreeStoreContext>(null);

type IProps = {
  children: React.ReactNode; // 👈️ type children
};
const ThreeSore = (props: IProps) => {
  const threeContext = useThreeContext();
  return (
    <ThreeStoreContext.Provider
      value={{
        threeStore: threeContext,
      }}
    >
      {props.children}
    </ThreeStoreContext.Provider>
  );
};

export default ThreeSore;
