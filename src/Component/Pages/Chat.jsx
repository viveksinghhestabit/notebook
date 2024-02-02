import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TokenContext from "../../Context/TokenContext";
import "./ChatApp.css";
import moment from "moment";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const me = "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg";
  const you =
    "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg";
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { user, MySwal } = useContext(TokenContext);
  if (!user) {
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are not logged in!",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }

  useEffect(() => {
    const newSocket = new WebSocket(process.env.SOCKET_PATH);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket && user) {
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            type: "bind",
            message: user.id,
          })
        );
      };
      socket.onmessage = (event) => {
        const messageObj = JSON.parse(event.data);
        messageObj.time = new Date();
        setMessages((prevMessages) => [...prevMessages, messageObj]);
        setTimeout(() => {
          const chat = document.querySelector(".card-body");
          chat.scrollTop = chat.scrollHeight;
        }, 100);
      };
    }
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (socket && inputMessage.trim() !== "") {
      console.log(inputMessage);
      socket.send(JSON.stringify({ type: "message", message: inputMessage }));
      setInputMessage("");
      document.getElementById("message").value = "";
    }
  };

  return (
    <>
      <div className="container-fluid h-100 mb-5 mt-5">
        <div className="row justify-content-center h-100">
          {/* <div className="col-md-4 col-xl-3 chat">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
              <div className="card-header">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search..."
                    name=""
                    className="form-control search"
                  />
                  <div className="input-group-prepend">
                    <span className="input-group-text search_btn">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-body contacts_body">
                <ui className="contacts">
                  <li className="active">
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <img
                          src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                          className="rounded-circle user_img"
                        />
                        <span className="online_icon"></span>
                      </div>
                      <div className="user_info">
                        <span>Chief</span>
                        <p>Kalid is online</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <img
                          src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg"
                          className="rounded-circle user_img"
                        />
                        <span className="online_icon offline"></span>
                      </div>
                      <div className="user_info">
                        <span>Taherah Big</span>
                        <p>Taherah left 7 mins ago</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <img
                          src="https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg"
                          className="rounded-circle user_img"
                        />
                        <span className="online_icon"></span>
                      </div>
                      <div className="user_info">
                        <span>Sami Rafi</span>
                        <p>Sami is online</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <img
                          src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg"
                          className="rounded-circle user_img"
                        />
                        <span className="online_icon offline"></span>
                      </div>
                      <div className="user_info">
                        <span>Nargis Hawa</span>
                        <p>Nargis left 30 mins ago</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <img
                          src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg"
                          className="rounded-circle user_img"
                        />
                        <span className="online_icon offline"></span>
                      </div>
                      <div className="user_info">
                        <span>Rashid Samim</span>
                        <p>Rashid left 50 mins ago</p>
                      </div>
                    </div>
                  </li>
                </ui>
              </div>
              <div className="card-footer"></div>
            </div>
          </div> */}
          <div className="col-md-8 col-xl-6 chat">
            <div className="card">
              <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img
                      src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                      className="rounded-circle user_img"
                    />
                    <span className="online_icon"></span>
                  </div>
                  <div className="user_info">
                    <span>Chat with Chief</span>
                    <p>{messages.length} Messages</p>
                  </div>
                </div>
                <span id="action_menu_btn">
                  <i className="fas fa-ellipsis-v"></i>
                </span>
              </div>
              <hr style={{ margin: "0px" }} />
              <div className="card-body msg_card_body">
                {messages.length === 0 && (
                  <div className="d-flex justify-content-center mb-4">
                    <div className="msg_cotainer_send">
                      Start a conversation with Chief
                      {/* <span className="msg_time">8:55 AM, Today</span> */}
                    </div>
                  </div>
                )}
                {messages.map((message, index) => (
                  <>
                    {message.sender === user.id ? (
                      <>
                        <div
                          className="d-flex justify-content-end mb-4"
                          key={index}
                        >
                          <div className="msg_cotainer_send">
                            {message.message}
                            <span className="msg_time_send">
                              {moment(message.time).fromNow()}
                            </span>
                          </div>
                          <div className="img_cont_msg">
                            {" "}
                            <img
                              src={me}
                              className="rounded-circle user_img_msg"
                              alt=""
                            />{" "}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="d-flex justify-content-start mb-4"
                          key={index}
                        >
                          <div className="img_cont_msg">
                            <img
                              src={you}
                              className="rounded-circle user_img_msg"
                            />
                          </div>
                          <div className="msg_cotainer">
                            {message.message}
                            <span className="msg_time">
                              {moment(message.time).fromNow()}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ))}
              </div>
              <div className="card-footer">
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text attach_btn">
                      <i className="fas fa-paperclip"></i>
                    </span>
                  </div>
                  <textarea
                    name="message"
                    id="message"
                    className="form-control type_msg"
                    placeholder="Type your message..."
                    onChange={(e) => setInputMessage(e.target.value)}
                  ></textarea>
                  <div className="input-group-append">
                    <span
                      className="input-group-text send_btn"
                      onClick={sendMessage}
                    >
                      <i className="fas fa-location-arrow"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
