import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  interactionsLeft: 0,
};

const interactionsSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    setInteractions: (state, action) => {
      state.interactionsLeft = action.payload
    }
  },
});

export const { setInteractions } = interactionsSlice.actions;

export default interactionsSlice.reducer;