import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  interactionsLeft: null,
};

const interactionsSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    setInteractions: (state, action) => {
      state.interactionsLeft = action.payload;
    },
    resetInteractions: (state) => {
      state.interactionsLeft = null;
    },
  },
});

export const { setInteractions, resetInteractions } = interactionsSlice.actions;

export default interactionsSlice.reducer;