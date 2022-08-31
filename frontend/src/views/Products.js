import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import Classnames from "classnames"
import 'react-toastify/dist/ReactToastify.css';
import './products.css'

const Products = props => {

    const [userName, setUserName] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [brand1, setBrand1] = useState("SelectBrand");
    const [ brandResult, setBrandResult]= useState("")
    const [previewSource, setPreviewSource]= useState("");
    const [selectedFile, setSelectedFile]= useState("");
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [product1, setProduct1] = useState([]);
    const [product2, setProduct2] = useState([]);
    const [filterProduct, setFilterProduct] = useState('');
    const [fileInputState, setFileInputState] = useState('');
    // const [openWelcome, setOpenWelcome]= useState(false)
    // const [open, setOpen]= useState(false)
   


    useEffect(() => {
    
       
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
       
   
}, [props.currentCustomerId])




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
                        setProduct2(parsedRes)
                       
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
                        console.log("parsedRes useEffect", parsedRes);
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
                case "brand1":
                setBrand1(event.target.value);
                break;
            case "productDescription":
                setProductDescription(event.target.value);
                break;
            default:
                break;
        }
    }

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
 console.log('reader', reader)
 console.log('selectedFile', selectedFile)
 reader.onerror = ()=>{
    console.error("error")
 }
 setProductName('')
 setPrice('')
 setProductDescription('')
setPreviewSource("")
setFileInputState('');
   setPreviewSource('');
 event.target.reset()
    }


