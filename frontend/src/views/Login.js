import React, { useEffect, useState } from "react";
import "./Login.css"
import PayButton from "../components/PayButton"

const Login = props => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
 

    
  useEffect(  ()=>{
    const getProducts = async () => {
        
  
        const settings = {                
            credentials: "include"
        }
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/login`, settings);
            const parsedRes = await response.json();
            try {
                if (response.ok) {
                  if(props.cart){
          <PayButton cart ={props.cart} isLoggedIn = {props.isLoggedIn} currentCustomerId={props.currentCustomerId} />
                  }
                   
                } else {
                    throw new Error(parsedRes.message);
                }
            } catch (err) {
                alert(err.message);
            }
    
    }
    getProducts();
   }, [])






  const updateData = event => {
    switch (event.target.name) {
      case "emailAddress":
        setEmailAddress(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  }

  const attemptLogin = async event => {
    event.preventDefault();
    const loginData = {
      emailAddress: emailAddress,
      password: password
    }
    const settings = {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }

    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/login", settings);
    const parsedRes = await response.json();

    try {
      if (response.ok) {


        const now = new Date();
        const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60);

       
        localStorage.setItem("data", JSON.stringify({ token: parsedRes.token, id: parsedRes.id, expiry: tokenExpiry.toISOString() }));
        props.login(parsedRes.token, parsedRes.id);

        
       
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message)
      setEmailAddress("");
      setPassword("");
    }
  }

  const updateShowLogin = () => {
    props.setShowLogin(false);
  }

  return (
    
    
    <section className="login-main">
<h1 className="login-title">Login</h1>


<div className="login-container">
      

      <form onSubmit={attemptLogin}>
        <div className="email-login">
          <label className="login-label">Email Address</label>
          <input className="login-email" name="emailAddress" onChange={updateData} value={emailAddress} />
        </div>
        <div>
          <label className="login-label">Password</label>
          <input className="login-password" name="password" type="password" onChange={updateData} value={password} />
        </div>

        <button className="login-signin">Sign In</button>
      </form>

      <button className="login-signup" onClick={updateShowLogin}>Sign Up</button>


      <div>
      
</div>
    </div>
    </section>
    
  )
}

export default Login;