import React, { useState } from "react";

const Login = props => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  
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
    <div>
      <h1>Login</h1>

      <form onSubmit={attemptLogin}>
        <div>
          <label>Email Address</label>
          <input name="emailAddress" onChange={updateData} value={emailAddress} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" onChange={updateData} value={password} />
        </div>

        <button>Sign In</button>
      </form>

      <button onClick={updateShowLogin}>First Sign Up</button>
    </div>
  )
}

export default Login;