import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const interactionsSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    setInteractions: (state, action) => {
      state.data = action.payload;
    },
    resetInteractions: (state) => {
      state.data = null;
    },
  },
});

export const { setInteractions, resetInteractions } = interactionsSlice.actions;

export default interactionsSlice.reducer;