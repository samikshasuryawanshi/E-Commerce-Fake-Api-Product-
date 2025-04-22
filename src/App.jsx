
import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Details from './components/Details'
import Loading from './components/Loading'

const App = () => {
  return (
    <div className='h-screen w-screen overflow-hidden bg-zinc-900 flex items-center justify-center text-white'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />

      </Routes>
    </div>
  )
}

export default App