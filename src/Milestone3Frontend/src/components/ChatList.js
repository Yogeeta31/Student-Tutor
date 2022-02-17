import { useState } from "react"
import { Link } from "react-router-dom"
import "../css/chatList.css"
const Data = () => [
    {
        id: 1,
        name: "Pratik Kakadiya",
        img: "https://bootdey.com/img/Content/avatar/avatar1.png"
    },
    {
        id: 2,
        name: "Mohit Dalal",
        img: "https://bootdey.com/img/Content/avatar/avatar2.png"
    },
    {
        id: 3,
        name: "Yogeeta Sharma",
        img: "https://bootdey.com/img/Content/avatar/avatar3.png"
    },
    {
        id: 4,
        name: "Ankit Anand",
        img: "https://bootdey.com/img/Content/avatar/avatar2.png"
    },
    {
        id: 5,
        name: "Bibek Gahire",
        img: "https://bootdey.com/img/Content/avatar/avatar1.png"
    },
    {
        id: 6,
        name: "Ahmed Estaitia",
        img: "https://bootdey.com/img/Content/avatar/avatar7.png"
    },
    {
        id: 7,
        name: "Omar Essam",
        img: "https://bootdey.com/img/Content/avatar/avatar1.png"
    },
]

const ChatList = () => {
    const [ListOfPeople, SetListOfPeople] = useState(Data);

    return (

        <>


            <div className="container mt-4">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card">
                            <div id="plist" className="people-list">
                                <ul className="list-unstyled chat-list mt-2 mb-0">
                                    {
                                        ListOfPeople.map(person => (
                                            <Link to={`/chat/${person.id}`} key={person.id} style={{ color: "black" }}>
                                                <li className="clearfix">
                                                    <img src={person.img} alt="avatar" />
                                                    <div className="about">
                                                        <div className="name">{person.name}</div>
                                                    </div>
                                                </li>
                                            </Link>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default ChatList;