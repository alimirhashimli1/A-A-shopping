import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './products.css'

const Products = props => {

    const [userName, setUserName] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [previewSource, setPreviewSource]= useState("");
    const [selectedFile, setSelectedFile]= useState("");
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [product1, setProduct1] = useState([]);
    const [fileInputState, setFileInputState] = useState('');

    useEffect(() => {
    // if(props.isLoggedIn){
       
            const fetchCustomerData = async () => {
                const settings = {
                    credentials: "include"
                }    
                const response = await fetch(process.env.REACT_APP_SERVER_URL + `/customers/${props.currentCustomerId}`, settings);
                const parsedRes = await response.json();            
                try {
                    if (response.ok) {
                       
                        setUserName(parsedRes.userName);
                        setProducts(parsedRes.products);
                        setIsAdmin(parsedRes.isAdmin);
                    } else {
                        throw new Error(parsedRes.message);
                    }
                } catch (err) {
                    alert(err.message);
                }
            }
    
            fetchCustomerData();
       
    // } 
}, [props.currentCustomerId])



useEffect(()=>{
    localStorage.setItem("cartData", JSON.stringify(props.cart));
}, [props.cart])

   

       useEffect(  ()=>{
        const getProducts = async () => {  
            const settings = {                
                credentials: "include"
            }
            const response = await fetch(process.env.REACT_APP_SERVER_URL + `/products`, settings);
                const parsedRes = await response.json();
                try {
                    if (response.ok) {
                        console.log("parsedRes Product", parsedRes);
                        setProduct1(parsedRes);
                       
                    } else {
                        throw new Error(parsedRes.message);
                    }
                } catch (err) {
                    alert(err.message);
                }
        }
        getProducts();
       }, [])


       useEffect(  ()=>{
        const getProducts = async () => {
            
    
            const settings = {                
                credentials: "include"
            }
            const response = await fetch(process.env.REACT_APP_SERVER_URL + `/products`, settings);
                const parsedRes = await response.json();
                try {
                    if (response.ok) {
                        console.log("parsedRes UserName1", parsedRes);
                        setProducts(parsedRes.products);
                       
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
            case "productName":
                setProductName(event.target.value);
                break;
            case "price":
                    setPrice(event.target.value);
                    break;
            case "brand":
                setBrand(event.target.value);
                break;
            case "productDescription":
                setProductDescription(event.target.value);
                break;
            default:
                break;
        }
    }

    // useEffect(()=>{
        
    //     const cartData = JSON.parse(localStorage.getItem("cart"));
    //     if (cartData && cartData.token && cartData.id && cartData.expiry) {
    //         const tokenCartExpiry = new Date(cartData.expiry);
    //         const now = new Date();
    //         if (tokenCartExpiry > now) {
    //             props.login(cartData.token, cartData.id)
    //         } else {
    //             props.logout();
    //         }
    //     } else {
    //         props.logout();
    //     }
    // }, [])

    const handleProductImageUpload = event =>{
        const file =event.target.files[0];
        previewFiles(file)
        setSelectedFile(file);
        setFileInputState(event.target.value);
       
    }

const submitProduct = async event => {
        event.preventDefault();
        
      if(!selectedFile) return;
const reader = new FileReader()
 reader.readAsDataURL(selectedFile)
 reader.onloadend = ()=>{
    uploadImage(reader.result)
 }
 reader.onerror = ()=>{
    console.error("error")
 }
    }


const uploadImage = async (base64EncodedImage)=>{
   
    // try {
    //     await fetch(process.env.REACT_APP_SERVER_URL + "/products", {
    //         method: "POST",
    //         body: JSON.stringify({productName, price, productDescription, brand, data: base64EncodedImage}),
    //         headers: { 'Content-Type': 'application/json'}
    //     })








        const response =  await fetch(process.env.REACT_APP_SERVER_URL + "/products", {
            method: "POST",
            body: JSON.stringify({productName, price, productDescription, brand, data: base64EncodedImage}),
            headers: { 'Content-Type': 'application/json'}
        })

        console.log("response", response)
        const parsedRes = await response.json();
        console.log("parsedRes", parsedRes)

        try {
            if (response.ok) {
      
              const now = new Date();
              const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60);
      
             
              localStorage.setItem("cart", JSON.stringify({ token: parsedRes.token, id: parsedRes.id, expiry: tokenExpiry.toISOString() }));
            // localStorage.setItem("data", JSON.stringify(props.cart))
              props.login(parsedRes.token, parsedRes.id);
             
            } else {
              throw new Error(parsedRes.message);
            }



// console.log("response : ", response)

        //LocalStorage
        // const parsedRes = await response.json();
        // const now = new Date();
        // const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60);
        // localStorage.setItem("data", JSON.stringify({ token: parsedRes.token, id: parsedRes.id, expiry: tokenExpiry.toISOString() }));
        // console.log("parsedRes : ", parsedRes)
        // props.login(parsedRes.token, parsedRes.id);





        // setPreviewSource("")
        // setFileInputState('');
        //     setPreviewSource('');
    } catch (error) {
        console.error(error)
    }
}


const previewFiles=(file)=>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = ()=>{
       setPreviewSource(reader.result)
   }
       

    const deleteAllProducts = async event => {
        const settings = {
            method: "DELETE",
            credentials: "include"
        }

        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/customers/${props.currentCustomerId}/products`, settings);
        const parsedRes = await response.json();
        try {
            if (response.ok) {
                setProducts(parsedRes);
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    const deleteOneProduct = async event => {
        const productId = event.target.parentElement.id;
        const settings = {
            method: "DELETE",
            credentials: "include"
        }
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/customers/${props.currentCustomerId}/products/${productId}`, settings);
        const parsedRes = await response.json();
        try {
            if (response.ok) {
                setProducts(parsedRes.products);
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }


}    


    return (
        <div>
           
                       
                       
              { isAdmin && (
                <div>  
                 
                    <h2 className="welcome">Welcome  {userName}</h2>
                    <div className="add-product-title">
                        <h1>ADD A NEW PRODUCTS</h1> 
                    </div>
                    <div className="add-product-container">
                    <form onSubmit={submitProduct} encType='multipart/form-data'>
                        <div className="product-content">
                          <label className="product-label label-name">Product Name</label>
                          <input name="productName" className="input-name" onChange={updateData} value={productName} />
                        </div>
                        <div className="product-content">
                          <label className="product-label label-brand">Product Brand</label>
                          <select className="input-name" onChange={(e)=>setBrand(e.target.value)} required>
                            <option value="">Select Brand</option>
                            <option value="iphone">iPhone</option>
                            <option value="samsung">Samsung</option>
                            <option value="sony">Sony</option>
                            <option value="xiomi">Xiomi</option>
                          </select>
                        </div>
                        <div className="product-content">
                          <label className="product-label label-price">Price</label>
                          <input name="price" className="input-name" onChange={updateData} value={price} />
                        </div>
                        <div className="product-content">
                          <label className="product-label label-des">Description</label>
                          <input name="productDescription" className="input-name" onChange={updateData} value={productDescription} />
                        </div> 
                        <div className="product-content">
                          <label className="product-label label-img">Product Image</label>
                          <input className="input-name input-img" type="file" name="image" id="fileInput"  onChange={handleProductImageUpload} value={fileInputState} />
                          
                        </div>
                        <button className="submit-product">Submit Product</button>
                    </form>
                    {previewSource && (
                        <img className="upload-img" src={previewSource} alt="chosen"  style={{ height: '300px' }} />
                     )}
                    </div>
                    </div>
        )} 
            <div className="contentContiner">

                <h2 className="product-header">CURRENT PRODUCTS</h2>
                <ul className="General">
                {
                        product1.map(product => {
                            return <li className="product" key={product._id} id={product._id}> 
                            <img className="productImg" src={product.productImage.avatar} alt="productPhoto" /><br></br>
                            <div className="ProdactData">
                            <div className="productName">{product.productName}</div>
                            <div className="productDescription">{product.productDescription}</div>
                            <div className="productPrice">$ {product.price}</div>
                            <div className="productName"><button   onClick={ ()=> props.handleClick(product) }>Add to cart <i className="fas header-cart-icon fa-cart-plus"></i> </button>
                            </div>
                   </div>   
                   </li>
               })
           }
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

theme="colored"
/>
                            
                </ul>
                
            </div>
            
            
        </div>
    )
}



export default Products;