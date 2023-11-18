import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};
/**
 * @description commonSlice
 */
export const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = commonSlice.actions;

export default commonSlice.reducer;
