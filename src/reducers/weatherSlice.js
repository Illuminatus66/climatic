import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action) => {
      state.data = action.payload;
    },
    resetWeather: (state) => {
      state.data = null
    }
  },
});

export const { setWeather, resetWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
