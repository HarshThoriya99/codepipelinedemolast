import Http from "../../services/http";

export const getMessageAPI = (id) => {
  return Http.get(`topic/${id}`);
};
