import { Link } from "react-router-dom";
import "../css/header.css";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MentorMe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/searchTutors">Search Tutor</Link>
                        <Link className="nav-link" to="/aboutus">About us</Link>
                        <Link className="nav-link" to="/contactus">Contact us</Link>
                    </div>
                    <div style={{ marginLeft: "20px", color: "white" }}>
                        Fulda University of Applied Science.<br />
                        Engineering Project. Fall 2021 for Demonstration.
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Header;