import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import chatcordimg from "../../src/assets/Images/chat-cord.png";
import { ImSearch } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import Dashboard from "../pages/Dashboard";

import "react-toastify/dist/ReactToastify.css";

const Header = ({ socket }, props) => {
  const navigate = useNavigate();
  const getMsg = useSelector((state) => state?.getmessage?.data?.data);

  const [foundUsers, setFoundUsers] = useState(getMsg);
  console.log("foundUsers", foundUsers);
  const [name, setName] = useState("");

  const filter = (e) => {
    debugger;
    const msg = e.target.value;

    if (getMsg) {
      const results = getMsg.filter((user) => {
        return user.msg.toLowerCase().startsWith(msg.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(getMsg);
      // If the text field is empty, show all users
    }
    localStorage.setItem("search", JSON.stringify(foundUsers));

    setName(msg);
  };

  useEffect(() => {
    if (getMsg) {
      setFoundUsers(getMsg);
    }
  }, [getMsg]);

  const leave = () => {
    // socket.emit("disconnect");
    socket.emit("leaving");
    navigate("/chatcord");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <header class="header" id="header" style={{ background: "#001c4a" }}>
        <nav class="navbar container">
          <a to="#" class="brand" style={{ color: "white" }}>
            <img src={chatcordimg} className="chatcordimg" />
            ChatCord
          </a>
          <div class="burger" id="burger">
            <span class="burger-line"></span>
            <span class="burger-line"></span>
            <span class="burger-line"></span>
          </div>
          <div class="menu" id="menu">
            <ul class="menu-inner"></ul>
          </div>
          <div className="lbtn">
            <input
              placeholder="Search"
              style={{ paddingLeft: "7px" }}
              onChange={filter}
              value={name}
              // value={searchString}
            />
            <button
              type="button"
              class="btn btn-primary"
              style={{ margin: "0px", fontSize: "15px" }}
            >
              <ImSearch />
            </button>

            <button href="#" class="menu-block" onClick={leave}>
              Leave Room
            </button>

            <button
              onClick={() => logout()}
              style={{
                fontWeight: "bold",
                textAlign: "center",
                display: "flex",
                marginLeft: "5px",
                color: "white",
                alignItems: "center",
                // border: "1px solid white",
              }}
              className="logout3"
            >
              <TbLogout />
            </button>
          </div>
        </nav>
      </header>
      {/* <Dashboard foundUsers={foundUsers} /> */}
    </>
  );
};
export default Header;
