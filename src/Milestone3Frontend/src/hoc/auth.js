import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoute = (props) => {
    const [cookies, setCookie] = useCookies(['user']);
    function authentication() {
        let role = cookies.role;
        let loginStatus = cookies.role ? true : false;
        return {
            role: role,
            loginStatus: loginStatus
        };
    }

    let loginInfo = authentication();

    if (loginInfo.loginStatus && loginInfo.role === props.role)
        return <props.component></props.component>
    else
        return <Navigate to="/" />
}
export default PrivateRoute
