import React, { useEffect, useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { Field, Formik } from "formik";
import { FaUsers } from "react-icons/fa";
// import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { AiOutlineWechat } from "react-icons/ai";
import io from "socket.io-client";
import { getMessageHandler } from "../redux/slices/get-message";

import { TbLogout } from "react-icons/tb";
import chatcordimg from "../../src/assets/Images/chat-cord.png";
import { ImSearch } from "react-icons/im";
import ReadMoreReact from "read-more-react";

const Dashboard = ({ socket }, props) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const bottomRef = useRef(null);

  const [val, setVal] = useState();
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  console.log("messages", messages);
  const [isToasting, setIsToasting] = useState(false);
  const [targetArray, setTargetArray] = useState([]);
  console.log("targetArray", targetArray);
  const [foundUsers, setFoundUsers] = useState(targetArray);
  console.log("foundUsers", foundUsers);
  const [name, setName] = useState("");

  const topicname = JSON.parse(localStorage.getItem("topicname"));
  const topicid = JSON.parse(localStorage.getItem("topicid"));
  const userName = JSON.parse(localStorage.getItem("name"));
  const userid = JSON.parse(localStorage.getItem("id"));
  const currentMsg = JSON.parse(localStorage.getItem("crnmsg"));

  const navigate = useNavigate();
  const getMsg = useSelector((state) => state?.getmessage?.data?.data);

  // const getMsg = useSelector((state) => state?.getmessage?.data?.data);

  useEffect(() => {
    if (getMsg) {
      setTargetArray(getMsg);
      setFoundUsers(getMsg);
    }
    console.log("ede1", getMsg);
  }, [getMsg]);

  useEffect(() => {
    dispatch(getMessageHandler(topicid));
    setTargetArray((prevArray) => prevArray.concat(getMsg));
    localStorage.setItem("msgArray", JSON.stringify(targetArray));
    socket?.on("message", (message) => {
      setTargetArray((prevArray) => [...prevArray, message]);
      setMessages((messages) => {
        return [...messages, message];
      });
      setFoundUsers((foundUsers) => [...foundUsers, message]);
    });
    return () => socket.off("message");
  }, []);

  console.log("[...messages, message]", messages);
  useEffect(() => {
    socket?.emit("joinRoom", {
      userid: userid,
      username: userName,
      topicid: topicid,
      topicname: topicname,
    });

    socket?.on("roomUsers", ({ topic, users }) => {
      console.log("aaa", users);
      setRoom(topic);
      setUsers(users);
    });

    return () => {
      socket.emit("leaving");
    };
  }, [socket]);

  useEffect(() => {
    const currentMsgUser = targetArray[targetArray.length - 1];

    if (currentMsgUser) {
      localStorage.setItem("crnmsg", JSON.stringify(currentMsgUser));
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [targetArray, getMsg, foundUsers]);

  const uniqueItems = users?.filter((item, index, self) => {
    return index === self.findIndex((i) => i.username === item.username);
  });

  const filter = (e) => {
    debugger;
    const msg = e.target.value;

    if (getMsg) {
      const results = targetArray.filter((user) => {
        return user.msg.toLowerCase().includes(msg.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(targetArray);
      // If the text field is empty, show all users
    }
    setName(msg);
  };

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  // useEffect(() => {
  //   if (getMsg) {
  //     setFoundUsers(getMsg);
  //   }
  // }, [getMsg]);

  const leave = () => {
    // socket.emit("disconnect");
    socket.emit("leaving");
    navigate("/chatcord");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleSubmit = (values, { resetForm }) => {
    // debugger;
    if (values?.prompt.length !== 0) {
      socket.emit("chatMessage", values?.prompt);
    }

    resetForm("");
  };
  return (
    <>
      {/* <Header socket={socket} /> */}
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
              className="search"
              // class="no-outline"
              // value={searchString}
            />
            {/* <button
              type="button"
              class="btn"
              style={{
                margin: "0px",
                fontSize: "15px",
                color: "white",
                marginLeft: "-10px",
              }}
            >
              <ImSearch />
            </button> */}

            <button href="#" class="menu-block" onClick={leave}>
              Leave Room
            </button>

            <button
              onClick={() => logout()}
              style={{
                fontWeight: "bold",
                textAlign: "center",
                display: "flex",
                marginLeft: "-5px",
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

      <div className="chatcontainer">
        <div className="allchats container">
          <div className="tab">
            <div className="NewChat">
              <AiOutlineWechat />
              Room Name:
            </div>

            <div
              style={{
                background: "rgb(0 29 72)",
                padding: "0px 10px",
                margin: "4px",
                color: "white",
                fontSize: "20px",
              }}
            >
              {topicname}
            </div>
            <div className="NewChat" style={{ paddingTop: "15px" }}>
              {" "}
              <FaUsers />
              Users:
            </div>
            <table class="table">
              <tbody className="scrollbar1" id="style-8">
                {uniqueItems
                  ?.slice(0)
                  .reverse()
                  .map((name, index) => {
                    return (
                      <tr key={index} id="force-overflow">
                        <td
                          className={
                            name.username === currentMsg.username
                              ? "highlight"
                              : ""
                          }
                        >
                          <div className="title1">
                            <div>
                              <span className="namelogo">
                                {name.username[0].toUpperCase()}
                              </span>
                              {name.username}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div
            style={{
              padding: "5px",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                color: "black",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "white",
                  padding: "3px 9px",
                  borderRadius: "5px",
                  marginRight: "10px",
                  background: "rgb(5 4 62",
                }}
              >
                {userName ? userName[0].toUpperCase() : ""}
              </span>
              <strong>{userName}</strong>
            </div>
          </div>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            prompt: "",
          }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <div className="form">
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="chat">
                  <div className="uniquechatting">
                    <div className="scrollbar chatting" id="style-7">
                      <div style={{ textAlign: "left" }} class="force-overflow">
                        <>
                          {foundUsers && foundUsers.length >= 0
                            ? foundUsers?.map((names) => {
                                return (
                                  <>
                                    <div
                                      style={
                                        names?.username == userName
                                          ? {
                                              fontWeight: " 700",
                                              borderRadius: "7px",
                                              display: "flex",
                                              justifyContent: "flex-end",
                                              minWidth: "400px",
                                              textAlign: "justify",
                                            }
                                          : {
                                              fontWeight: " 700",
                                              borderRadius: "7px",
                                              display: "flex",
                                              minWidth: "400px",
                                              height: "auto",
                                              textAlign: "justify",
                                            }
                                      }
                                    >
                                      <strong>
                                        <h5
                                          style={{
                                            color: " black",
                                            background:
                                              "rgba(136, 163, 165, 0.38)",
                                            margin: "17px 40px",
                                            padding: " 10px 25px",
                                            borderRadius: "5px",
                                            width: "425px",
                                          }}
                                        >
                                          {" "}
                                          <span
                                            style={{
                                              color: "#001c4a",
                                              marginRight: "40px",
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            <span
                                              style={{
                                                color: "white",
                                                padding: "3px",
                                                borderRadius: "5px",
                                                marginRight: "10px",
                                                background: "rgb(5 4 62",
                                                fontSize: "18px",
                                                width: "25px",
                                                textAlign: "center",
                                              }}
                                            >
                                              {names?.username[0].toUpperCase()}
                                            </span>
                                            {names?.username}
                                            <span
                                              style={{
                                                fontSize: "16px",
                                                color: "gray",
                                                padding: "0px 5px",
                                              }}
                                            >
                                              {names?.time}
                                            </span>
                                          </span>
                                          <div class="msgs">
                                            <ReadMoreReact
                                              text={names?.msg}
                                              min={100}
                                              ideal={100}
                                              max={200}
                                              readMoreText="read more"
                                            />{" "}
                                          </div>
                                        </h5>
                                      </strong>
                                    </div>
                                  </>
                                );
                              })
                            : targetArray?.map((names) => {
                                return (
                                  <>
                                    <div
                                      style={
                                        names?.username == userName
                                          ? {
                                              fontWeight: " 700",
                                              borderRadius: "7px",
                                              display: "flex",
                                              justifyContent: "flex-end",
                                              minWidth: "400px",
                                              textAlign: "justify",
                                            }
                                          : {
                                              fontWeight: " 700",
                                              borderRadius: "7px",
                                              display: "flex",
                                              minWidth: "400px",
                                              height: "auto",
                                              textAlign: "justify",
                                            }
                                      }
                                    >
                                      <strong>
                                        <h5
                                          style={{
                                            color: " black",
                                            background:
                                              "rgba(136, 163, 165, 0.38)",
                                            margin: "17px 40px",
                                            padding: " 10px 25px",
                                            borderRadius: "5px",
                                            width: "425px",
                                          }}
                                        >
                                          {" "}
                                          <span
                                            style={{
                                              color: "#001c4a",
                                              marginRight: "40px",
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            <span
                                              style={{
                                                color: "white",
                                                padding: "3px",
                                                borderRadius: "5px",
                                                marginRight: "10px",
                                                background: "rgb(5 4 62",
                                                fontSize: "18px",
                                                width: "25px",
                                                textAlign: "center",
                                              }}
                                            >
                                              {names?.username[0].toUpperCase()}
                                            </span>
                                            {names?.username}
                                            <span
                                              style={{
                                                fontSize: "16px",
                                                color: "gray",
                                                padding: "0px 5px",
                                              }}
                                            >
                                              {names?.time}
                                            </span>
                                          </span>
                                          <div class="msgs containerr">
                                            {" "}
                                            {/* <ReadMoreReact
                                              text={names?.msg}
                                              min={80}
                                              ideal={100}
                                              max={200}
                                              readMoreText="click here to read more"
                                            />{" "} */}
                                            {isReadMore
                                              ? names?.msg.slice(0, 150)
                                              : names?.msg}
                                            <span
                                              onClick={toggleReadMore}
                                              className="read-or-hide"
                                            >
                                              {isReadMore
                                                ? "...read more"
                                                : " show less"}
                                            </span>
                                          </div>
                                        </h5>
                                      </strong>
                                    </div>
                                  </>
                                );
                              })}
                        </>
                        <div ref={bottomRef} />
                      </div>
                    </div>

                    <div className="inputbox">
                      <Field
                        ref={inputRef}
                        id="msg"
                        name="prompt"
                        type="text"
                        autoFocus
                        onChange={handleChange}
                        values={values.prompt}
                        placeholder="Send a message."
                        className="border-right-0"
                      />
                      <button type="submit" className="icon">
                        <FiSend />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </Formik>

        <script src="index.js"></script>
      </div>
    </>
  );
};
export default Dashboard;
