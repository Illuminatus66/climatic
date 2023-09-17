import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const mongoSlice = createSlice({
  name: 'mongo',
  initialState,
  reducers: {
    setMongoData: (state, action) => {
      state.data = action.payload;
    },
    resetMongoData: (state) => {
      state.data = null
    }
  },
});

export const { setMongoData, resetMongoData } = mongoSlice.actions;

export default mongoSlice.reducer;
