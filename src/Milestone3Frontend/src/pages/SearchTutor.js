import "../css/searchTutor.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Alltutors = [
    {
        id: 1,
        name: "Ankit Anand",
        Subject: "Maths",
        Ratings: 1
    },
    {
        id: 2,
        name: "Pratik Kakadiya",
        Subject: "Maths",
        Ratings: 2
    },
    {
        id: 3,
        name: "Mohit Dalal",
        Subject: "Maths",
        Ratings: 3
    },
    {
        id: 4,
        name: "Yogeeta Sharma",
        Subject: "Maths",
        Ratings: 4
    },
    {
        id: 5,
        name: "Afwan",
        Subject: "Maths",
        Ratings: 5
    },
    {
        id: 6,
        name: "Omar",
        Subject: "Maths",
        Ratings: 3
    },
    {
        id: 7,
        name: "Ahemad",
        Subject: "Maths",
        Ratings: 4
    },
    {
        id: 8,
        name: "Bibek",
        Subject: "Maths",
        Ratings: 2
    }
]

const SearchTutors = () => {

    const [tutors, setTutors] = useState(Alltutors);
    let navigate = useNavigate();

    const onViewTutor = (e) => {
        navigate(`/viewtutor/1`);
    }
    const renderRating = (n) => {
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

    return (
        <>
            <div className="container mb-2">
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-12 col-lg-2 my-3">
                        <select className="form-select">
                            <option> Sort By </option>
                            <option>Ratings</option>
                            <option>Price</option>
                        </select>
                    </div>
                    <div className="col-sm-12 col-lg-9 my-3">
                        <form>
                            <div style={{ float: "left", width: "70%", marginRight: "2%" }}>
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                                    aria-describedby="search-addon" />
                            </div>
                            <div>
                                <button className="btn btn-outline-dark" style={{ backgroundColor: "white", color: "black" }}>Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <div className="card m-2 tutorCards" key={tutor.id} style={{ width: "18rem" }}>
                <img src="./tutorImage.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{tutor.name}</h5>
                    <p className="card-text m-1"><b>Subjects :</b> {tutor.Subject}</p>
                    <p className="card-text m-1"><b>Price :</b> 20</p>
                    <p className="card-text m-1"><b>Ratings :</b> {tutor.Ratings}</p>
                </div>
                <button className="btn btn-outline-primary mb-3" onClick={onViewTutor}>Book Now</button>
            </div> */}

            <div className="container">
                <div className="row">

                    {
                        tutors.map(tutor => {
                            return (
                                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={tutor.id}>
                                    <div className="card sl">
                                        <div className="card-image">
                                            <img src="./tutorImage.jpg" alt="Nothing" />
                                        </div>
                                        <div className="card-heading">
                                            {tutor.name}
                                        </div>
                                        <div className="card-text">
                                            <b style={{ color: "black" }}>Subjects</b> - {tutor.Subject}
                                        </div>
                                        <div className="card-text">
                                            €15/hour
                                        </div>
                                        <div className="card-text mb-2">
                                            {renderRating(tutor.Ratings)}
                                        </div>
                                        <button className="card-button" onClick={onViewTutor}>View Tutor</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default SearchTutors;