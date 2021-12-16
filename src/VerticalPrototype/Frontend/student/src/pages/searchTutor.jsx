import "../css/searchTutor.css";
import axios from "axios";

import { useState, useEffect } from "react";

const SearchTutors = () => {
    const [tutors, setTutors] = useState(Alltutors);
    const [searchTerm, setsearchTerm] = useState("");
    const [sortBy, setsortBy] = useState("default");
    useEffect(() => {
        axios.get("http://localhost:4000/api/tutors").then((response) => {
            setTutors(response.data);
        });
    }, []);

    const setData = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:4000/api/tutors?searchTerm=${searchTerm}&sortBy=${sortBy}`).then((response) => {
            setTutors(response.data);
        });
    }


    return (
        <>
            <div className="container mb-2">
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-12 col-lg-2 my-3">
                        <select onChange={(e) => { setsortBy(e.target.value) }} className="form-select">
                            <option value={"default"}> Sort By </option>
                            <option value={"rating"}>Ratings</option>
                            <option value={"price"}>Price</option>
                        </select>
                    </div>
                    <div className="col-sm-12 col-lg-9 my-3">
                        <form onSubmit={setData}>
                            <div style={{ float: "left", width: "70%", marginRight: "2%" }}>
                                <input type="search" className="form-control rounded" value={searchTerm} onChange={(e) => { setsearchTerm(e.target.value) }} placeholder="Search" aria-label="Search"
                                    aria-describedby="search-addon" />
                            </div>
                            <div>
                                <button className="btn btn-outline-primary">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row d-flex justify-content-center">
                    {
                        tutors.map(tutor => {
                            return (
                                <div className="card m-2 tutorCards" key={tutor.USER_ID} style={{ width: "18rem" }}>
                                    <img src="./tutorImage.jpg" className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{tutor.NAME}</h5>
                                        <p className="card-text m-1"><b>Subjects :</b> {tutor.SUBJECT_NAME}</p>
                                        <p className="card-text m-1"><b>Price :</b> {tutor.price}</p>
                                        <p className="card-text m-1"><b>Ratings :</b> {tutor.AVERAGE_RATING}</p>
                                    </div>
                                    <button className="btn btn-outline-primary mb-3">Book Now</button>
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