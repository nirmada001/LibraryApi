// import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import type { Book } from './types/book'
// import { getBooks } from './api/booksapi'
// import { createBook } from './api/booksapi'
// import { updateBook } from './api/booksapi'
// import { deleteBook } from './api/booksapi'
import Home from './pages/HomePage'
import BookListPage from "./pages/BookListPage";
import AddBookPage from "./pages/addBook";


function App() {

  return (
    <>
      <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookListPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
