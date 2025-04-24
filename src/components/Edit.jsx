
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import {nanoid} from "nanoid"

const Edit = () =>{
    
    const[products,setproducts] = useContext(ProductContext);
    const {id} = useParams()
    const[product,setproduct] = useState({
        title: "",
        description:"",
        image:"",
        category:"",
        price:""
    }); 

    const changeHandler = (e) =>{
        // console.log(e.target.name,e.target.value);
        setproduct({...product,[e.target.name]: e.target.value})
        
    }

   
   

    const navigate = useNavigate();


    useEffect(()=>{

        setproduct(products.filter((p)=> p.id == id)[0])

    },[id])



    const addProductHandler = (e) =>{

        e.preventDefault();

        if(product.title.trim().length < 5 || product.image.trim().length < 5 || product.category.trim().length < 5 || product.price.trim().length < 3 || product.description.trim().length < 5){
            alert("required all feilds");
        }

       const pIdx =  products.findIndex((p)=> p.id == id)
       //copeing the data to make chngess in the existing data so that it can easily be editable
       const copyData = [...products];
       copyData[pIdx] = {...products[pIdx],...product}

    
        setproducts(copyData);
        localStorage.setItem("products",JSON.stringify(copyData));
        navigate(-1)


        // toast.success("new Product Added!")

    }




    return (
        <>
        <button
            onClick={() => navigate('/')}
            className="mb-8 absolute top-10 left-10 flex items-center cursor-pointer text-blue-400 hover:text-blue-300 transition-colors group"
            >
            <svg
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
            Back to product
        </button>
    
        <form onSubmit={addProductHandler} className="p-5 bg-zinc-800 flex items-center flex-col rounded-xl h-fit w-1/3">
                <h1 className="text-2xl text-center font-semibold italic mb-5">Edit Product</h1>
                <input 
                    onChange={changeHandler}
                    value={product && product.title}
                    type="text"
                    name="title"
                    placeholder="title"
                    className="text-lg w-full mb-3 px-4 py-4 bg-zinc-900 rounded border-none"
                />
                <input 
                    onChange={changeHandler}
                    value={product && product.image}
                    type="url"
                    name="image"
                    placeholder="image link"
                    className="text-lg w-full mb-3 px-4 py-4 bg-zinc-900 rounded border-none"
                />
                <div className="flex items-center justify-center gap-4">
                    <input 
                        onChange={changeHandler}
                        value={product && product.category}
                        type="text"
                        name="category"
                        placeholder="category"
                        className="text-lg  w-full mb-3 px-4 py-4 bg-zinc-900 rounded border-none"
                    />
                    <input 
                        onChange={changeHandler}
                        value={product && product.price}
                        type="text"
                        name="price"
                        placeholder="price"
                        className="text-lg  w-full mb-3 px-4 py-4 bg-zinc-900 rounded border-none"
                    />
                </div>

                <textarea 
                        onChange={changeHandler}
                        value={product && product.description}
                        type="text"
                        rows="5"
                        name="description"
                        placeholder="Description about product..."
                        className="text-lg w-full  mb-2 px-4 py-2 bg-zinc-900 rounded border-none"
                />
                
                <button className="p-2 w-1/3 cursor-pointer active:scale-95 bg-blue-600  mt-3 rounded text-lg">Edit</button>

                
        </form>
</>
    )
}

export default Edit;