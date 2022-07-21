import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";


const Products = props => {
    const [userName, setUserName] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName1, setUserName1] = useState([]);

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
        const getCustomers = async () => {
            
        if(isAdmin){
            const settings = {                
                credentials: "include"
            }
            const response = await fetch(process.env.REACT_APP_SERVER_URL + `/customers`, settings);
                const parsedRes = await response.json();
                try {
                    if (response.ok) {
                        console.log("parsedRes UserName1", parsedRes);
                        setUserName1(parsedRes);
                       
                    } else {
                        throw new Error(parsedRes.message);
                    }
                } catch (err) {
                    alert(err.message);
                }
        }
        }
        getCustomers();
       }, [isAdmin])
    


       useEffect(  ()=>{
        const getCustomers = async () => {
            
        if(!isAdmin){
            const settings = {                
                credentials: "include"
            }
            const response = await fetch(process.env.REACT_APP_SERVER_URL + `/customers`, settings);
                const parsedRes = await response.json();
                try {
                    if (response.ok) {
                        console.log("parsedRes UserName1", parsedRes);
                        setUserName1(parsedRes);
                       
                    } else {
                        throw new Error(parsedRes.message);
                    }
                } catch (err) {
                    alert(err.message);
                }
        }
        }
        getCustomers();
       }, [isAdmin])
    








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
            case "productDescription":
                setProductDescription(event.target.value);
                break;
            default:
                break;
        }
    }

   
    const submitProduct = async event => {
        event.preventDefault();

        const newProduct = {
            productName: productName,
            price: price,
            productDescription: productDescription
        }

        const settings = {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token
            },
            credentials: "include"
        }
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/products`, settings);
        const parsedRes = await response.json();
        try {
            if (response.ok) {
                const settings = {
                    method: "PATCH",
                    body: JSON.stringify({ id: parsedRes.id }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                }
                const secondResponse = await fetch(process.env.REACT_APP_SERVER_URL + `/customers/${props.currentCustomerId}/products`, settings);
                const secondParsedRes = await secondResponse.json();
                console.log("secondResponse: ", secondResponse)
                if (secondResponse.ok) {
                    setProducts(secondParsedRes.products);
                    setProductName("");
                    setPrice("");
                    setProductDescription("");
                } else {
                    throw new Error(secondParsedRes.message);    
                }
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
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

    return (
        <div>
           
                        <h2>Hi {userName}!</h2>
                        <Logout logout={props.logout} />
                        {/* <Products currentCustomerId={props.currentCustomerId} token={props.token}/> */}
                        
              { isAdmin && (  
                    <div>
                    <h1>Add A New Product</h1>
                     <form onSubmit={submitProduct}>
                        <div>
                          <label>Product Name</label>
                          <input name="productName" onChange={updateData} value={productName} />
                        </div>
                        <div>
                          <label>Price</label>
                          <input name="price" onChange={updateData} value={price} />
                        </div>
                        <div>
                          <label>Description</label>
                          <input name="productDescription" onChange={updateData} value={productDescription} />
                        </div> 
                        <button>Submit Product</button>
                     </form>
                     <button onClick={deleteAllProducts}>Delete all Products!</button>
                    </div>
        )} 
            <div>

                <h2>Current Products</h2>
                <ul>
                    {
                        products.map(product => {
                            return <li key={product._id} id={product._id}>{product.productName} ___ {product.price} ____ ({product.productDescription})
                            <span onClick={deleteOneProduct}>X</span>
                            </li>
                        })
                    }
                </ul>
            </div>
            
            
        </div>
    )
}








export default Products;