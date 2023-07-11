import { createSlice } from "@reduxjs/toolkit";
import { loginUserAPI } from "../../api/authentication/login";

const data = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const loginUserSlice = createSlice({
  name: "login",
  initialState: data,
  reducers: {
    loginSlice(state) {
      state.isLoading = false;
    },
    loginSliceSuccess(state, action) {
      state.isLoading = true;
      state.data = action.payload;
      state.message = null;
    },
    loginSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    loginSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const loginUserHandler = (data) => async (dispatch) => {
  debugger;
  try {
    dispatch(loginUserAction.loginSlice());
    const response = await loginUserAPI(data);
    // localStorage.setItem("lastuserID", JSON.stringify(response.data.id));
    dispatch(loginUserAction.loginSliceSuccess(response));
  } catch (e) {
    console.log("12222", e?.response?.data?.message);
    dispatch(loginUserAction.loginSliceFailure(e));
  }
};
export default loginUserSlice.reducer;
export const loginUserAction = loginUserSlice.actions;
