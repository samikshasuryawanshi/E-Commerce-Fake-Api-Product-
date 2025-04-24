import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductContext } from '../utils/Context';
import axios from '../utils/Axios';
import Loading from './Loading';

const Details = () => {
  const[products,setproducts] = useContext(ProductContext);
  const [product,setproduct] =  useState(null);
  const navigate = useNavigate();
  const {id} = useParams();

  // console.log(id);
  

  // const singleProduct = async () =>{
  //    try {
  //      const {data} = await axios.get(`/products/${id}`)
  //      setproduct(data)
  //      console.log(data);
       
       
  //    } catch (error) {
  //      console.log(error);
       
  //    }

  // }

  useEffect(()=>{
    if(!product){
      setproduct(products.filter((p)=> p.id == id)[0]);
    }
  },[])

  const ProductDeleteHandler = (id) =>{
    const filteredProducts = products.filter((p) => p.id !== id)
   
    setproducts(filteredProducts);
    localStorage.setItem("products",JSON.stringify(filteredProducts))
    navigate("/")
  }


  return ( product ? 
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br flex items-center justify-center bg-zinc-900 text-white"
    >
      <div className=" h-1/3 bg-zinc-800 rounded-lg w-1/2 p-8">
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center cursor-pointer text-blue-400 hover:text-blue-300 transition-colors group"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl p-4"
          >
            <img
              src={`${product.image}`}
              alt="Product"
              className="w-full rounded-lg h-full object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col justify-center space-y-3"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-blue-400">
             {product.title}
            </h1>

             <h1 className='text-lg capitalize text-zinc-400'>{product.category}</h1>


            <p className="text-xl font-bold text-blue-400">
              ${product.price}
            </p>


            <p className="text-gray-300 text-sm leading-relaxed">
              {product.description}
            </p>


            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105">
                Edit
              </Link>
              <button onClick={() => ProductDeleteHandler(product.id)} className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors transform hover:scale-105">
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
    : <Loading />
  );
};

export default Details;