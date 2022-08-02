import React, { useEffect, useState } from "react";
import Register from "./views/Register";
import Login from "./views/Login";
import Products from "./views/Products";
import Cart from "./views/Cart";
import Logo from "./views/Logo"
import "./App.css";
import Contact from "./views/Contact";
import About from "./views/About";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Carousel from "./views/Carousel";
import Footer from "./views/Footer";
const App = () => {

    



    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentCustomerId, setCurrentCustomerId ] = useState("");
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
        setCurrentCustomerId(id);
        setIsLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem("data");
        setToken(false);
        setCurrentCustomerId("");
        setIsLoggedIn(false);
        setShowLogin(true);
    }

    return (
    <>
    <Router>
            
        <main>
            <Routes>
                <Route path="/" exact element={<Carousel />}/>
                <Route path="/products" exact element={<Products currentCustomerId={currentCustomerId} token={token} logout={logout} />}/>
                <Route path="/contact" exact element={<Contact/>}/>
                <Route path="/about" exact element={<About/>}/>
                <Route path="/login" exact element={
                    !isLoggedIn ? showLogin ? <Login currentCustomerId={currentCustomerId} token={token} logout={logout} setShowLogin={setShowLogin} showLogin={showLogin} login={login}/> : <Register setShowLogin={setShowLogin}/> : <Products currentCustomerId={currentCustomerId} token={token} logout={logout} />}
                />
                <Route path="/Cart" exact element={<Cart/>}/>
            </Routes>
        </main>
        <footer>
            <Footer/>
        </footer>

    </Router>
    
    
    </>
    )
  }















export default App;