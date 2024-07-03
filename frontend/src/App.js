import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import ProductList from "./pages/ProductList"
import Checkout from "./pages/Checkout"

function App() {
  return (
    <div className=''>
      <header className='flex justify-center py-2 bg-gray-900'>
        <a
          href='/'
          className="p-4 text-sm font-bold text-white text-bold hover:underline"
        >
          HOME<span className="sr-only"></span>
        </a>
        <a
          href='/checkout'
          className="p-4 text-sm font-bold text-white text-bold hover:underline"
        >
          CHECKOUT<span className="sr-only"></span>
        </a>
      </header>
      <Router>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App