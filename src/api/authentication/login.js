import Http from "../../services/http";

export const loginUserAPI = (data) => {
  debugger;
  return Http.post("user/signin", data);
};
