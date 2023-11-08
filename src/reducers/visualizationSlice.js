import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const visualizationSlice = createSlice({
  name: 'visualization',
  initialState,
  reducers: {
    setVisualization: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const { setWeather, resetWeather } = visualizationSlice.actions;

export default visualizationSlice.reducer;
