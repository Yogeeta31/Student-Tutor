import "../css/chatList.css";
import React from "react";

const io = require("socket.io-client");

const socket = io("http://localhost:4000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "Chatting",
  },
});

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      msg: "",
      MYID: parseInt(
        document.cookie.replace(
          /(?:(?:^|.*;\s*)userid\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        )
      ),
      FRID: parseInt(window.location.href.toString().split("/")[4]),
    };
  }
  componentDidMount() {
    let data = { receiverId: this.state.FRID, senderId: this.state.MYID };
    socket.emit("findmessage", data);
    socket.on("output", (messages) => {
      if (messages.length === 1 && messages[0].timestamp !== undefined) {
        let newMessage = {
          MESSAGE_ID: messages[0].messageId,
          SENDER_ID: messages[0].senderId,
          RECEIVER_ID: messages[0].receiverId,
          MESSAGE: messages[0].message,
          SENT_AT: messages[0].timestamp.sentAt,
          UPDATED_DATE: messages[0].timestamp.updatedAt,
        };
        this.setState({
          ...this.state,
          chats: [...this.state.chats, newMessage],
        });
      } else if (messages && messages.length !== 0 && messages.length > 1) {
        this.setState({ ...this.state, chats: messages });
      }
    });

    return () => socket.close();
  }

  onSendMessage = (e) => {
    e.preventDefault();
    let msgObj = {
      receiverId: this.state.FRID,
      senderId: this.state.MYID,
      message: this.state.msg,
    };
    socket.emit("sendmessage", msgObj);
    this.setState({ ...this.state, msg: "" });
  };
  render() {
    return (
      <>
        <div className="container mt-4">
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="card chat-app">
                <div className="chat">
                  <div className="chat-header clearfix">
                    <div className="row">
                      <div className="col-lg-6">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar2.png"
                          alt="avatar"
                        />
                        <div className="chat-about">
                          <h6 className="mt-2">Aiden Chavez</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chat-history">
                    <ul className="m-b-0">
                      {this.state.chats.map((chat) => (
                        <li className="clearfix" key={chat.MESSAGE_ID}>
                          <div
                            className={
                              chat.SENDER_ID === this.state.MYID
                                ? "message-data text-right"
                                : "message-data"
                            }
                          >
                            <span className="message-data-time">
                              {chat.SENT_AT}
                            </span>
                          </div>
                          <div
                            className={
                              chat.SENDER_ID === this.state.MYID
                                ? "message other-message float-right"
                                : "message my-message"
                            }
                          >
                            {chat.MESSAGE}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="chat-message clearfix">
                    <form>
                      <div className="input-group mb-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter text here..."
                          value={this.state.msg}
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              msg: e.currentTarget.value,
                            });
                          }}
                        />
                        <div className="input-group-prepend">
                          <button
                            className="input-group-text"
                            onClick={this.onSendMessage}
                          >
                            <i className="fa fa-send"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ChatScreen;
