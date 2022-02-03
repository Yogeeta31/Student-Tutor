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

    const [review, setReview] = useState({ subjectId: 0, review: "", rating: 1 });
    const [viewReviewBtn, setviewReviewBtn] = useState(false);

    const [page, setPage] = useState({ currentPage: 1, step: 2, numberOfPage: 0, data: [] });

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        let tutorId;
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getTutorDetails?user_id=${window.location.href.toString().split("/")[4]}`, { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then(response => {
                setPage({ ...page, numberOfPage: Math.ceil(response.data.reviews.length / page.step), data: response.data.reviews.slice(0, page.step) });

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

                axios.post(`${process.env.REACT_APP_SERVER_URL}/api/getReviewOptions`,
                    { studentId: cookies.userid, tutorId: tutorId }, { headers: { "Authorization": `Bearer ${cookies.token}` } })
                    .then(response => {
                        if (response.status === 200)
                            setviewReviewBtn(response.data.flag);
                    })
                    .catch(err => {
                        console.log(err);
                    });

            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleNext = () => {
        if (page.currentPage + 1 <= page.numberOfPage) {
            let start = page.currentPage * page.step;
            let stop = tutor.reviews.length > ((page.currentPage * page.step) + page.step) ? (page.currentPage * page.step) + page.step : tutor.reviews.length;
            setPage({ ...page, currentPage: page.currentPage + 1, data: tutor.reviews.slice(start, stop) })
        }
    }
    const handlePrev = () => {
        if (page.currentPage - 1 > 0) {
            let start = (page.currentPage * page.step) - (page.step * 2) < 0 ? 0 : (page.currentPage * page.step) - (page.step * 2);
            let stop = page.currentPage * page.step - page.step;
            setPage({ ...page, currentPage: page.currentPage - 1, data: tutor.reviews.slice(start, stop) })
        }
    }

    const renderRating = (n) => {
        if (n === 0) {
            return (
                <div className="small-ratings">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                </div>
            )
        }
        if (n === 1) {
            return (
                <div className="small-ratings">
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                </div>
            )
        }
        if (n === 2) {
            return (
                <div className="small-ratings">
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                </div>
            )
        }
        if (n === 3) {
            return (
                <div className="small-ratings">
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                </div>
            )
        }
        if (n === 4) {
            return (
                <div className="small-ratings">
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill"></i>
                </div>
            )
        }
        if (n === 5) {
            return (
                <div className="small-ratings">
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill rating-color"></i>
                    <i className="bi bi-star-fill rating-color"></i>
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
    const handleSubmitReview = () => {
        let r = { ...review };
        r.studentId = cookies.userid;
        r.tutorId = tutor.USER_ID;

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/reviewTutor`,
            r,
            { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then(response => {
                if (response.status === 200)
                    loadData();
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <>
            <div className="container mt-4 mb-3">
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
                                            }&nbsp;
                                            {
                                                viewReviewBtn ?
                                                    <button type="button" className="btn btn-outline-primary mt-1"
                                                        data-bs-toggle="modal" data-bs-target="#reviewModal">
                                                        Review
                                                    </button>
                                                    : null
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
                                            tutor.subjects.map((s) => (
                                                <div key={s.SUBJECT_ID}>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">{s.SUBJECT_NAME}</h6>
                                                        </div>
                                                        <div className="col-sm-3 text-secondary">
                                                            €{s.PRICE}/hour
                                                        </div>
                                                        <div className="col-sm-6 text-secondary">
                                                            {renderRating(Math.ceil(s.AVERAGE_RATING))}
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
                                                page.data.map((review, i) => (
                                                    <div className="card shadow rounded" key={i}>
                                                        <div className="card-body">
                                                            <blockquote className="blockquote mb-0">
                                                                <p style={{ fontSize: "18px" }}>{review.REVIEW}</p>
                                                                {renderRating(review.RATING)}
                                                                {/* <footer className="blockquote-footer">Admin</footer> */}
                                                            </blockquote>
                                                        </div>
                                                    </div>
                                                )) :
                                                null
                                        }
                                        <div className="row">
                                            <div className="col d-flex justify-content-center mt-3">
                                                <nav aria-label="Page navigation">
                                                    <ul className="pagination">
                                                        <li className="page-item">
                                                            <button className="page-link" disabled={page.currentPage === 1 ? true : false} onClick={handlePrev}><i className="bi bi-arrow-left-square"></i>
                                                            </button></li>
                                                        <li className="page-item">
                                                            <button className="page-link" disabled={page.currentPage === page.numberOfPage ? true : false} onClick={handleNext} ><i className="bi bi-arrow-right-square"></i>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col d-flex justify-content-center">
                                                Showing Page {page.currentPage} out of {page.numberOfPage}
                                            </div>
                                        </div>
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
            <div className="modal fade" id="reviewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Provide Review ...</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Message:</label>
                                <select className="form-select" onChange={(e) => { setReview({ ...review, subjectId: e.currentTarget.value }) }}>
                                    <option value={"select"}>- Select Subject -</option>
                                    {
                                        tutor.subjects ?
                                            tutor.subjects.map(s => (<option value={s.SUBJECT_ID} key={s.SUBJECT_ID}>{s.SUBJECT_NAME}</option>))
                                            : null
                                    }
                                </select>

                                <label htmlFor="message-text" className="col-form-label">Ratning:</label>
                                <select className="form-select" onChange={(e) => { setReview({ ...review, rating: e.currentTarget.value }) }}>
                                    <option value={"1"}>- 1 -</option>
                                    <option value={"2"}>- 2 -</option>
                                    <option value={"3"}>- 3 -</option>
                                    <option value={"4"}>- 4 -</option>
                                    <option value={"5"}>- 5 -</option>
                                </select>

                                <label htmlFor="message-text" className="col-form-label">Message:</label>
                                <textarea className="form-control"
                                    value={review.review}
                                    onChange={(e) => { setReview({ ...review, review: e.currentTarget.value }) }} id="messageText">
                                </textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmitReview}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewTutor;