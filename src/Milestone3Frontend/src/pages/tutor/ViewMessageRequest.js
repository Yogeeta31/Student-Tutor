import { useState } from "react";
const Messgaes = [
    {
        id: 1,
        img: "https://bootdey.com/img/Content/avatar/avatar1.png",
        name: "Pratik Kakadiya",
        msg: "Hello"
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
const ViewMessageRequest = () => {
    const [messages, setMessages] = useState(Messgaes);
    return (
        <div className="container my-3 shadow" style={{ backgroundColor: "white" }}>
            <div className="row">
                <h3 className="mt-3">&nbsp;&nbsp;Message Request</h3>
            </div>
            <hr />



            {
                messages.map(message => (

                    <div class="card mb-3 shadow" key={message.id}>
                        <div class="row g-0">
                            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-2 offset-xs-2 offset-sm-4 offset-md-0">
                                <img
                                    src={message.img}
                                    alt="StudentImage"
                                    class="img-fluid rounded-start"
                                    style={{ maxWidth: "170px", maxHeight: "170p" }}
                                />
                            </div>
                            <div class="col-xs-12 col-sm-8 col-md-8 col-lg-9 col-xl-10 offset-xs-2 offset-sm-4 offset-md-0">
                                <div class="card-body">
                                    <h5 class="card-title">{message.name}</h5>
                                    <p class="card-text" style={{ color: "black" }}>
                                        I really don't want to study from you beacuse you are annyoing with yor ringtones. Bye Don't take care.
                                    </p>
                                    <button className="btn btn-outline-success" id={message.id}>Approve</button>&nbsp;&nbsp;
                                    <button className="btn btn-outline-danger" id={message.id}>Disapprove</button>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
            }

        </div>
    )
}

export default ViewMessageRequest;