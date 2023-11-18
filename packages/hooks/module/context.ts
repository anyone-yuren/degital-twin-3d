import React, { Dispatch } from 'react';
import { setUserToken } from 'store';

import { getStorage, removeStorage, setStorage, sleep, TOKEN } from 'utils';

interface AuthContextType {
  signIn: (dispatch: Dispatch<any>, values: string) => Promise<unknown>;
  signOut: (dispatch: Dispatch<any>) => Promise<unknown>;
}

export const signIn = async (dispatch: any, values: string) => {
  await sleep(1000);
  setStorage(TOKEN, values, 1000 * 60 * 24);
  dispatch(setUserToken(getStorage(TOKEN)));
};

export const signOut = (dispatch: any) => {
  return new Promise((resolve) => {
    try {
      removeStorage(TOKEN);
      dispatch(setUserToken(''));
    } finally {
      resolve('');
    }
  });
};

export const AuthContext = React.createContext<AuthContextType>({
  signIn,
  signOut,
});
