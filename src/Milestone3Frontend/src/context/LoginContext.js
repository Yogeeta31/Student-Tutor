import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const LoginContext = createContext();

export const LoginStateProvider = (props) => {
    const [user, setUser] = useState({});
    const [cookies] = useCookies(['user']);

    useEffect(() => {
        let role = cookies.role;
        let loginStatus = cookies.role ? true : false;

        if (role !== null) {
            setUser({
                userID: cookies.userid,
                role: cookies.role,
                isAuth: loginStatus
            });
        }
    }, []);
    return (
        <LoginContext.Provider value={[user, setUser]}>
            {props.children}
        </LoginContext.Provider>
    )
}