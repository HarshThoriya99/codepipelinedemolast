import { signupUserAPI } from "../../api/authentication/signup";
import { createSlice } from "@reduxjs/toolkit";

const data = {
  isLoading: false,
  error: "",
  msg: null,
  data: null,
};

const signupUserSlice = createSlice({
  name: "signup",
  initialState: data,
  reducers: {
    signupSlice(state) {
      state.isLoading = false;
    },
    signupSliceSuccess(state, action) {
      state.isLoading = true;
      state.data = action.payload;
    },
    signupSliceFailure(state, action) {
      state.isLoading = false;
      state.msg = action.payload;
    },
    signupSliceReset(state) {
      state.data = null;
      state.error = "";
      state.isLoading = false;
      state.msg = null;
    },
  },
});

export const signupUserHandler = (data) => async (dispatch) => {
  try {
    dispatch(signupUserAction.signupSlice());
    const response = await signupUserAPI(data);
    dispatch(signupUserAction.signupSliceSuccess(response));
  } catch (e) {
    console.log("99", e?.response?.data?.message);
    dispatch(signupUserAction.signupSliceFailure(e?.response?.data));
    // dispatch(signupUserAction.signupSliceReset());
  }
};

export default signupUserSlice.reducer;
export const signupUserAction = signupUserSlice.actions;
