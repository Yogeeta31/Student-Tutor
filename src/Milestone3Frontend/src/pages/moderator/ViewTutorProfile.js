
import { useNavigate, Link } from 'react-router-dom';
import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const ViewTutorProfile = (props) => {
    let navigate = useNavigate();
    const [user, setUser] = useState({});
    const [cookies, setCookie] = useCookies(['user']);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (cookies.token !== undefined) {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getTutorDetails?user_id=${window.location.href.toString().split("/")[4]}`, { headers: { "Authorization": `Bearer ${cookies.token}` } })
                .then(response => {
                    setUser(response.data);
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err);
                })
        } else
            navigate('/login');

    }, []);

    const renderDate = (d) => {
        const registrationDate = new Date(d);
        return (
            registrationDate.getDate().toString() + "." +
            (registrationDate.getMonth() + 1).toString() + "." +
            registrationDate.getFullYear().toString()
        );
    }
    const handleApproval = () => {
        const decision = {
            tutorId: user.TUTOR_ID,
            isApprove: 1
        }
        axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/approval`,
            decision,
            { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then(response => {
                if (response.status === 200)
                    navigate("/pendingrequests")
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleBan = () => {
        const ban = {
            reason: msg,
            moderatorId: parseInt(cookies.userid),
            userId: user.USER_ID
        }
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/banProfile`,
            ban,
            { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then(response => {
                if (response.status === 200)
                    console.log(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleRejection = () => {
        const decision = {
            tutorId: user.TUTOR_ID,
            isApprove: 2
        }

        const rejectionMsg = {
            reason: msg,
            senderId: parseInt(cookies.userid),
            receiverId: user.TUTOR_ID
        }


        axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/approval`,
            decision,
            { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then(response => {
                if (response.status === 200) {

                    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/rejectProfileWithReason`,
                        rejectionMsg)
                        .then(response => {
                            if (response.data.affectedRows)
                                navigate("/pendingrequests")
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleDownload = (l) => {
        const link = document.createElement('a');
        link.href = l;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <>
            <div className="container mt-4">
                <div className="main-body">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card rounded">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={`${process.env.REACT_APP_PROFILE_URL}${user.IMAGE}`} alt="Admin" className="rounded-circle" width="150" />
                                        <div className="mt-3">
                                            <h4>{user.NAME}</h4>
                                            <p className="text-secondary mb-1">{user.BIO}</p>
                                            <p className="text-secondary mb-1">{user.EMAIL}</p>
                                            <p className="text-secondary mb-1">+{user.MOBILE_NO}</p>
                                            <p className="text-secondary mb-1">Requested At - {renderDate(user.REGISTERED_AT)}</p>
                                            <button className='btn btn-outline-primary' onClick={() => { handleDownload(`${process.env.REACT_APP_RESUME_URL}${user.CV}`) }}>Download CV</button>&nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="card mb-3 rounded">
                                <div className="card-body">
                                    <div className="d-flex justify-content-center">
                                        <h5 className="d-flex align-items-center mb-3">Subjects</h5>
                                    </div>
                                    <hr />
                                    {
                                        user.subjects ?
                                            user.subjects.map((s, i) => (
                                                <div key={i}>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6 className="mb-0">{s.SUBJECT_NAME}</h6>
                                                        </div>
                                                        <div className="col-sm-6 text-secondary">
                                                            €{s.PRICE}/hour
                                                        </div>

                                                    </div>
                                                    <hr />
                                                </div>
                                            )) : null
                                    }
                                </div>
                            </div>
                            <div className="card mb-3 rounded">
                                <div className="card-body">
                                    <div className="d-flex justify-content-center">
                                        {
                                            user.IS_APPROVED ?
                                                <button className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#banModal">Ban</button>
                                                :
                                                <>
                                                    <button className='btn btn-outline-success' onClick={() => { handleApproval() }}>Approve</button>&nbsp;
                                                    <button className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#messageModal">Disapprove</button>
                                                </>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="messageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Reason for rejection ...</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Reason:</label>
                                <textarea className="form-control"
                                    value={msg}
                                    onChange={(e) => { setMsg(e.currentTarget.value) }} id="messageText"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleRejection}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="banModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Reason for banning ...</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Reason:</label>
                                <textarea className="form-control"
                                    value={msg}
                                    onChange={(e) => { setMsg(e.currentTarget.value) }} id="messageText"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleBan}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewTutorProfile;