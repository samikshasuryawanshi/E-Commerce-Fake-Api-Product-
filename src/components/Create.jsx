import { button } from "framer-motion/client";
import { useState } from "react";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";



const Create = () =>{

    const [title, settitle] = useState("");
    const [image, setimage] = useState("");
    const [catgeory, setcatgeory] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");
   

    const navigate = useNavigate();

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
        
        <form className="p-5 bg-zinc-800 flex items-center flex-col rounded-xl h-fit w-1/3">
        <h1 className="text-2xl text-center font-semibold italic mb-5">Add New Product's</h1>
        <input 
            onChange={(e) => settitle(e.target.value)}
            value={title}
            type="text"
            placeholder="title"
            className="text-xl outline-0 w-full mb-3 px-4 py-2 bg-zinc-900 rounded border-none"
         />
         <input 
            onChange={(e) => setimage(e.target.value)}
            value={image}
            type="url"
            placeholder="image link"
            className="text-xl w-full outline-0 mb-3 px-4 py-2 bg-zinc-900 rounded border-none"
         />
         <div className="flex items-center justify-center gap-4">
            <input 
                onChange={(e) => setcatgeory(e.target.value)}
                value={catgeory}
                type="text"
                placeholder="category"
                className="text-xl outline-0 w-full mb-3 px-4 py-2 bg-zinc-900 rounded border-none"
            />
            <input 
                onChange={(e) => setprice(e.target.value)}
                value={price}
                type="text"
                placeholder="price"
                className="text-xl outline-0 w-full mb-3 px-4 py-2 bg-zinc-900 rounded border-none"
            />
         </div>

         <textarea 
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                type="text"
                placeholder="Description about product"
                className="text-lg w-full outline-0 mb-2 px-4 py-2 bg-zinc-900 rounded border-none"
        />
        
         <input type="submit" className="p-2 w-1/3 cursor-pointer active:scale-95 bg-blue-600  mt-3 rounded text-xl " />

        
    </form>
    </>
)
}

export default Create;