import { createSlice } from "@reduxjs/toolkit";

import { getMessageAPI } from "../../api/authentication/getmessage";

const data = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const getMessageSlice = createSlice({
  name: "getmessage",
  initialState: data,
  reducers: {
    getmessageSlice(state) {
      state.isLoading = false;
    },
    getmessageSliceSuccess(state, action) {
      state.isLoading = true;
      state.data = action.payload;
      state.message = null;
    },
    getmessageSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    getmessageSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const getMessageHandler = (id) => async (dispatch) => {
  try {
    dispatch(getMessageAction.getmessageSlice());
    const response = await getMessageAPI(id);
    console.log(response, "res2");
    dispatch(getMessageAction.getmessageSliceSuccess(response));
  } catch (e) {
    console.log(e, "crcr");
    dispatch(getMessageAction.getmessageSliceFailure(e?.response?.data));
    dispatch(getMessageAction.getmessageSliceReset());
  }
};

export default getMessageSlice.reducer;
export const getMessageAction = getMessageSlice.actions;
