import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import $ from 'jquery';
import 'datatables.net';

const ApprovedTutors = () => {
    let navigate = useNavigate();
    const [tutors, setTutors] = useState([]);
    const [cookies, setCookie] = useCookies(['user']);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/approvedTutors`, { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then((response) => {
                setTutors(response.data);
                $(document).ready(function () {
                    $('#approvedTutors').dataTable({
                        responsive: true,
                    });
                });
            })
            .catch((error) => {
                console.log(console.error);
            });

    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/viewTutorProfile/${e.currentTarget.id}`)
    }

    return (
        <>
            <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.css"></link>
            <div className="container mt-3">
                <div className="row">
                    <div className="container mt-1 mb-3">
                        <h3>Tutors</h3>
                    </div>
                </div>
                <hr />
                <div className="card">
                    <div className="card-body">
                        {tutors.length > 0 ?
                            <table className="table table-hover mt-1" id="approvedTutors">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" style={{ textAlign: "center" }}>Name</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Is Banned</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tutors.map(tutor => (

                                            <tr key={tutor.USER_ID}>
                                                <td>
                                                    <img src={tutor.IMAGE ? `${process.env.REACT_APP_PROFILE_URL}${tutor.IMAGE}` : null} style={{ width: "65px", height: "65px", borderRadius: "50%" }} alt="avatar" />
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    {tutor.NAME}
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    {tutor.HAS_PERMISSION ? "No" : "Yes"}
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <button className="btn btn-outline-dark" onClick={handleClick} id={tutor.USER_ID}>View Profile</button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table> :
                            <div className="card-body">
                                <div className="container d-flex justify-content-center my-5">
                                    <h3>No approved tutors available</h3>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default ApprovedTutors;