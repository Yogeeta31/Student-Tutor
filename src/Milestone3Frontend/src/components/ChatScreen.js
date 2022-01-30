import axios from "axios";
import "../css/chatList.css";
import React from "react";

const io = require("socket.io-client");

const socket = io("http://localhost:4000", {
  withCredentials: true,
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
      FR: {},
    };
  }
  componentDidMount() {
    let role;
    let stringRole = document.cookie.replace(
      /(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (stringRole === "student") {
      role = 3;
    } else if (stringRole === "tutor") {
      role = 2;
    } else {
      role = 1;
    }

    let token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/message/getMessagingList/?userId=${this.state.MYID}&roleId=${role}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        let friend = response.data.filter((f) => {
          return f.userId === this.state.FRID;
        });
        this.setState({ ...this.state, FR: friend[0] });
      })
      .catch((err) => {
        if (err.response.status === 404) console.log("Error");
      });

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

  renderDate = (d) => {
    const registrationDate = new Date(d);
    return (
      registrationDate.getDate().toString() +
      "/" +
      (registrationDate.getMonth() + 1).toString() +
      "/" +
      registrationDate.getFullYear().toString() +
      " (" +
      registrationDate.getHours().toString() +
      ":" +
      registrationDate.getMinutes().toString() +
      ")"
    );
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
                          src={
                            this.state.FR.profilePicture
                              ? `${process.env.REACT_APP_PROFILE_URL}${this.state.FR.profilePicture}`
                              : null
                          }
                          alt="avatar"
                          style={{ height: "50px", width: "50px" }}
                        />
                        <div className="chat-about mt-2">
                          <h6 className="mt-2">{this.state.FR.userName}</h6>
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
                              {this.renderDate(chat.SENT_AT)}
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
                            <i className="bi bi-send"></i>
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
