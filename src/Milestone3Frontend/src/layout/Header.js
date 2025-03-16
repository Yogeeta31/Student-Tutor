import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import NotificationModal from "../pages/tutor/NotificationModal";
import "../css/header.css";

const Header = () => {
  const [user] = useContext(LoginContext);

  const renderMenue = (role) => {
    if (!role) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/searchTutors">
              Search Tutor
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/aboutus">
              About us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contactus">
              Contact us
            </Link>
          </li>
        </>
      );
    } else if (role === "student") {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/searchTutors">
              Search Tutor
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/chats">
              Chats
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/aboutus">
              About us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contactus">
              Contact us
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-gear-fill"></i>
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to="/student/editProfile">
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Log out
                </Link>
              </li>
            </ul>
          </li>
        </>
      );
    } else if (role === "tutor") {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/viewmessagerequest">
              Message Requests
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/chats">
              Chats
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="modal"
              data-bs-target="#notificationModal"
              to="#"
            >
              Notification
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-gear-fill"></i>
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to="/tutor/editProfile">
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Log out
                </Link>
              </li>
            </ul>
          </li>
        </>
      );
    } else if (role === "moderator") {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/students">
              Students
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/approvedtutors">
              Tutors
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pendingrequests">
              Pending Requests
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/changerequests">
              Change Request
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-gear-fill"></i>
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to="/logout">
                  Log out
                </Link>
              </li>
            </ul>
          </li>
        </>
      );
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MentorMe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div
              style={{ marginLeft: "20px", color: "white", fontSize: "10px" }}
            >
              Fulda University of Applied Science.
              <br />
              Engineering Project, Year 2022 for Demonstration.
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {renderMenue(user.role)}
              {!user.isAuth ? (
                <Link className="nav-link" to="/login">
                  Log in
                </Link>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <NotificationModal />
    </>
  );
};
export default Header;
