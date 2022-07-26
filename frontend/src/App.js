import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Register from "./views/Register";
import Login from "./views/Login";
import Products from "./views/Products";
import "./App.css";
import Contact from "./views/Contact";
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
//     if (!isLoggedIn) {

//         if (showLogin) {
//             return <Login currentCustomerId={currentCustomerId} token={token} logout={logout}  setShowLogin={setShowLogin} login={login} />
//         } else {
//             return <Register setShowLogin={setShowLogin} login={login} />
//         }

//    }else{
//     return( 
//     <div>
//     <Products currentCustomerId={currentCustomerId} token={token} logout={logout}  />
//     <Contact />
//     </div>
//     )
    

//     }





// return(
//         <Router>
//                     <nav className="nav">
//                         <div className="nav-brand">Logo</div>
//                         <ul className="nav-items">
//                         <li className="nav-item">
//                                 <Link to="/login">Login</Link>
//                         </li>
//                         <li className="nav-item">
//                                 <Link to="/register">Register</Link>
//                         </li>
//                         <li className="nav-item">
//                                 <Link to="/Products">upload new Product</Link>
//                         </li>
//                         </ul>
//                     </nav>
//                     <Switch>
//                 {/* {  (!isLoggedIn) && (showLogin) && (  */}
//                     <Route  path="/login">
//                         <Login currentCustomerId={currentCustomerId} token={token} logout={logout}  setShowLogin={setShowLogin} login={login} />
//                     </Route>
                    
//                     {/* )  */}
//                 {/* (!showLogin) && ( */}
                    
//                     <Route path="/register">
//                         <Register setShowLogin={setShowLogin} login={login} />
//                     </Route> 
//                     {/* ) */}
                

//                 {/* (isLoggedIn) && ( */}
//                     <Route  path="/products">
//                         <Products currentCustomerId={currentCustomerId} token={token} logout={logout} />
//                     </Route>  
//                     {/* ) 
//                     } */}
//                         </Switch>
                   
//          </Router>
    
// )
    


                





















// return(
// <div>
//     <Router>
//                 <nav className="nav">
//                     <div className="nav-brand">Logo</div>
//                     <ul className="nav-items">
//                     <li className="nav-item">
//                             <Link to="/login">Login</Link>
//                     </li>
//                     <li className="nav-item">
//                             <Link to="/register">Register</Link>
//                     </li>
//                     <li className="nav-item">
//                             <Link to="/Products">upload new Product</Link>
//                     </li>
//                     </ul>
//                 </nav>
//                 <Switch>
                     
//                 <Route  path="/login">
//                     <Login currentCustomerId={currentCustomerId} token={token} logout={logout}  setShowLogin={setShowLogin} login={login} />
//                 </Route> 
//                 <Route path="/register">
//                     <Register setShowLogin={setShowLogin} login={login} />
//                 </Route> 

//                 <Route  path="/products">
//                     <Products currentCustomerId={currentCustomerId} token={token} logout={logout} />
//                 </Route>  
//                     </Switch>
               
//             </Router>


//             </div>
// )

}

export default App;