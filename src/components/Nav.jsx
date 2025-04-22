import { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () =>{



  const [products , setproducts] = useContext(ProductContext);

  let distinct_category = products && products.reduce((acc,cv) => [...acc,cv.category],[])

  distinct_category = [... new Set(distinct_category)]
  // console.log(distinct_category);
  



    return (
        <nav className='w-1/5 h-screen flex flex-col gap-3  p-5 bg-zinc-800'>
        <a href="/create" className='text-xl text-center px-5 py-3 active:scale-95 rounded bg-blue-600 font-semibold'>Add New Product</a>
        <hr className='border-t border-zinc-700' />
        <h1 className='text-2xl  mt-3 font-semibold'>Category</h1>
        <div className='flex text-lg flex-col gap-2'>

          {distinct_category.map((k,i)=>{
            return (
              <Link key={i} to={`/?category=${k}`}>
                <h1 className='flex capitalize mb-1 hover:bg-zinc-700 px-3 py-2 rounded items-center text-white gap-2'> <span className=' w-3 h-3 rounded-full bg-blue-400'></span>{k}</h1>
              </Link>
            )
          })}

            
        </div>
     </nav>
    )
}

export default Nav;