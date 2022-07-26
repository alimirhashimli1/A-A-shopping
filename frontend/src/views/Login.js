import React, { useEffect, useState } from "react";


const Login = props => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [product2, setProduct2] = useState([]);


    
  useEffect(  ()=>{
    const getProducts = async () => {
        
  
        const settings = {                
            credentials: "include"
        }
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/login`, settings);
            const parsedRes = await response.json();
            try {
                if (response.ok) {
                    setProduct2(parsedRes);
                   
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


      <div>
      <div className="contentContiner">
<h2>Current Products</h2>
<ul className="General">
    {
        




        product2.map(product => {
                            return <li className="content" key={product._id} id={product._id}> 
                            <img className="productImg" src={product.productImage.avatar} alt="productPhoto" /><br></br>
                            {product.productName}<br></br>{product.productDescription}<br></br>{product.price}
                            {/* <span onClick={deleteOneProduct}>X</span> */}
                            </li>
                        })
    }
</ul>
</div>
</div>



    </div>
  )
}

export default Login;