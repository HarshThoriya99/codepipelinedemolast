import { configureStore } from "@reduxjs/toolkit";

import loginUserSlice from "../slices/login-slice";
import signUpSlice from "../slices/signup-slice";
import chatRoomSlice from "../slices/get-chat-room";
import getMessageSlice from "../slices/get-message";

const store = configureStore({
  reducer: {
    login: loginUserSlice,
    signup: signUpSlice,
    getchatroom: chatRoomSlice,
    getmessage: getMessageSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
