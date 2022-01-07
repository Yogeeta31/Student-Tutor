import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import "../css/header.css";

const Header = () => {
    const [user] = useContext(LoginContext);


    const renderMenue = (role) => {

        if (role === "student" || !role) {
            return (
                <>
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/searchTutors">Search Tutor</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/aboutus">About us</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/contactus">Contact us</Link></li>
                </>
            )
        }
        else if (role === "tutor") {
            return (
                <>
                    <li className="nav-item"><Link className="nav-link" to="/viewmessagerequest">Message Requests</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/chats"><i className="bi bi-chat"></i></Link></li>
                </>
            )

        }
        else if (role === "moderator") {
            return (
                <>
                    <li className="nav-item"><Link className="nav-link" to="/pendingrequests">Pending Requests</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/changerequests">Change Request</Link></li>
                </>
            )

        }
    }
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MentorMe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {renderMenue(user.role)}
                        {
                            !user.isAuth ?
                                <Link className="nav-link" to="/login">Log in</Link> :
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-gear-fill"></i>
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/logout">Log out</Link></li>
                                    </ul>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
        // <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        //     <div className="container-fluid">
        //         <Link className="navbar-brand" to="/">MentorMe</Link>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        //             <div className="navbar-nav">
        //                 {renderMenue(user.role)}
        //                 {
        //                     user.isAuth ?
        //                         <Link className="nav-link" to="/logout">Log out </Link> :
        //                         <Link className="nav-link" to="/login">Log in</Link>
        //                 }

        //             </div>
        //         </div>
        //     </div>
        // </nav >
    )
}
export default Header;