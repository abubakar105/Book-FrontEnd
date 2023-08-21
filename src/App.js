import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './components/Home/Home'
import Update from './components/Update/Update'
import Register from './components/Register/Register'
import Navbar from './components/Navbar.js/Navbar'
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Update />} />
      </Routes>
    </>
  )
}

export default App