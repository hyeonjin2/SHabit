import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import videoSlice from './videoSlice';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSeletor,
} from 'react-redux';
import chartSlice from './chartSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    video: videoSlice.reducer,
    chart: chartSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const typedUseSeletor: TypedUseSelectorHook<RootState> = useReduxSeletor;