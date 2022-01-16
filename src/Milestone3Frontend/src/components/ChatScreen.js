import "../css/chatList.css"
import React, { useState, useEffect } from "react";

const io = require("socket.io-client");

const socket = io("http://localhost:4000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "Chatting",
  },
});


const ChatScreen = () => {
    const MYID = 3, FRID = 5;
    
    const [msg, setMsg] = useState("");
    const [chats, setChats] = useState([]);

    const onSendMessage = () => {
        let msgObj = {receiverId: FRID, senderId: MYID, message: msg}
        // console.log(msgObj);
        socket.emit("sendmessage", msgObj);
        setMsg("");
    }

    useEffect(() => {
        socket.on("output", (messages) => {
            setChats(messages);
            // console.log(messages);
        });
    
        socket.on("singleOutput", (message) => {
            // console.log("HEREERERE");
            let temp = [...msg];
            let newMessage = {
                MESSAGE: message.message,
                RECEIVER_ID: message.receiverId,
                SENDER_ID: message.senderId,
                SENT_AT: message.timestamp.SENT_AT,
                UPDATED_DATE: message.timestamp.UPDATED_DATE
            }
            // console.log(newMessage);
            temp.push(newMessage);
            setChats(temp);
            console.log("+++++++========++++++ZZZZZZZzzzzzzzzZZZZZZZZ");
            console.log(chats);
        });
        return(() => socket.close());
    }, []);



    useEffect(() => {
        let data = { receiverId: FRID, senderId: MYID };
        socket.emit("findmessage", data);
      }, []);

        // socket.on("findmessage", ({receiverId: "1", senderId: "2"}) => {
        //   let name = msg.name,
        //     message = msg.message;
        //   const updatedChat = [...chats];
        //   updatedChat.push({ name, message });
        //   console.log(chats);
        //   console.log(updatedChat);
        //   setChats(updatedChat);
        // });

    const listChats = () => {
        return chats.map((chat) => {
            // console.log(chat);
            return <li className="clearfix" key={chat.SENT_AT}>
            <div className={chat.SENDER_ID === MYID ? "message-data text-right":"message-data"}>
                <span className="message-data-time">{chat.SENT_AT}</span>
            </div>
            <div className={chat.SENDER_ID === MYID ? "message other-message float-right": "message my-message"}>{chat.MESSAGE}</div>
        </li>
        });
    };

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
                                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                            <div className="chat-about">
                                                <h6 className="mt-2">Aiden Chavez</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-history" >
                                    <ul className="m-b-0">
                                        {
                                            listChats()
                                        }
                                    </ul>
                                </div>
                                <div className="chat-message clearfix">
                                    <div className="input-group mb-0">
                                        <input type="text" className="form-control" placeholder="Enter text here..." value={msg} onChange={(e) => {
                                            setMsg(e.target.value);
                                        }}/>
                                        <div className="input-group-prepend">
                                            <button className="input-group-text" onClick={onSendMessage}><i className="fa fa-send"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}
export default ChatScreen;
