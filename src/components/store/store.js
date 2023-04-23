import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../store/profileSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export default store;