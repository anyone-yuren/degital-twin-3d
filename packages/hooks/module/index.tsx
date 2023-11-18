import { useEffect } from 'react';
import { Location, useLocation } from 'react-router-dom';
import { AuthContext, signIn, signOut } from './context';
import KeepAlive from './KeepAlive';
import {
  AppDispatch,
  RootState,
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
  shallowEqual,
} from 'store';

const useLocationListen = (listener: (location: Location) => void) => {
  const location = useLocation();
  useEffect(() => {
    listener(location);
  }, [location]);
};

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  useLocationListen,
  KeepAlive,
  AuthContext,
  signIn,
  signOut,
  useAppDispatch,
  useAppSelector,
  shallowEqual,
};
