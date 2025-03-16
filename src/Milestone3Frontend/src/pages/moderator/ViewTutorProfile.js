
import { useNavigate } from 'react-router-dom';
import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const ViewTutorProfile = (props) => {
    let navigate = useNavigate();
    const [user, setUser] = useState({});
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
        if (cookies.token !== undefined) {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getTutorDetails?userID=${window.location.href.toString().split("/")[4]}`, { headers: { "Authorization": `Bearer ${cookies.token}` } })
                .then(response => {
                    setUser(response.data);
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
    const handleDecision = (e) => {
        const decision = {
            tutorId: user.TUTOR_ID,
            isApprove: e
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
    return (
        <>
            <div className="container mt-4">
                <div className="main-body">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card rounded">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                        <div className="mt-3">
                                            <h4>{user.NAME}</h4>
                                            <p className="text-secondary mb-1">{user.BIO}</p>
                                            <p className="text-secondary mb-1">Requested At - {renderDate(user.REGISTERED_AT)}</p>
                                            <button className='btn btn-outline-primary'>Download CV</button>&nbsp;
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
                                        <button className='btn btn-outline-success' id="1" onClick={e => { handleDecision(1) }}>Approve</button>&nbsp;
                                        <button className='btn btn-outline-danger' id="0" onClick={e => { handleDecision(0) }}>Disapprove</button>
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
export default ViewTutorProfile;