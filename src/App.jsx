import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Details from './components/Details'
import Create from './components/Create'
import Edit from './components/Edit'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='h-screen w-screen overflow-hidden bg-zinc-900 flex items-center justify-center text-white'>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit/>} />
        <Route path='/details/:id' element={<Details />} />
      </Routes>
    </div>
  )
}

export default App