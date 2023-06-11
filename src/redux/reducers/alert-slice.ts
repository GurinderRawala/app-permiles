import { SliceCaseReducers, createSlice } from '@reduxjs/toolkit';

export interface AlertSliceState {
  showAlert: boolean;
  type: 'error' | 'success' | null;
  message: string;
}

export const alertSlice = createSlice<
  AlertSliceState,
  SliceCaseReducers<AlertSliceState>,
  string
>({
  name: 'alertSlice',
  initialState: {
    showAlert: false,
    type: null,
    message: '',
  },
  reducers: {
    triggerAlert: (
      state,
      payload: { type: string; payload: AlertSliceState }
    ) => ({
      ...state,
      ...payload.payload,
    }),
  },
});
export const { triggerAlert } = alertSlice.actions;

export const alertReducer = alertSlice.reducer;
