import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import $ from 'jquery';
import 'datatables.net';

const StudentList = () => {
    let navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [cookies, setCookie] = useCookies(['user']);
    const [msg, setMsg] = useState("");
    const [banID, setbanID] = useState("");

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getEnrolledStudents`, { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then((response) => {
                console.log(response.data)
                setStudents(response.data);
                $(document).ready(function () {
                    $('#students').dataTable({
                        responsive: true,
                    });
                });
            })
            .catch((error) => {
                console.log(console.error);
            });

    }

    const renderDate = (d) => {
        const registrationDate = new Date(d);
        return (
            registrationDate.getDate().toString() + "." +
            (registrationDate.getMonth() + 1).toString() + "." +
            registrationDate.getFullYear().toString()
        );
    }

    const handleBan = () => {
        const ban = {
            reason: msg,
            moderatorId: cookies.userid,
            userId: banID
        }

        console.log(ban);

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/banProfile`,
            ban,
            { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then(response => {
                if (response.status === 200) {
                    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getEnrolledStudents`, { headers: { "Authorization": `Bearer ${cookies.token}` } })
                        .then((response) => {
                            setStudents(response.data);
                        })
                        .catch((error) => {
                            console.log(console.error);
                        });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.css"></link>
            <div className="container mt-3">
                <div className="row">
                    <div className="container mt-1 mb-3">
                        <h3>Students</h3>
                    </div>
                </div>
                <hr />
                <div className="card">
                    <div className="card-body">
                        {students.length > 0 ?
                            <table className="table table-hover mt-1" id="students">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col" style={{ textAlign: "center" }}>Name</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Email ID</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Registred At</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Is Banned</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map(student => (

                                            <tr key={student.USER_ID}>
                                                <td>
                                                    <img src={`${process.env.REACT_APP_PROFILE_URL}${student.IMAGE}`} style={{ width: "65px", height: "65px", borderRadius: "50%" }} alt="avatar" />
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    {student.NAME}
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    {student.EMAIL}
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    {renderDate(student.REGISTERED_AT)}
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    {student.HAS_PERMISSION ? "No" : "Yes"}
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <button className='btn btn-outline-danger' onClick={() => { setbanID(student.USER_ID) }} data-bs-toggle="modal" data-bs-target="#banModal">Ban</button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table> :
                            <div className="card-body">
                                <div className="container d-flex justify-content-center my-5">
                                    <h3>No Students Availabe</h3>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="modal fade" id="banModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Reason for banning ...</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Reason:</label>
                                <textarea className="form-control"
                                    value={msg}
                                    onChange={(e) => { setMsg(e.currentTarget.value) }} id="messageText"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleBan}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default StudentList;