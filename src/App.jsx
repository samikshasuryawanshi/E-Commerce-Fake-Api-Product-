
import React from 'react'

const App = () => {
  return (
    <div className='h-screen w-screen bg-zinc-900 text-white'>
      <nav className='w-1/5 h-screen flex flex-col items-start gap-3  p-5 bg-zinc-800'>
         <a href="/create" className='text-xl  px-5 py-3 rounded bg-blue-600 font-semibold'>Add New Product</a>
         <h1 className='text-xl font-semibold'>Category</h1>
         <ul className='flex flex-col gap-2'>
          <li>
            <a href="/">All</a>
          </li>
          
         </ul>
      </nav>
    </div>
  )
}

export default App