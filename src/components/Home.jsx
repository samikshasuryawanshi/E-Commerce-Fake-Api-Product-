import { Link } from "react-router-dom";
import Nav from "./Nav";
import { useContext } from "react";
import  {ProductContext} from "../utils/Context"
import Loading from "../components/Loading";

const Home = () =>{

    const [products , setproducts] = useContext(ProductContext)
    console.log(products);
    

    return  ( products ?
        <>
          <Nav />

        
            <div  className='w-4/5 right p-10 flex  flex-wrap gap-10 h-screen overflow-y-auto'>

               {products.map((p,i)=>
                    <Link key={i} to={`/details/${p.id}`} className='h-fit w-[22%] p-5 flex flex-col shadow-2xl items-center bg-zinc-800 rounded-lg'>
                        <img className='h-[30vh] rounded  hover:scale-105 duration-200 object-cover' src={`${p.image}`} alt="" />
                        <h1 className='text-xl mt-3 font-semibold'>{p.title.slice(0,20)}...</h1>
                    </Link> 
               )}
    


            </div>
        </>
        : <Loading />
    ) 

}

export default Home;