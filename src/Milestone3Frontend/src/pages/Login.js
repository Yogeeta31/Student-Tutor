import "../css/login.css";
import { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { LoginContext } from "../context/LoginContext"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(LoginContext);
  const [cookies, setCookie] = useCookies(['user']);
  const [formData, setFormData] = useState({
    emailID: "",
    pass: "",
  });

  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    let user = {
      email: formData.emailID,
      password: formData.pass
    }

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`, user)
      .then((response) => {
        if (response.status === 200) {
          let role;
          if (response.data.role_id === 3)
            role = "student";
          else if (response.data.role_id === 2)
            role = "tutor";
          else if (response.data.role_id === 1)
            role = "moderator"

          setUser({
            userID: response.data.id,
            role: role,
            isAuth: true
          })
          setCookie('userid', response.data.id, { path: '/', maxAge: 1 * 60 * 60 * 24 });
          setCookie('role', role, { path: '/', maxAge: 1 * 60 * 60 * 24 });
          setCookie('token', response.data.token, { path: '/', maxAge: 1 * 60 * 60 * 24 });

          if (role === "tutor")
            navigate("/chats");
          else if (role === "moderator")
            navigate("/pendingrequests")
          else
            navigate("/")
        }
      })
      .catch((error) => {
        if (error.response.status === 400)
          setError("Incorrect Email ID or Password");

      });
  };

  return (
    <>
      <div className="d-flex justify-content-center my-5">
        <div className="loginBox col-xl-4 col-lg-6 col-md-10 col-sm-12 col-xs-12 shadow ">
          <img
            className="user"
            src="./images/loginIMG.png"
            height="100px"
            width="100px"
            alt="LoginImage"
          />
          <h3>Log in</h3>
          <form>
            <div className="inputBox">
              <input
                id="uname"
                type="text"
                name="Username"
                className="form-control"
                placeholder="Username"
                value={formData.emailID}
                onInput={(e) =>
                  setFormData({
                    ...formData,
                    emailID: e.target.value,
                  })
                }
              />
              <input
                id="pass"
                type="password"
                name="Password"
                className="form-control"
                placeholder="Password"
                value={formData.pass}
                onInput={(e) =>
                  setFormData({
                    ...formData,
                    pass: e.target.value,
                  })
                }
              />
            </div>
            <input type="submit" onClick={submit} value="Login" className="my-2" />
          </form>
          <span
            style={{
              fontWeight: "bold",
              color: "red",
              fontSize: "13px",
            }}
          >
            {error}
          </span>
          <Link to="/" className="forgotText">
            Forgot Password
            <br />{" "}
          </Link>
          <div className="text-center">
            <Link to="/signupchoice" className="signUpText">
              Sign-Up
              <br />{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
