// import { useState } from 'react'
import Shop from '../src/components/layout/Shop'
import { Routes, Route } from 'react-router-dom'
import { Home } from './page/Home/Home'
import { Product } from './components/Product/Product'
import { ProductDetail } from './components/Product/ProductDetail'
import { Error404 } from './page/Error404/Error404'
import { ProtectedRoutes } from './components/ProtectedRouter/ProtectedRouter'
import { Profile } from './page/Profile/Profile'
import { Orders } from './page/orders/Orders'

function App() {
  return (
    <div className="App">
      <Shop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="*" element={<Error404 />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
      </Shop>
    </div>
  )
}

export default App
