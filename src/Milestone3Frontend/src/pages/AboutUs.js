import { useState } from "react";

const d = [
    {
        id: 1,
        name: "Yogeeta Sharma",
        img: "./images/loginIMG.png"
    },
    {
        id: 2,
        name: "Ankit Anand",
        img: "./images/loginIMG.png"
    },
    {
        id: 3,
        name: "Mohit Dalal",
        img: "./images/loginIMG.png"
    },
    {
        id: 4,
        name: "Pratik Kakadiya",
        img: "./images/loginIMG.png"
    },
    {
        id: 5,
        name: "Mohammed Afwan",
        img: "./images/loginIMG.png"
    },
    {
        id: 6,
        name: "Bibek Gaihre",
        img: "./images/loginIMG.png"
    },
    {
        id: 7,
        name: "Omar Ibrahim",
        img: "./images/loginIMG.png"
    },
    {
        id: 8,
        name: "Ahmed Estaitia",
        img: "./images/loginIMG.png"
    }
]

const AboutUs = () => {
    const [data, setData] = useState(d);
    return (
        <>
            <div className="row mt-3">
                <h3>Team Members</h3>
            </div>
            <div className="row mt-3">
                {
                    data.map(person => {
                        return (
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={person.id}>
                                <div className="card sl">
                                    <div className="card-image">
                                        <center className="mt-1">
                                            <img style={{ height: "200px", width: "200px" }} src={person.img} alt="ProfileImage" />
                                        </center>
                                    </div>
                                    <div className="card-heading">
                                        {person.name}
                                    </div>
                                    {/* <div className="card-text">
                                        <b style={{ color: "black" }}>Subject</b> - {tutor.SUBJECT_NAME}
                                    </div> */}
                                    <button className="card-button" id={person.id}>View Profile</button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}
export default AboutUs;