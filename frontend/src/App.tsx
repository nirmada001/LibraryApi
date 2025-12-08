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
  const [editingId, setEditingId] = useState<number | null>(null);


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
      const newBook = await createBook(bookData);
      setBooks(prev => [...prev, newBook]);
      setError(null);
    } catch (err) {
      setError("Failed to create book");
    }
  };


  // handle form submit for creating book
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!title || !author || !description) {
      setError("All fields are required");
      return;
    }

    const bookData = { title, author, description };
    if (editingId === null) {
      // CREATE BOOK
      await handleSaveBook(bookData);
    } else {
      // UPDATE BOOK
      await handleUpdateBook(editingId, bookData);
    }

    setTitle("");
    setAuthor("");
    setDescription("");
  }

  // update book
  const handleUpdateBook = async (id: number, updatedData: Omit<Book, "id">) => {
    try {
      const updatedBook: Book = {
        id,
        title: updatedData.title,
        author: updatedData.author,
        description: updatedData.description
      }

      // call backend
      await updateBook(id, updatedBook);

      // update the books array in state
      setBooks(prev =>
        prev.map(book => (book.id === id ? updatedBook : book))
      );

      // clear editing mode
      setEditingId(null);
    } catch (err) {
      setError("Failed to update book");
    }
  };

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
      <div className='min-h-screen bg-slate-100 flex items-start justify-center py-10 px-4'>
        <div className='w-full '></div>
        <div className="App">
          <h1>Library Management System</h1>
          {loading && <p>Loading books...</p>}
          {error && <p className="error">{error}</p>}
          <ul>
            {books.map(book => (
              <li key={book.id}>
                <p>ID: {book.id}</p>
                <h2>Title: {book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Description: {book.description}</p>
                <button
                  onClick={() => {
                    setEditingId(book.id);
                    setTitle(book.title);
                    setAuthor(book.author);
                    setDescription(book.description);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">
              {editingId === null ? "Add Book" : "Update Book"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
