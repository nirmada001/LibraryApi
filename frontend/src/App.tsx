// import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/HomePage'
import BookListPage from "./pages/BookListPage";
import AddBookPage from "./pages/addBook";
import EditBookPage from "./pages/EditBookPage";


function App() {

  return (
    <>
      <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookListPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/edit-book/:id" element={<EditBookPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
