import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weather: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action) => {
      state.weather = action.payload;
    },
    resetWeather: (state) => {
      state.weather = null
    }
  },
});

export const { setWeather, resetWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
