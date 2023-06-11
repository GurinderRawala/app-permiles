import { configureStore } from '@reduxjs/toolkit';
import {
  AlertSliceState,
  ThemeSliceState,
  alertReducer,
  themeReducer,
} from './reducers';

export type Store = {
  themeReducer: ThemeSliceState;
  alertReducer: AlertSliceState;
};

export const store = configureStore({
  reducer: {
    themeReducer,
    alertReducer,
  },
});
