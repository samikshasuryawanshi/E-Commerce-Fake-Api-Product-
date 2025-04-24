import { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () =>{
  const [products, setproducts] = useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(true);

  let distinct_category = products && products.reduce((acc,cv) => [...acc,cv.category],[])
  distinct_category = [... new Set(distinct_category)];

  const navVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    }),
    hover: {
      x: 5,
      transition: {
        duration: 0.2
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.nav 
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className='w-full md:w-1/5 flex flex-col gap-3 p-5 bg-zinc-800/90 backdrop-blur-sm'
    >
      <div className="flex items-center justify-between md:block">
        <motion.a 
          href="/create" 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='text-base md:text-xl text-center px-4 md:px-5 w-full py-2 md:py-3 rounded bg-blue-600 font-semibold shadow-lg hover:shadow-blue-500/20 transition-all duration-300'
        >
          Add New Product
        </motion.a>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-zinc-700/50 transition-colors duration-300"
        >
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      
      <hr className='border-t mt-3 border-zinc-700' />
      
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='text-xl md:text-2xl mt-2 md:mt-3 font-semibold text-gray-200'
      >
        Category
      </motion.h1>
      
      <AnimatePresence>
        <motion.div 
          variants={menuVariants}
          initial="open"
          animate={isOpen ? "open" : "closed"}
          className='flex text-base md:text-lg flex-col w-full gap-2 overflow-hidden'
        >
          <motion.div
            custom={0}
            variants={itemVariants}
            whileHover="hover"
          >
            <Link to="/">
              <h1 className='flex capitalize mb-1 hover:bg-zinc-700/50 px-3 py-2 rounded items-center text-white gap-2 transition-colors duration-300'>
                <span className='w-2 md:w-3 h-2 md:h-3 rounded-full bg-blue-400'></span>
                All
              </h1>
            </Link>
          </motion.div>

          {distinct_category.map((k,i) => (
            <motion.div
              key={i}
              custom={i + 1}
              variants={itemVariants}
              whileHover="hover"
            >
              <Link to={`/?category=${k}`}>
                <h1 className='flex capitalize mb-1 hover:bg-zinc-700/50 px-3 py-2 rounded items-center text-white gap-2 transition-colors duration-300'>
                  <span className='w-2 md:w-3 h-2 md:h-3 rounded-full bg-blue-400'></span>
                  {k}
                </h1>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.nav>
  )
}

export default Nav;