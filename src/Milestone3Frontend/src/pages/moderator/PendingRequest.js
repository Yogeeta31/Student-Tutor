import { useState } from "react";
const Data = [
    {
        id: 1,
        img: "https://bootdey.com/img/Content/avatar/avatar1.png",
        name: "Pratik Kakadiya",
        timestame: "20/12/21"
    },
    {
        id: 2,
        img: "https://bootdey.com/img/Content/avatar/avatar2.png",
        name: "Yogeeta Sharma",
        timestame: "20/12/21"
    },
    {
        id: 3,
        img: "https://bootdey.com/img/Content/avatar/avatar3.png",
        name: "Mohit Dalal",
        timestame: "20/12/21"
    },
    {
        id: 4,
        img: "https://bootdey.com/img/Content/avatar/avatar1.png",
        name: "Mohammad Afwan",
        timestame: "20/12/21"
    },
    {
        id: 6,
        name: "Ankit Anand",
        img: "https://bootdey.com/img/Content/avatar/avatar2.png",
        timestame: "20/12/21"
    },
];

const PendingRequest = () => {
    const [tutors, setTutors] = useState(Data);

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

                                <tr key={tutor.id}>
                                    <td>
                                        <img src={tutor.img} style={{ maxWidth: "65px", borderRadius: "50%" }} alt="avatar" />
                                    </td>
                                    <td>
                                        {tutor.name}
                                    </td>
                                    <td>
                                        {tutor.timestame}
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-dark" id={tutor.id}>View Profile</button>
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