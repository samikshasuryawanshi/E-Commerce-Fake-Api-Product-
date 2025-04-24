import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context"
import Loading from "../components/Loading";
import axios from "../utils/Axios";
import { motion } from "framer-motion";

const Home = () =>{

    const [products , setproducts] = useContext(ProductContext)

    const {search} = useLocation();

    const category = decodeURIComponent(search.split("=")[1]);

    const [filterProducts,setfilterProducts] =  useState(null)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const getProductsCategory = async () =>{
        try {

            const {data} = await axios.get(`/products/category/${category}`)
            // filteredProducts = data;
            setfilterProducts(data);
            
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        if(!filterProducts || category == "undefined" ) setfilterProducts(products)
        if(category != "undefined") {
            
            // getProductsCategory();

            setfilterProducts(products.filter((p) => p.category == category))

        
        }

    },[category,products])


    
    
    

    return  ( products ?
        <>
          <Nav />

        
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='w-4/5 right p-10 flex flex-wrap gap-6 h-screen overflow-y-auto'
            >
                {filterProducts && filterProducts.map((p,i)=>
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        className="w-[23%]"
                    >
                        <Link
                            to={`/details/${p.id}`}
                            className='group h-fit p-5 flex flex-col items-center bg-zinc-800/90 rounded-lg '
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden rounded-lg"
                            >
                                <img
                                    className='h-[25vh] rounded-lg object-cover'
                                    src={`${p.image}`}
                                    alt=""
                                />
                            </motion.div>
                            <motion.h1
                                whileHover={{ color: "#ffffff" }}
                                transition={{ duration: 0.2 }}
                                className='text-xl mt-4 italic text-gray-200'
                            >
                                {p.title.slice(0,20)}
                            </motion.h1>
                            <motion.h1
                                whileHover={{ color: "#ffffff" }}
                                transition={{ duration: 0.2 }}
                                className='text-lg italic text-gray-300'
                            >
                                ${p.price}
                            </motion.h1>
                        </Link> 
                    </motion.div>
                )}
    


            </motion.div>
        </>
        : <Loading />
    ) 

}

export default Home;