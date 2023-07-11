import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Protected from "./routes/protected";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import ChatCordHome from "./pages/ChatCordHome";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./routes/privateRoute";
import Error from "./pages/error";
import io from "socket.io-client";

function App() {
  const socket = io.connect("http://192.168.1.233:3002");

  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={<Protected Component={Dashboard} socket={socket} />}
          />
          <Route
            path="/chatcord"
            element={<Protected Component={ChatCordHome} socket={socket} />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
