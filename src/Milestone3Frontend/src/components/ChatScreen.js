import "../css/chatList.css";
import React, { useState, useEffect } from "react";

const io = require("socket.io-client");

const socket = io("http://localhost:4000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "Chatting",
  },
});

// const ChatScreen = () => {
//   const MYID = 3,
//     FRID = 5;

//   const [msg, setMsg] = useState("");
//   const [chats, setChats] = useState([]);

//   const onSendMessage = () => {
//     let msgObj = { receiverId: FRID, senderId: MYID, message: msg };
//     socket.emit("sendmessage", msgObj);
//     setMsg("");
//   };

//   useEffect(() => {
//     let data = { receiverId: FRID, senderId: MYID };
//     socket.emit("findmessage", data);
//     socket.on("output", (messages) => {
//       console.log(messages);
//       //   let temp = [...chats];
//       if (messages.length === 1 && messages[0].timestamp !== undefined) {
//         let newMessage = {
//           MESSAGE_ID: messages[0].messageId,
//           SENDER_ID: messages[0].senderId,
//           RECEIVER_ID: messages[0].receiverId,
//           MESSAGE: messages[0].message,
//           SENT_AT: messages[0].timestamp.sentAt,
//           UPDATED_DATE: messages[0].timestamp.updatedAt,
//         };
//         // temp.push(newMessage);
//         console.log("Chats ", chats);
//         setChats([...chats, newMessage]);
//         console.log("New Message", newMessage);

//         // console.log(temp);
//       } else if (messages && messages.length !== 0 && messages.length > 1) {
//         setChats(messages);
//         console.log("+++++++++++++");
//         console.log(chats);
//       }
//     });

//     return () => socket.close();
//   }, []);

//   //   useEffect(() => {
//   //     let data = { receiverId: FRID, senderId: MYID };
//   //     socket.emit("findmessage", data);
//   //   }, []);

//   const listChats = () => {
//     console.log(chats);
//     return chats.map((chat) => {
//       return (
//         <li className="clearfix" key={chat.MESSAGE_ID}>
//           <div
//             className={
//               chat.SENDER_ID === MYID
//                 ? "message-data text-right"
//                 : "message-data"
//             }
//           >
//             <span className="message-data-time">{chat.SENT_AT}</span>
//           </div>
//           <div
//             className={
//               chat.SENDER_ID === MYID
//                 ? "message other-message float-right"
//                 : "message my-message"
//             }
//           >
//             {chat.MESSAGE}
//           </div>
//         </li>
//       );
//     });
//   };

//   return (
//     <>
//       {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" /> */}
//       <div className="container mt-4">
//         <div className="row clearfix">
//           <div className="col-lg-12">
//             <div className="card chat-app">
//               <div className="chat">
//                 <div className="chat-header clearfix">
//                   <div className="row">
//                     <div className="col-lg-6">
//                       <img
//                         src="https://bootdey.com/img/Content/avatar/avatar2.png"
//                         alt="avatar"
//                       />
//                       <div className="chat-about">
//                         <h6 className="mt-2">Aiden Chavez</h6>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="chat-history">
//                   <ul className="m-b-0">{listChats()}</ul>
//                 </div>
//                 <div className="chat-message clearfix">
//                   <div className="input-group mb-0">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter text here..."
//                       value={msg}
//                       onChange={(e) => {
//                         setMsg(e.target.value);
//                       }}
//                     />
//                     <div className="input-group-prepend">
//                       <button
//                         className="input-group-text"
//                         onClick={onSendMessage}
//                       >
//                         <i className="fa fa-send"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      msg: "",
      MYID: 3,
      FRID: 5,
    };
  }
  componentDidMount() {
    let data = { receiverId: this.state.FRID, senderId: this.state.MYID };
    socket.emit("findmessage", data);
    socket.on("output", (messages) => {
      //   let temp = [...chats];
      if (messages.length === 1 && messages[0].timestamp !== undefined) {
        let newMessage = {
          MESSAGE_ID: messages[0].messageId,
          SENDER_ID: messages[0].senderId,
          RECEIVER_ID: messages[0].receiverId,
          MESSAGE: messages[0].message,
          SENT_AT: messages[0].timestamp.sentAt,
          UPDATED_DATE: messages[0].timestamp.updatedAt,
        };
        // temp.push(newMessage);
        // console.log("Chats ", this.state.chats);
        this.setState({
          ...this.state,
          chats: [...this.state.chats, newMessage],
        });
        // console.log("New Message", this.state.chats);

        // console.log(temp);
      } else if (messages && messages.length !== 0 && messages.length > 1) {
        this.setState({ ...this.state, chats: messages });
        console.log("+++++++++++++");
        console.log(this.state.chats);
      }
    });

    return () => socket.close();
  }

  onSendMessage = () => {
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
        {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" /> */}
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
