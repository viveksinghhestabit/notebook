import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TokenContext from "../../Context/TokenContext";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { user, MySwal } = useContext(TokenContext);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5000");
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
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
        console.log("recieved message", messageObj);
        setMessages((prevMessages) => [...prevMessages, messageObj]);
      };
    }
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (socket && inputMessage.trim() !== "") {
      console.log(inputMessage);
      socket.send(JSON.stringify({ type: "message", message: inputMessage }));
      setInputMessage("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">Chat Room</div>
            <div className="card-body">
              <div className="">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`${
                      message.sender === user.id
                        ? "d-flex justify-content-end"
                        : "d-flex justify-content-start"
                    }`}
                  >
                    {message.sender === user.id ? (
                      <div className="bg-primary text-white p-2 rounded mt-2">
                        {message.message}
                      </div>
                    ) : (
                      <div className="bg-light p-2 rounded border mt-2">
                        {message.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <div className="input-group">
                <input
                  type="text"
                  id="message"
                  className="form-control"
                  placeholder="Type a message"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
