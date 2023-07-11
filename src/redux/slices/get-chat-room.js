import { createSlice } from "@reduxjs/toolkit";

import { getChatRoomAPI } from "../../api/authentication/chatRoom";

const data = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const getChatRoomSlice = createSlice({
  name: "getchatroom",
  initialState: data,
  reducers: {
    getchatroomSlice(state) {
      state.isLoading = false;
    },
    getchatroomSliceSuccess(state, action) {
      state.isLoading = true;
      state.data = action.payload;
      state.message = null;
    },
    getchatroomSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    getchatroomSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const getChatRoomHandler = () => async (dispatch) => {
  try {
    dispatch(getChatRoomAction.getchatroomSlice());
    const response = await getChatRoomAPI();
    console.log(response, "res2");
    dispatch(getChatRoomAction.getchatroomSliceSuccess(response));
  } catch (e) {
    dispatch(
      getChatRoomAction.getchatroomSliceFailure(e?.response?.data?.message)
    );
    dispatch(getChatRoomAction.getchatroomSliceReset());
  }
};

export default getChatRoomSlice.reducer;
export const getChatRoomAction = getChatRoomSlice.actions;
