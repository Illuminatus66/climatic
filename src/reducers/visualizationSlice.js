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
    },
    resetVisualization: (state) => {
      state.data = null
    }
  },
});

export const { setVisualization, resetVisualization } = visualizationSlice.actions;

export default visualizationSlice.reducer;
