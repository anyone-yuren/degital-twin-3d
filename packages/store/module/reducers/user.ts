import { createSlice } from '@reduxjs/toolkit';

import { TOKEN } from 'utils';
import { getStorage } from 'utils';
// import { MenuItem } from "@/components/Layout/layout";

export interface IUserInitialState {
  role: string[];
  token: string;
  menu: any[];
  [key: string]: any;
}

export interface Type {
  type: string;
}
// 默认状态
const initialState: IUserInitialState = {
  role: [],
  token: getStorage(TOKEN) ?? '',
  menu: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { setUserToken, setMenu } = userSlice.actions;

export default userSlice.reducer;
