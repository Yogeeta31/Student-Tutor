import "../css/home.css"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const FeedbackList = [
    {
        id: 1,
        subject: "Maths",
        text: "He is not teaching good maths",
        by: "Pratik Kakadiya"
    },
    {
        id: 2,
        subject: "Maths",
        text: "He is not teaching good maths",
        by: "Mohit Dalal"
    },
    {
        id: 3,
        subject: "Maths",
        text: "He is not teaching good maths",
        by: "Yogeeta Sharma"
    }
]

const ViewTutor = () => {
    let navigate = useNavigate();
    const [feedbacks, setFeedback] = useState(FeedbackList);

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
                                            <h4>Ankit Anand</h4>
                                            <p className="text-secondary mb-1">I am not so good tutor</p>
                                            <p className="text-secondary mb-1">Teaching Since an hour ago</p>
                                            <p className="text-secondary mb-1">Subjects - Maths, Science, Drawing</p>
                                            <button className="btn btn-outline-primary" onClick={onMessageClick}>Message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            {/* <div className="card mb-3 rounded">
                                <div className="card-body">
                                    <div className="row">
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
                                    <hr />
                                </div>
                            </div> */}
                            <div className="card mb-3 rounded">
                                <div className="card-body">
                                    <div className="d-flex justify-content-center">
                                        <h5 className="d-flex align-items-center mb-3">Recent Reviews</h5>
                                    </div>
                                    {
                                        feedbacks.map(feedback => (
                                            <div className="card shadow rounded" key={feedback.id}>

                                                <div className="card-body">
                                                    <blockquote className="blockquote mb-0">
                                                        <p>{feedback.text}</p>
                                                        <footer className="blockquote-footer">{feedback.by}</footer>
                                                    </blockquote>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
export default ViewTutor;