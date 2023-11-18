import {
  Provider,
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
  shallowEqual,
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import common, { setData } from './reducers/common';
import user, { setMenu, setUserToken } from './reducers/user';

const store = configureStore({
  reducer: {
    user,
    common,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['user/setMenu', 'socket/setSendMessage'],
        // Ignore these paths in the state
        ignoredPaths: ['user', 'socket'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

export { store, Provider, useSelector, useDispatch, shallowEqual };

export { setUserToken, setMenu, setData };

export type { RootState, AppDispatch, TypedUseSelectorHook };
