import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  id: null,
  token: null,
  name: null,
  photo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.email = payload.email;
      state.token = payload.token;
      state.id = payload.id;
      state.name = payload.name;
      state.photo = payload.photo;
    },

    removeUser(state, { payload }) {
      state.email = null;
      state.id = null;
      state.token = null;
      state.name = null;
      state.photo = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
