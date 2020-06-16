import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import jwtDecode from 'jwt-decode';

import { apiCallBegan } from './api';

const slice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    tokenReceived: (auth, action) => {
      auth.token = action.payload;
    },
  },
});

export const { tokenReceived } = slice.actions;
export default slice.reducer;

const url = '/auth';

export const login = (email, password) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      method: 'post',
      data: { email, password },
      onSuccess: tokenReceived.type,
    })
  );
};

export const getUser = createSelector(
  (state) => state.entities.auth,
  ({ token }) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }
);
