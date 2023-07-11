import Http from "../../services/http";

export const signupUserAPI = (data) => {
    return Http.post("user/signup", data)
};

