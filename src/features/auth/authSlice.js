// import { createSlice } from '@reduxjs/toolkit';

// const token = localStorage.getItem('token');

// const initialState = {
//   token: token || null,
//   lastLogin: null,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.token = action.payload.token;
//       state.lastLogin = action.payload.lastLogin;
//       localStorage.setItem('token', action.payload.token);
//       state.error = null;
//     },
//     loginFailure: (state, action) => {
//       state.error = action.payload;
//     },
//     logout: (state) => {
//       state.token = null;
//       localStorage.removeItem('token');
//     },
//   },
// });

// export const { loginSuccess, loginFailure, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

const initialState = {
  token: token || null,
  lastLogin: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.lastLogin = action.payload.lastLogin;
      localStorage.setItem('token', action.payload.token);
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    registerSuccess: (state, action) => {
      state.token = action.payload.token;
      state.lastLogin = action.payload.lastLogin;
      localStorage.setItem('token', action.payload.token);
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.lastLogin = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
