import "../css/home.css"
import { useNavigate } from 'react-router-dom';
import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const ViewTutor = (props) => {
    let navigate = useNavigate();
    const [tutor, setTutor] = useState({});
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
        console.log(cookies.token);
        if (cookies.token !== undefined) {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getTutorDetails?userID=${window.location.href.toString().split("/")[4]}`, { headers: { "Authorization": `Bearer ${cookies.token}` } })
                .then(response => {
                    setTutor(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else
            navigate('/login');

    }, [])



    const renderRating = (n) => {
        if (n === 0) {
            return (
                <div className="small-ratings">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </div>
            )
        }
        if (n === 1) {
            return (
                <div className="small-ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </div>
            )
        }
        if (n === 2) {
            return (
                <div className="small-ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </div>
            )
        }
        if (n === 3) {
            return (
                <div className="small-ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </div>
            )
        }
        if (n === 4) {
            return (
                <div className="small-ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i>
                </div>
            )
        }
        if (n === 5) {
            return (
                <div className="small-ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
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
    const onMessageClick = () => {
        navigate(`/chat/1`);
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
                                            <h4>{tutor.NAME}</h4>
                                            <p className="text-secondary mb-1">{tutor.BIO}</p>
                                            <p className="text-secondary mb-1">
                                                Teaching Since {renderDate()}
                                            </p>
                                            <button className="btn btn-outline-primary mt-1" onClick={onMessageClick}>Message</button>
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
                                    {/* <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            Kenneth Valdez
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">About</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            I am not so good tutor.
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Subjects</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            Maths, Science, Python
                                        </div>
                                    </div>
                                    <hr /> */}
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
        </>
    )
}
export default ViewTutor;