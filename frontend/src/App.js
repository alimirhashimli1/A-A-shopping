import React, { useEffect, useState } from "react";
import Register from "./views/Register";
import Login from "./views/Login";
import "./App.css";

const App = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentUserId, setCurrentUserId ] = useState("");
    const [ showLogin, setShowLogin ] = useState(true);
    const [ token, setToken ] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("data"));
        if (data && data.token && data.id && data.expiry) { 
            const tokenExpiry = new Date(data.expiry);
            const now = new Date();
            if (tokenExpiry > now) {
                login(data.token, data.id)
            } else {
                logout();
            }           
        } else {
            logout();
        }
    }, [])

    const login = (token, id) => {
        setToken(token);
        setCurrentUserId(id);
        setIsLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem("data");
        setToken(false);
        setCurrentUserId("");
        setIsLoggedIn(false);
        setShowLogin(true);
    }

    if (!isLoggedIn) {

        if (showLogin) {
            return <Login setShowLogin={setShowLogin} login={login} />
        } else {
            return <Register setShowLogin={setShowLogin} login={login} />
        }
   

}}

export default App;