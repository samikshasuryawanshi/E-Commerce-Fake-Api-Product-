import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context"
import Loading from "../components/Loading";
import axios from "../utils/Axios";
import { motion, AnimatePresence } from "framer-motion";

const Home = () =>{
    const [products, setproducts] = useContext(ProductContext)
    const {search} = useLocation();
    const category = search ? decodeURIComponent(search.split("=")[1]) : "undefined";
    const [filterProducts, setfilterProducts] = useState([]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { 
            y: 20, 
            opacity: 0,
            scale: 0.95
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2
            }
        }
    };

    useEffect(() => {
        if (products) {
            if (category === "undefined") {
                setfilterProducts(products);
            } else {
                const filtered = products.filter((p) => p.category === category);
                setfilterProducts(filtered);
            }
        }
    }, [category, products]);

    return ( products ?
        <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-zinc-900">
            <Nav />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='w-full md:w-4/5 p-4 md:p-8 flex flex-wrap gap-4 md:gap-6 overflow-y-auto h-full'
            >
                <AnimatePresence mode="wait">
                    {filterProducts && filterProducts.length > 0 ? (
                        filterProducts.map((p) => (
                            <motion.div
                                key={p.id}
                                variants={itemVariants}
                                whileHover="hover"
                                className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%]"
                            >
                                <Link
                                    to={`/details/${p.id}`}
                                    className='group h-fit p-4 md:p-5 flex flex-col items-center bg-zinc-800/90 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden rounded-lg w-full"
                                    >
                                        <img
                                            className='h-[20vh] md:h-[25vh] w-full rounded-lg object-cover transform transition-transform duration-300'
                                            src={`${p.image}`}
                                            alt={p.title}
                                        />
                                    </motion.div>
                                    <motion.div
                                        className="w-full mt-4 space-y-2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h1 className='text-lg md:text-xl font-semibold text-gray-200 text-center group-hover:text-white transition-colors duration-300'>
                                            {p.title.slice(0,20)}
                                        </h1>
                                        <div className="flex items-center justify-between">
                                            <span className='text-base md:text-lg font-medium text-blue-400'>
                                                ${p.price}
                                            </span>
                                            <span className='text-sm text-gray-400 capitalize'>
                                                {p.category}
                                            </span>
                                        </div>
                                    </motion.div>
                                </Link> 
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full text-center text-gray-400 text-xl"
                        >
                            No products found in this category
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
        : <Loading />
    ) 
}

export default Home;