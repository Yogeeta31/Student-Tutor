import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const ViewMessageRequest = () => {
    const [messages, setMessages] = useState([]);
    const [cookies, setCookie] = useCookies(['user']);

    const getData = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/getMessageFromConn`,
            { "tutorId": cookies.userid })
            .then((response) => {
                let newMessages = response.data.filter(
                    (messages) => {
                        return messages.REMARK === 0;
                    }
                )
                setMessages(newMessages)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const handleDecision = (id, d) => {
        let decision = {
            tutorId: cookies.userid,
            status: d,
            studentId: id
        }
        axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/message/changeMessageStatus`,
            decision,
            { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then((response) => {
                if (response.status === 201) {
                    getData();
                }

            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className="container my-3 shadow" style={{ backgroundColor: "white" }}>
            <div className="row">
                <h3 className="mt-3">&nbsp;&nbsp;Message Request</h3>
            </div>
            <hr />
            {messages.length > 0 ?
                messages.map(message => (
                    <div className="card my-3 shadow" key={message.STUDENT_ID}>
                        <div className="row g-0">
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-2 offset-xs-2 offset-sm-4 offset-md-0">
                                <img
                                    src={`${process.env.REACT_APP_PROFILE_URL}${message.IMAGE}`}
                                    alt="StudentImage"
                                    className="img-fluid rounded-start"
                                    style={{ maxWidth: "170px", maxHeight: "170p" }}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-9 col-xl-10 offset-xs-2 offset-sm-4 offset-md-0">
                                <div className="card-body">
                                    <h5 className="card-title">{message.NAME}</h5>
                                    <p className="card-text" style={{ color: "black" }}>
                                        {message.MESSAGE}
                                    </p>
                                    <button className="btn btn-outline-success" id={message.STUDENT_ID} onClick={(e) => { handleDecision(e.currentTarget.id, 1) }}>Approve</button>&nbsp;&nbsp;
                                    <button className="btn btn-outline-danger" id={message.STUDENT_ID} onClick={(e) => { handleDecision(e.currentTarget.id, 2) }}>Disapprove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                :
                <div className="card-body">
                    <div className="container d-flex justify-content-center my-5">
                        <h3>No Pending Messaging Requests</h3>
                    </div>
                </div>
            }
        </div>
    )
}

export default ViewMessageRequest;