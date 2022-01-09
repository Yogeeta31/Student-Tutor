import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const PendingRequest = () => {
    const [tutors, setTutors] = useState([]);
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();

    const loadData = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/notVerifiedTutors`, { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then((response) => {
                setTutors(response.data);
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
        console.log(e.currentTarget.id);
    }

    return (
        <>

            <div className="container mt-3">
                <div className="row">
                    <div className="container mt-1 mb-3">
                        <h3>New Tutors</h3>
                    </div>
                </div>
                <hr />
                <table className="table table-hover mt-1">
                    <tbody>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Requested Date</th>
                            <th></th>
                        </tr>


                        {
                            tutors.map(tutor => (

                                <tr key={tutor.USER_ID}>
                                    <td>
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" style={{ maxWidth: "65px", borderRadius: "50%" }} alt="avatar" />
                                    </td>
                                    <td>
                                        {tutor.NAME}
                                    </td>
                                    <td>
                                        {tutor.UPDATED_DATE}
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
export default PendingRequest;