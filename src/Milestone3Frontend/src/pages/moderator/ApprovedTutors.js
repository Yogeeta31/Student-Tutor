import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ApprovedTutors = () => {
    let navigate = useNavigate();
    const [tutors, setTutors] = useState([]);
    const [cookies, setCookie] = useCookies(['user']);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/approvedTutors`, { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then((response) => {
                setTutors(response.data);
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

            <div className="container mt-3">
                <div className="row">
                    <div className="container mt-1 mb-3">
                        <h3>Change in Information</h3>
                    </div>
                </div>
                <hr />
                <table className="table table-hover mt-1">
                    <tbody>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th></th>
                        </tr>
                        {
                            tutors.map(tutor => (

                                <tr key={tutor.USER_ID}>
                                    <td>
                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" style={{ maxWidth: "65px", borderRadius: "50%" }} alt="avatar" />
                                    </td>
                                    <td>
                                        {tutor.NAME}
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-dark" onClick={handleClick} id={tutor.USER_ID}>View Profile</button>
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default ApprovedTutors;