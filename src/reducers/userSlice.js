import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchCurrentUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { fetchCurrentUser } = userSlice.actions;

export default userSlice.reducer;