const uploadImage = async (base64EncodedImage)=>{
   

        const response =  await fetch(process.env.REACT_APP_SERVER_URL + "/products", {
            method: "POST",
            body: JSON.stringify({productName, price, productDescription, brand, data: base64EncodedImage}),
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        })

        console.log("response100:", response)
        const parsedRes = await response.json();
        console.log("parsedRes www Here",parsedRes.product)
        const newProduct = parsedRes.product
        setProduct1(product1 => [...product1, newProduct])
         console.log("parsedRes 10%:", parsedRes)
         
        

        try {
            if (response.ok) {

              
      
              const now = new Date();
              const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60);
      
             
              //localStorage.setItem("data", JSON.stringify({ token: parsedRes.token, id: props.currentCustomerId, expiry: tokenExpiry.toISOString() }));

             // props.login(parsedRes.token, parsedRes.id);
              console.log('parsedRes.token', parsedRes.token)
             
            } else {
              throw new Error(parsedRes.message);
            }

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

 const deleteProduct = async event => {
    console.log('event.target.parentElement.parentElement.id', event.target.parentElement.parentElement.parentElement.id)
    const productId =  event.target.parentElement.parentElement.parentElement.id 
    
    console.log('productId 2022', productId)
    const settings = {
        method: "DELETE"
    }
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/products/${productId}`, settings);
        const parsedRes = await response.json();
        try {
            if (response.ok) {
                console.log('response', response)
                console.log('parsedRes.products Here', parsedRes.product)


                const productDeleted = product1.filter((product) => product._id !== parsedRes.product._id);
                setProduct1(productDeleted);
                console.log('productDeleted 2022', productDeleted)
                
               
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }


  

const changeBrand = (e)=>{
    setBrand1(e.target.value)
   console.log("brand", brand1)
   console.log("br", br)
}

const renderResult= ()=>{
    let result;
    brand1 === "SelectBrand"
    ? result = "SelectBrand"
    : result = (brand1)
    return result
   
}
const br = renderResult()


const searchText = (event)=>{
setFilterProduct(event.target.value)
}
let dataSearch = product1.filter(item =>{
    return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(filterProduct.toString().toLowerCase())
        )
})

    return (
        <div>
           
           <div className="search-container">
            <div className="search-frame">
                <i class="fa-solid search-icon fa-magnifying-glass"></i>
                <label className="product-search-header">Search</label>
                <input value={filterProduct} className="search-text" onChange={searchText}  />
            </div>
        </div>       
                       
        { isAdmin && (
           <div>  
               <h2 className={ Classnames('welcome',{'welcome-hide': props.open } )}  onClick={()=> props.setOpen(!props.open)}>Welcome  {userName}</h2>
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
                              <label className="product-label label-brand">Product Type</label>
                              <select className="input-name" onChange={(e)=>setBrand(e.target.value)} required>
                                   <option value="">Select Brand</option>
                                   <option value="iphone">iPhone</option>
                                   <option value="laptop">Laptop</option>
                                   <option value="ipad">iPad</option>
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
                <div className="contentContiner">
                    <h2 className="product-header">CURRENT PRODUCTS</h2>
                    <div className="product-content">
                         <label className="product-label1 label-brand">Product Type</label>
                         <select className="input-name1" onChange={changeBrand} value={brand1} required>
                              <option value="SelectBrand">Select Brand</option>
                              <option value="iphone">iPhone</option>
                              <option value="laptop">Laptop</option>
                              <option value="ipad">iPad</option>               
                         </select>
                    </div>
                    <ul className="General-admin">
                    {
                      br!="SelectBrand" ?
                      dataSearch.filter(product =>  product.brand == br)
                      .map(product =>{
                           return <li className="product-admin" key={product._id} id={product._id} > 
                                     <img className="productImg-admin" src={product.productImage.avatar} alt="productPhoto" />
                                     <div className="productName-admin">{product.productName}</div>
                                     <div className="productDescription-admin">{product.productDescription}</div>
                                     <div className="productPrice-admin">$ {product.price}</div>
                                     <div className="addtocart-admin"><div className="edit-product-button-admin"><FontAwesomeIcon  className="edit-product" icon={faFilePen} /></div></div>
                                     {/* <div className="delete-product-admin"><div className="delete-product-button-admin"  ><FontAwesomeIcon  className="trash-admin" icon={faTrashCan} onClick={deleteProduct} /></div></div>  */}
                                     <div className="delete-product-admin"><div className="delete-product-button-admin" ><i className="fa-solid trash-admin fa-trash-can" onClick={deleteProduct}></i></div></div> 
                                  </li>
                       } ) 
                       :(
                       dataSearch.map(product =>{
                         

                                 return <li className="product-admin" key={product._id} id={product._id} > 
                                     <img className="productImg-admin" src={product.productImage.avatar} alt="productPhoto" />
                                     <div className="productName-admin">{product.productName}</div>
                                     <div className="productDescription-admin">{product.productDescription}</div>
                                     <div className="productPrice-admin">$ {product.price}</div>
                                     <div className="addtocart-admin"><div className="edit-product-button-admin"><FontAwesomeIcon  className="edit-product" icon={faFilePen}/></div></div>
                                     {/* <div className="delete-product-admin"><div className="delete-product-button-admin" ><FontAwesomeIcon  className="trash-admin" icon={faTrashCan} onClick={deleteProduct} /></div></div>  */}
                                     <div className="delete-product-admin"><div className="delete-product-button-admin" ><i className="fa-solid trash-admin fa-trash-can" onClick={deleteProduct}></i></div></div> 
                                  </li>
                       } ) 
                       )
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
                            theme="dark"
                    />              
                  </ul>
                </div>
            </div>
        

        
        
        
        )
        
        
              }
        
        
        { !isAdmin && ( 
        
        <div className="contentContiner">
            <h2 className="product-header">CURRENT PRODUCTS</h2>
            <div className="product-content">
                <label className="product-label1 label-brand">Product Type</label>
                <select className="input-name1" onChange={changeBrand} value={brand1} required>
                     <option value="SelectBrand">Select Brand</option>
                     <option value="iphone">iPhone</option>
                     <option value="laptop">Laptop</option>
                     <option value="ipad">iPad</option>               
                </select>
            </div>
          
            <ul className="General">
              {
               br!="SelectBrand" ?
               dataSearch.filter(product =>  product.brand == br)
               .map(product =>{
                    return <li className="product" key={product._id} id={product._id} > 
                              <img className="productImg" src={product.productImage.avatar} alt="productPhoto" /><br></br>
                              <div className="ProdactData">
                                  <div className="productName">{product.productName}</div>
                                  <div className="productDescription">{product.productDescription}</div>
                                  <div className="productPrice">$ {product.price}</div>
                                  <div className="productName"><button   onClick={ ()=> props.handleClick(product) }>Add to cart <i className="fas add-to-cart-icon fa-cart-plus"></i> </button></div>
                              </div>   
                          </li>
                 } ) 
                :(
                dataSearch.map(product =>{
                    return <li className="product" key={product._id} id={product._id} > 
                               <img className="productImg" src={product.productImage.avatar} alt="productPhoto" /><br></br>
                               <div className="ProdactData">
                                   <div className="productName">{product.productName}</div>
                                   <div className="productDescription">{product.productDescription}</div>
                                   <div className="productPrice">$ {product.price}</div>
                                   <div className="productName"><button  onClick={ ()=> props.handleClick(product) }>Add To Cart <i className="fas add-to-cart-icon fa-cart-plus"></i> </button></div>
                              </div>   
                           </li>
                  } ) 
                 )
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
                     theme="dark"
              />              
            </ul>

            </div>
         )}
                
            
            
            
        </div>
    )
}



export default Products;