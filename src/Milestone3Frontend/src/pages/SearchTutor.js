import "../css/searchTutor.css";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const SearchTutors = () => {

    const [tutors, setTutors] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
    const [sortBy, setsortBy] = useState("default");
    const [page, setPage] = useState({ currentPage: 1, step: 12, numberOfPage: 0, data: [] });
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/search/tutors`)
            .then(response => {
                setTutors(response.data);
                setPage({ ...page, numberOfPage: Math.ceil(response.data.length / page.step), data: response.data.slice(0, page.step) });
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const loadData = (sT, sB) => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/search/tutors?searchTerm=${sT}&sortBy=${sB}`)
            .then(response => {
                setTutors(response.data);
                setPage({ ...page, numberOfPage: Math.ceil(response.data.length / page.step), data: response.data.slice(0, page.step), currentPage: 1 });

            })
            .catch(err => {
                console.log(err);
            })
    }

    const onSelectChange = (e) => {
        setsortBy(e.target.value);
        loadData(searchTerm, e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loadData(searchTerm, sortBy)
    }
    const onViewTutor = (e) => {

        navigate(`/viewtutor/${e.currentTarget.id}`);
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

    const handleNext = () => {
        if (page.currentPage + 1 <= page.numberOfPage) {
            let start = page.currentPage * page.step;
            let stop = tutors.length > ((page.currentPage * page.step) + page.step) ? (page.currentPage * page.step) + page.step : tutors.length;
            setPage({ ...page, currentPage: page.currentPage + 1, data: tutors.slice(start, stop) })
        }
    }
    const handlePrev = () => {
        if (page.currentPage - 1 > 0) {
            let start = (page.currentPage * page.step) - (page.step * 2) < 0 ? 0 : (page.currentPage * page.step) - (page.step * 2);
            let stop = page.currentPage * page.step - page.step;
            setPage({ ...page, currentPage: page.currentPage - 1, data: tutors.slice(start, stop) })
        }
    }

    return (
        <>
            <div className="container mb-2">
                <form onSubmit={handleSubmit}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-sm-12 col-lg-2 my-3">
                            <select className="form-select" onChange={onSelectChange}>
                                <option value="default"> Sort By </option>
                                <option value="ratings">Ratings</option>
                                <option value="price">Price</option>
                            </select>
                        </div>
                        <div className="col-sm-12 col-lg-9 my-3">

                            <div style={{ float: "left", width: "70%", marginRight: "2%" }}>
                                <input type="search" className="form-control rounded"
                                    value={searchTerm}
                                    onChange={(e) => { setsearchTerm(e.target.value) }}
                                    placeholder="Search" aria-label="Search"
                                    aria-describedby="search-addon" />
                            </div>
                            <div>
                                <button className="btn btn-outline-dark" style={{ backgroundColor: "white", color: "black" }}>Search</button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
            <div className="container">
                <div className="row">
                    {
                        page.data.map(tutor => {
                            return (
                                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={tutor.SUBJECT_ID}>
                                    <div className="card sl">
                                        <div className="card-image">
                                            <img style={{ height: "250px", width: "300px" }} src={`${process.env.REACT_APP_PROFILE_URL}${tutor.IMAGE}`} alt="TutorImage" />
                                        </div>
                                        <div className="card-heading">
                                            {tutor.NAME}
                                        </div>
                                        <div className="card-text">
                                            <b style={{ color: "black" }}>Subject</b> - {tutor.SUBJECT_NAME}
                                        </div>
                                        <div className="card-text">
                                            € {tutor.PRICE}/hour
                                        </div>
                                        <div className="card-text mb-2">
                                            {renderRating(0)}
                                        </div>
                                        <button className="card-button" id={tutor.USER_ID} onClick={onViewTutor}>View Tutor</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
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
                    <div className="col d-flex justify-content-center mb-3">
                        Showing Page {page.currentPage} out of {page.numberOfPage}
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchTutors;