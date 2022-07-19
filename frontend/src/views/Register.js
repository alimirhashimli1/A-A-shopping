import React, { useState } from "react";

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
      password: password,
      emailAddress: emailAddress,
     // isAdmin: isAdmin
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
    <div>
      <h1>Register</h1>

      <form onSubmit={registerUser}>
        <div>
          <label>User Name</label>
          <input name="userName" onChange={updateData} value={userName} minLength={3} maxLength={15} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" onChange={updateData} value={password} />
        </div>
        <div>
          <label>Email Address</label>
          <input name="emailAddress" onChange={updateData} value={emailAddress} />
        </div>

        <button>Sign Up</button>
      </form>

      <button onClick={updateShowLogin}>Account Is There</button>
    </div>
  )
}

export default Register;