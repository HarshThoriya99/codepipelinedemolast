import Http from "../../services/http";

export const getChatRoomAPI = () => {
  return Http.get("topic");
};
