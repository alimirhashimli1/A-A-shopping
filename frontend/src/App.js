import React, { useEffect, useState } from "react";
import Register from "./views/Register";
import Login from "./views/Login";
import Products from "./views/Products";
import Contact from "./views/Contact";
import About from "./views/About";
import PayButton from "./components/PayButton"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Carousel from "./views/Carousel";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Header from "./components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Logout from "./components/Logout";
import CheckoutSuccess from "./components/CheckoutSuccess";
import { style } from "react-toastify";

const App = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentCustomerId, setCurrentCustomerId ] = useState("");
    const [ showLogin, setShowLogin ] = useState(true);
    const [ token, setToken ] = useState(false);
    const [show, setShow]= useState(true);
    const [LoginFirst, setLoginFirst] = useState(true)
   const [ cart, setCart]= useState([]);
    // const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
    // const [ cart, setCart]= useState(cartFromLocalStorage);
    const [open, setOpen]= useState(false)




    const handleClick = (product) => {
       
        
        const ProductExist = cart.find((item) => item._id === product._id)
        if(ProductExist){
            setCart(cart.map(item => item._id === product._id
                ? {...ProductExist, quantity: ProductExist.quantity + 1}
                : item)
            );
        }else{
                setCart([...cart, {...product, quantity: 1}]);
            }
            toast.success(`${product.productName} Added to Cart`, {
                position: "bottom-left",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

        
          <ToastContainer
          position="bottom-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />


      

          setShow(true)
      };
      const  handelAddProduct = (product) =>{
        const ProductExist = cart.find((item) => item._id === product._id)
        if(ProductExist){
            setCart(cart.map((item) => item._id === product._id
        ? {...ProductExist, quantity: ProductExist.quantity + 1}
        : item
        ))
      }else{
        setCart([...cart, {...product, quantity: 1}])
      }
     }
     const handleDeleteProduct = (product)=>{
        const ProductExist = cart.find((item) => item._id === product._id)
        if(ProductExist.quantity === 1){
            setCart(cart.filter((item) => item._id !== product._id))
      }else{
        setCart(cart.map((item) => item._id === product._id
        ? {...ProductExist, quantity: ProductExist.quantity - 1}
        : item
        ))
      }
      }

      const handleChange = (item, d) => {
        const ind = cart.indexOf(item);
        const arr = cart;
        arr[ind].amount += d;
        if (arr[ind].amount === 0) arr[ind].amount = 1;
        setCart([...arr]);
      };
      const clearCard = ()=>{
        setCart([])
      }


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("data"));
        //const cartData = JSON.parse(localStorage.getItem("cart"));
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
        localStorage.clear()
        setToken(false);
        setCart([])
        setCurrentCustomerId("");
        setIsLoggedIn(false);
        setShowLogin(true);
        setShow(true)
    }
    return (
    <>
    <Router>
    <header>
    <Header cart={cart} open={open} setOpen={setOpen} setShow={setShow} size={cart.length} isLoggedIn={isLoggedIn} currentCustomerId={currentCustomerId} logout={logout} />
    </header>
        <main>
    
            <Routes>
                <Route path="/" exact element={<Carousel />}/>
                <Route path="/products"  element={ show ? (<Products currentCustomerId={currentCustomerId} open={open} setOpen={setOpen} isLoggedIn={isLoggedIn} login={login} handleClick={handleClick} token={token} cart={cart} logout={logout} />)
                : (<Card cart={cart} open={open} setOpen={setOpen} isLoggedIn={isLoggedIn} currentCustomerId={currentCustomerId} setCart={setCart} clearCard={clearCard}  handleChange={handleChange} handleDeleteProduct={handleDeleteProduct} handelAddProduct={handelAddProduct}  /> 
                )   
                }/>
                <Route path="/contact" exact element={<Contact/>}/>
                <Route path="/about" exact element={<About/>}/>
                <Route path="/checkout-success"  element={<CheckoutSuccess setCart={setCart} open={open} setOpen={setOpen} cart={cart} currentCustomerId={currentCustomerId} />}/> 
                <Route path="/logout" exact element={<Logout logout={logout}  />}/>
                
                <Route path="/card" exact element={<Card  cart={cart} isLoggedIn={isLoggedIn} currentCustomerId={currentCustomerId} setCart={setCart} clearCard={clearCard}  handleChange={handleChange} handleDeleteProduct={handleDeleteProduct} handelAddProduct={handelAddProduct} />}/>
                
                <Route path="/login" exact element={!isLoggedIn && showLogin ? (<Login currentCustomerId={currentCustomerId} cart={cart} token={token} handleClick={handleClick}  login={login} logout={logout} setShowLogin={setShowLogin} showLogin={showLogin} />)
                 : show ? (<Products handleClick={handleClick} currentCustomerId={currentCustomerId} open={open} setOpen={setOpen} token={token} logout={logout} />)
                 :  (<Card cart={cart} open={open} setOpen={setOpen} isLoggedIn={isLoggedIn} currentCustomerId={currentCustomerId} setCart={setCart} clearCard={clearCard}  handleChange={handleChange} handleDeleteProduct={handleDeleteProduct} handelAddProduct={handelAddProduct}  /> 
                ) 
                    } />






                
                
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