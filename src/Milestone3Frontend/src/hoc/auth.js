import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoute = (props) => {
    const [cookies, setCookie] = useCookies(['user']);

    function authentication() {
        let role = cookies.role;
        let loginStatus = cookies.role !== undefined ? true : false;
        return {
            role: role,
            loginStatus: loginStatus
        };
    }

    let loginInfo = authentication();

    if (loginInfo.loginStatus && props.role.includes(loginInfo.role))
        return <props.component></props.component>
    else if (loginInfo.loginStatus && !props.role.includes(loginInfo.role))
        return <Navigate to="/errorpage" />
    else
        return <Navigate to="/login" />
}
export default PrivateRoute
