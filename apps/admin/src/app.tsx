import './App.scss';

import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import {
  AuthContext,
  signIn,
  signOut,
  useAppDispatch,
  useAppSelector,
  useLocationListen,
} from 'hooks';
import { MenuData } from '@/common/mock';
import { ADMIN } from 'utils';
import { Settings } from 'utils';
import { setMenu } from 'store';

import { defaultRoutes, filepathToElement } from './routes';

function App() {
  const dispatch = useAppDispatch();
  const {
    user: { token, menu },
  } = useAppSelector((state) => state);
  const cloneDefaultRoutes = cloneDeep(defaultRoutes);
  cloneDefaultRoutes[0].children = [...filepathToElement(menu), ...cloneDefaultRoutes[0].children];

  useLocationListen((r) => {
    document.title = `${Settings.title}: ${r.pathname.replace('/', '')}`;
  });
  const element = useRoutes(cloneDefaultRoutes);
  useEffect(() => {
    /**
     * @deprecated 权限菜单控制
     * 以下简单的示例展示管理员和普通用户的菜单渲染
     */
    if ((token as unknown as { username: string })?.username === ADMIN) {
      dispatch(setMenu([...MenuData.admin]));
    } else {
      dispatch(setMenu([...MenuData.user]));
    }
  }, [token]);

  return <AuthContext.Provider value={{ signIn, signOut }}>{element}</AuthContext.Provider>;
}

export default App;
