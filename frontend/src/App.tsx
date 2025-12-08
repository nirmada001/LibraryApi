import { useState, useEffect } from 'react'
import type { Book } from './types/book'
import { getBooks } from './api/booksapi'
import { createBook } from './api/booksapi'
import { updateBook } from './api/booksapi'
import { deleteBook } from './api/booksapi'

function App() {

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
const [description, setDescription] = useState("");

  //get books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        const data = await getBooks()
        setBooks(data)
      } catch (err) {
        setError("Failed to fetch books")
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  // create book
  const handleSaveBook = async (bookData: Omit<Book, "id">) => {
    try {
      const newBook = await createBook(bookData)
      setBooks([...books, newBook])
    } catch (err) {
      setError("Failed to create book")
    }
  }

  const handleCreateSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (!title || !author || !description) {
      setError("All fields are required");
      return;
    }
    handleSaveBook({ title, author, description });
    setTitle("");
    setAuthor("");
    setDescription("");
  }

  // update book
  const handleUpdateBook = async (id: number, updatedData: Book) => {
    try {
      const updatedBook = await updateBook(id, updatedData)
      setBooks(books.map(book => book.id === id ? updatedBook : book))
    } catch (err) {
      setError("Failed to update book")
    }
  }

  // delete book
  const handleDeleteBook = async (id: number) => {
    try {
      await deleteBook(id)
      setBooks(books.filter(book => book.id !== id))
    } catch (err) {
      setError("Failed to delete book")
    }
  }

  return (
    <>
      <div className="App">
        <h1>Library Management System</h1>
        {loading && <p>Loading books...</p>}
        {error && <p className="error">{error}</p>}
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <h2>Title: {book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Description: {book.description}</p>
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreateSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Add Book</button>
        </form> 
      </div>
    </>
  )
}

export default App
