import "../css/home.css"
import { useNavigate } from 'react-router-dom';
import { React } from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const ViewTutor = (props) => {
    let navigate = useNavigate();
    const [tutor, setTutor] = useState({});
    const [msg, setMsg] = useState("");
    const [viewBtn, setViewBtn] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
        let tutorId;
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getTutorDetails?userID=${window.location.href.toString().split("/")[4]}`, { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then(response => {
                setTutor(response.data);
                tutorId = response.data.USER_ID;
                axios.post(`${process.env.REACT_APP_SERVER_URL}/api/message/checkConnections`,
                    { studentId: cookies.userid, tutorId: tutorId }, { headers: { "Authorization": `Bearer ${cookies.token}` } })
                    .then(response => {
                        if (response.status === 200)
                            setViewBtn(false);
                    })
                    .catch(err => {
                        if (err.response.status === 404)
                            setViewBtn(true);
                    });
            })
            .catch(err => {
                console.log(err);
            });

    }, [])



    const renderRating = (n) => {
        if (n === 0) {
            return (
                <div className="small-ratings">
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                </div>
            )
        }
        if (n === 1) {
            return (
                <div className="small-ratings">
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                </div>
            )
        }
        if (n === 2) {
            return (
                <div className="small-ratings">
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                </div>
            )
        }
        if (n === 3) {
            return (
                <div className="small-ratings">
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                </div>
            )
        }
        if (n === 4) {
            return (
                <div className="small-ratings">
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill"></i>
                </div>
            )
        }
        if (n === 5) {
            return (
                <div className="small-ratings">
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill rating-color"></i>
                    <i class="bi bi-star-fill rating-color"></i>
                </div>
            )
        }
    }

    const renderDate = () => {
        const registrationDate = new Date(tutor.REGISTERED_AT);
        return (
            registrationDate.getDate().toString() + "." +
            (registrationDate.getMonth() + 1).toString() + "." +
            registrationDate.getFullYear().toString()
        );
    }
    const onMessageSend = () => {
        const data = {
            studentId: cookies.userid,
            tutorId: tutor.USER_ID,
            message: msg
        }
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/message/sendMessageRequest`,
            data,
            { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then(response => {
                setViewBtn(false);
            })
            .catch(err => {
                console.log(err);
            });
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
                                        <img src={`${process.env.REACT_APP_PROFILE_URL}${tutor.IMAGE}`} alt="Admin" style={{ objectFit: "cover", height: "170px", width: "170px" }} className="rounded-circle" />
                                        <div className="mt-3">
                                            <h4>{tutor.NAME}</h4>
                                            <p className="text-secondary mb-1">{tutor.BIO}</p>
                                            <p className="text-secondary mb-1">
                                                Teaching Since {renderDate()}
                                            </p>
                                            <button className='btn btn-outline-primary mt-1' onClick={() => { handleDownload(`${process.env.REACT_APP_RESUME_URL}${tutor.CV}`) }}>Download CV</button>&nbsp;
                                            {
                                                viewBtn ?
                                                    <button type="button" className="btn btn-outline-primary mt-1"
                                                        data-bs-toggle="modal" data-bs-target="#messageModal">
                                                        Message
                                                    </button> :
                                                    null
                                            }
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
                                        tutor.subjects ?
                                            tutor.subjects.map((s, i) => (
                                                <div key={i}>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">{s.SUBJECT_NAME}</h6>
                                                        </div>
                                                        <div className="col-sm-3 text-secondary">
                                                            €{s.PRICE}/hour
                                                        </div>
                                                        <div className="col-sm-6 text-secondary">
                                                            {renderRating(s.AVERAGE_RATING)}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            )) :
                                            null
                                    }
                                </div>
                            </div>
                            {tutor.reviews ?
                                <div className="card mb-3 rounded">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-center">
                                            <h5 className="d-flex align-items-center mb-3">Recent Reviews</h5>
                                        </div>
                                        {
                                            tutor.reviews ?
                                                tutor.reviews.map((review, i) => (
                                                    <div className="card shadow rounded" key={i}>
                                                        <div className="card-body">
                                                            <blockquote className="blockquote mb-0">
                                                                {renderRating(review.RATING)}
                                                                <p style={{ fontSize: "18px" }}>{review.REVIEW}</p>
                                                                <footer className="blockquote-footer">Admin</footer>
                                                            </blockquote>
                                                        </div>
                                                    </div>
                                                )) :
                                                null
                                        }
                                    </div>
                                </div> : null
                            }
                        </div>

                    </div>

                </div>
            </div>
            <div className="modal fade" id="messageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Type Your Message ...</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Message:</label>
                                <textarea className="form-control"
                                    value={msg}
                                    onChange={(e) => { setMsg(e.currentTarget.value) }} id="messageText"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onMessageSend}>Send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewTutor;