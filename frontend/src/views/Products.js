import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";

const Products = props => {

    const [userName, setUserName] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [brand, setBrand] = useState("");
    //const [productImage, setProductImage]=useState("");
    //const [file, setFile] = useState("");
    //const [uploadedImage, setUploadedImage]= useState("");
    const [previewSource, setPreviewSource]= useState("");
    const [selectedFile, setSelectedFile]= useState("");
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [product1, setProduct1] = useState([]);
    //const [userName1, setUserName1] = useState([]);
    const [fileInputState, setFileInputState] = useState('');
    //const [imageIds, setImageIds] = useState([]);

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
               //setImageIds(parsedRes)
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
   
    try {
        await fetch(process.env.REACT_APP_SERVER_URL + "/products", {
            method: "POST",
            body: JSON.stringify({productName, price, productDescription, brand, data: base64EncodedImage}),
            headers: { 'Content-Type': 'application/json'}
        })
        setPreviewSource("")
        setFileInputState('');
            setPreviewSource('');
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
           
                        <h2>Hi {userName}!</h2>
                        <Logout logout={props.logout} />

                        
              { isAdmin && (  
                    <div>
                    <h1>Add A New Product</h1>
                     <form onSubmit={submitProduct} encType='multipart/form-data'>
                        <div>
                          <label>Product Name</label>
                          <input name="productName" onChange={updateData} value={productName} />
                       
                        </div>
                        <div>
                          <label>Product Image</label>
                          <input type="file" name="image" id="fileInput"  onChange={handleProductImageUpload} value={fileInputState} />
                          <select onChange={(e)=>setBrand(e.target.value)} required>
                            <option value="">Select Brand</option>
                            <option value="iphone">iPhone</option>
                            <option value="samsung">Samsung</option>
                            <option value="sony">Sony</option>
                            <option value="xiomi">Xiomi</option>
                          </select>
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
                     {previewSource && (
                        <img src={previewSource} alt="chosen"  style={{ height: '300px' }} />
                     )}

                     {/* <button onClick={deleteAllProducts}>Delete all Products!</button> */}
                    </div>
        )} 
            <div className="contentContiner">

                <h2>Current Products</h2>
                <ul className="General">
                    {
                        product1.map(product => {
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
    )
}



export default Products;