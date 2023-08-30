import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem ("Profile", JSON.stringify (action?.payload));
      state.data = action.payload;
    },
    logout: (state) => {
      localStorage.clear()
      state.data = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
