import React, { useState } from "react";
import "./Register.css"
const Register = props => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  //const [isAdmin, setIsAdmin] = useState(false);

  const updateData = event => {
    switch (event.target.name) {
      case "userName":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "emailAddress":
        setEmailAddress(event.target.value);
        break;
      default:
        break;
    }
  }
  const registerUser = async event => {
    event.preventDefault();
    const newCustomer = {
      userName: userName,
      emailAddress: emailAddress,
      password: password
    
    }
    const settings = {
      method: "POST",
      body: JSON.stringify(newCustomer),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/register", settings);
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
      alert(err.message);
    }
  }

  const updateShowLogin = () => {
    props.setShowLogin(true);
  }

  return (
    <div className="">
      <h1 className="register-header">Register</h1>
<div className="register-frame">
<form className="register-form" onSubmit={registerUser}>
        <div>
          <label className="register-label">User Name</label>
          <input className="register-input register-input-user-name " name="userName" onChange={updateData} value={userName} minLength={3} maxLength={15} />
        </div>
        <div>
          <label className="register-label">Password</label>
          <input className="register-input register-input-password" name="password" onChange={updateData} value={password} />
        </div>
        <div>
          <label className="register-label">Email Address</label>
          <input className="register-input" name="emailAddress" onChange={updateData} value={emailAddress} />
        </div>

        <button className='register-signin'>Sign Up</button>
      </form>

      <button className="register-signup" onClick={updateShowLogin}>Account Is There</button>
</div>
     
    </div>
  )
}

export default Register;