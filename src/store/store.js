import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './studentsSlice';

const store = configureStore({
  reducer: {
    studentsData: studentsReducer,
  },
});

export default store;
