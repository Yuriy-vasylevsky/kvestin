import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatId: null,
  otherUserEmail: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatIdR(state, { payload }) {
      state.chatId = payload.chatId;
      state.otherUserEmail = payload.otherUserEmail;
    },

    removeChatId(state, { payload }) {
      state.chatId = null;
      state.otherUserEmail = null;
    },
  },
});

export const { setChatIdR, removeChatId } = chatSlice.actions;
export default chatSlice.reducer;
