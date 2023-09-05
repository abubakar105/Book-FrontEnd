import React from 'react'
import { Routes, Route,useLocation } from "react-router-dom"
import Home from './components/Home/Home'
import Update from './components/Update/Update'
import Register from './components/Register/Register'
import Navbar from './components/Navbar.js/Navbar'
import { AnimatePresence } from "framer-motion";

const App = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {/* <AnimatePresence> */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Update />} />
      </Routes>
      {/* </AnimatePresence> */}
    </>
  )
}

export default App