import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const ViewMessageRequest = () => {
    const [messages, setMessages] = useState([]);
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/getMessageFromConn`,
            { "tutorId": cookies.userid })
            .then((response) => {
                let newMessages = response.data.filter(
                    (messages) => {
                        return messages.REMARK === 0;
                    }
                )
                console.log(newMessages);
                setMessages(newMessages)
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])

    return (
        <div className="container my-3 shadow" style={{ backgroundColor: "white" }}>
            <div className="row">
                <h3 className="mt-3">&nbsp;&nbsp;Message Request</h3>
            </div>
            <hr />
            {
                messages.map(message => (

                    <div className="card my-3 shadow" key={message.STUDENT_ID}>
                        <div className="row g-0">
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-2 offset-xs-2 offset-sm-4 offset-md-0">
                                <img
                                    src={`${process.env.REACT_APP_PROFILE_URL}${"2021-11-23-062341.jpg"}`}
                                    alt="StudentImage"
                                    className="img-fluid rounded-start"
                                    style={{ maxWidth: "170px", maxHeight: "170p" }}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-9 col-xl-10 offset-xs-2 offset-sm-4 offset-md-0">
                                <div className="card-body">
                                    <h5 className="card-title">{message.STUDENT_ID}</h5>
                                    <p className="card-text" style={{ color: "black" }}>
                                        {message.MESSAGE}
                                    </p>
                                    <button className="btn btn-outline-success" id={message.STUDENT_ID}>Approve</button>&nbsp;&nbsp;
                                    <button className="btn btn-outline-danger" id={message.STUDENT_ID}>Disapprove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ViewMessageRequest;