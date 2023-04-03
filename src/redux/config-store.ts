import { configureStore } from '@reduxjs/toolkit'
import { ThemeSliceState, themeReducer } from './reducers'

export type Store = {
  themeReducer: ThemeSliceState
}

export const store = configureStore({
  reducer: {
    themeReducer,
  },
})
