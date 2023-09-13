import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weather: null,
};

const mongoSlice = createSlice({
  name: 'mongo',
  initialState,
  reducers: {
    setMongoData: (state, action) => {
      state.weather = action.payload;
    },
    resetMongoData: (state) => {
      state.weather = null
    }
  },
});

export const { setMongoData, resetMongoData } = mongoSlice.actions;

export default mongoSlice.reducer;
