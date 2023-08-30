import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  interactionsLeft: 0,
};

const interactionsSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    decrementInteractions: (state) => {
      state.interactionsLeft--;
    },
    resetInteractions: (state) => {
        state.interactionsLeft = 0
    },
    setInteractions: (state, payload) => {
      state.interactionsLeft = payload.interactionsLeft
    }
  },
});

export const { decrementInteractions, resetInteractions, setInteractions } = interactionsSlice.actions;

export default interactionsSlice.reducer;