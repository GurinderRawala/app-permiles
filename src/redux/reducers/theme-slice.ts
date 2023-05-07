import { SliceCaseReducers, createSlice } from '@reduxjs/toolkit';

export interface ThemeSliceState {
  mode: 'light' | 'dark';
}

export const themeSlice = createSlice<
  ThemeSliceState,
  SliceCaseReducers<ThemeSliceState>,
  string
>({
  name: 'themeSlice',
  initialState: {
    mode: 'light',
  },
  reducers: {
    changeTheme: (
      state,
      payload: { type?: string; payload: 'light' | 'dark' }
    ) => ({
      ...state,
      mode: payload.payload,
    }),
  },
});
export const { changeTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
