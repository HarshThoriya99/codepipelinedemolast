import { Navigate } from "react-router-dom";
const Protected = ({ Component, socket }) => {
  let localstorageToken = JSON.parse(localStorage.getItem("token"));
  console.log("localstorageToken", localstorageToken);

  if (localstorageToken == null) {
    return <Navigate to="/" replace />;
  }
  return <Component socket={socket} />;
};
export default Protected;
