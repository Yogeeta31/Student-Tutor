import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
const LogOut = () => {
    const [user, setUser] = useContext(LoginContext);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    useEffect(() => {
        removeCookie("userid");
        removeCookie("token");
        removeCookie("role");
        setUser({});
        navigate("/");
    })
    return (<></>)
}
export default LogOut;