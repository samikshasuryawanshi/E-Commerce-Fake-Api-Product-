import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import {nanoid} from "nanoid"
import { toast } from "react-toastify";




const Create = () =>{

    const[products,setproducts] = useContext(ProductContext);



    const [title, settitle] = useState("");
    const [image, setimage] = useState("");
    const [category, setcategory] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");
   

    const navigate = useNavigate();

    const addProductHandler = (e) =>{

        e.preventDefault();

        if(title.trim().length < 5 || image.trim().length < 5 || category.trim().length < 5 || price.trim().length < 3 || description.trim().length < 5){
            alert("required all feilds");
        }



        const product = {
            id:nanoid(),
            title,
            image,
            category,
            price,
            description
        }

        setproducts([...products,product]);
        localStorage.setItem("products",JSON.stringify([...products,product]));
        navigate("/")
        toast.success("new Product Added!")
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
                Back to Home
            </button>
        
        <form onSubmit={addProductHandler} className="p-5 bg-zinc-800 flex items-center flex-col rounded-xl h-fit w-[90%] md:w-[70%] lg:w-1/3 mx-auto">
        <h1 className="text-xl md:text-2xl text-center font-semibold italic mb-5">Add New Product's</h1>
        <input 
            onChange={(e) => settitle(e.target.value)}
            value={title}
            type="text"
            placeholder="title"
            className="text-base md:text-xl w-full mb-3 px-4 py-2 bg-zinc-900 rounded border-none"
         />
         <input 
            onChange={(e) => setimage(e.target.value)}
            value={image}
            type="url"
            placeholder="image link"
            className="text-base md:text-xl w-full mb-3 px-4 py-2 bg-zinc-900 rounded border-none"
         />
         <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
            <input 
                onChange={(e) => setcategory(e.target.value)}
                value={category}
                type="text"
                placeholder="category"
                className="text-base md:text-xl w-full mb-3 px-4 py-2 bg-zinc-900 rounded border-none"
            />
            <input 
                onChange={(e) => setprice(e.target.value)}
                value={price}
                type="text"
                placeholder="price"
                className="text-base md:text-xl w-full mb-3 px-4 py-2 bg-zinc-900 rounded border-none"
            />
         </div>

         <textarea 
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                type="text"
                rows="5"
                placeholder="Description about product..."
                className="text-base md:text-lg w-full mb-2 px-4 py-2 bg-zinc-900 rounded border-none"
        />
        
         <button className="p-2 w-full md:w-1/3 cursor-pointer active:scale-95 bg-blue-600 mt-3 rounded text-base md:text-lg">Add new Product</button>

        
    </form>
    </>
)
}

export default Create;