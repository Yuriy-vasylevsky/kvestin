import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
};

const userIdSlice = createSlice({
  name: 'userID',
  initialState,
  reducers: {
    setUserIdR(state, { payload }) {
      state.userId = payload.userId;
    },

    removeUserId(state, { payload }) {
      state.userId = null;
    },
  },
});

export const { setUserIdR, removeUserId } = userIdSlice.actions;
export default userIdSlice.reducer;
