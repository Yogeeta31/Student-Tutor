import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import 'datatables.net';

const PendingRequest = () => {
    const [tutors, setTutors] = useState([]);
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();

    const loadData = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/notVerifiedTutors`, { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then((response) => {
                setTutors(response.data);
                $(document).ready(function () {
                    $('#pendingTutors').dataTable({
                        responsive: true,
                    });
                });
            })
            .catch((error) => {
                console.log(console.error);
            });
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/viewTutorProfile/${e.currentTarget.id}`)
    }
    const renderDate = (d) => {
        const registrationDate = new Date(d);
        return (
            registrationDate.getDate().toString() + "." +
            (registrationDate.getMonth() + 1).toString() + "." +
            registrationDate.getFullYear().toString()
        );
    }

    return (
        <>
            <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.css"></link>
            <div className="container mt-3">
                <div className="row">
                    <div className="container mt-1 mb-3">
                        <h3>New Tutors</h3>
                    </div>
                </div>
                <hr />
                <div className="card">
                    <div className="card-body">
                        {tutors.length > 0 ?
                            <table className="table table-hover mt-1" id="pendingTutors">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Requested Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tutors.map(tutor => (

                                            <tr key={tutor.USER_ID}>
                                                <td>
                                                    <img src={`${process.env.REACT_APP_PROFILE_URL}${tutor.IMAGE}`} style={{ width: "65px", height: "65px", borderRadius: "50%" }} alt="avatar" />
                                                </td>
                                                <td>
                                                    {tutor.NAME}
                                                </td>
                                                <td>
                                                    &nbsp;{renderDate(tutor.UPDATED_DATE)}
                                                </td>
                                                <td>
                                                    <button className="btn btn-outline-dark" onClick={handleClick} id={tutor.USER_ID}>View Profile</button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table> :
                            <div className="card-body">
                                <div className="container d-flex justify-content-center my-5">
                                    <h3>No Pending Requests</h3>
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </>
    )

}
export default PendingRequest;