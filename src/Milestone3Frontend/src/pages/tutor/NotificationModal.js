import { useState, useEffect } from "react";

const nt = [
    { id: 1, msg: "Hello" },
    { id: 2, msg: "Hello" },
    { id: 3, msg: "Hello" },
    { id: 4, msg: "Hello" },
]

const NotificationModal = () => {

    const [notifications, setNotification] = useState([]);

    useEffect(() => {
        setNotification(nt);
    }, [])

    return (
        <div className="modal fade" id="notificationModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Notification <i className="bi bi-bell"></i></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            notifications.map((n) => (
                                <div className="card shadow" key={n.id}>
                                    <div className="card-body">
                                        {n.msg}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NotificationModal;