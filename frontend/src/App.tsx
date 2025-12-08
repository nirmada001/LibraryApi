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
  const [success, setSuccess] = useState<string | null>(null);


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

  useEffect(() => {
    if (!error && !success) return;

    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [error, success]);


  // create book
  const handleSaveBook = async (bookData: Omit<Book, "id">) => {
    try {
      const newBook = await createBook(bookData);
      setBooks(prev => [...prev, newBook]);
      setSuccess("Book created successfully");
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
      setSuccess(null);
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
      setSuccess("Book updated successfully.");
    } catch (err) {
      setError("Failed to update book");
    }
  };

  // delete book
  const handleDeleteBook = async (id: number) => {
    try {
      await deleteBook(id)
      setBooks(books.filter(book => book.id !== id))
      setSuccess("Book deleted successfully.")
    } catch (err) {
      setError("Failed to delete book")
    }
  }

  return (
    <>
      <div className='min-h-screen bg-gray-100 p-6'>
        <div className='max-w-5xl mx-auto bg-white rounded-lg shadow p-6'>
          <h1 className='text-2xl font-bold text-gray-800 mb-4'> Library Management System </h1>
          {loading && <p className='text-gray-600'>Loading books...</p>}
          {error && <p className='w-1/3 text-sm text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2 mb-2'>{error}</p>}
          {success && <p className='w-1/3 justify-center text-sm text-green-700 bg-green-100 border border-green-200 rounded px-3 py-2 mb-2'>{success}</p>}
          <div className='flex gap-6'>
            {/* Form Section */}
            <div className='w-1/3 bg-gray-50 border border-gray-200 rounded-lg p-4'>
              <h2 className='text-lg font-semibold text-gray-800 mb-3'>
                {editingId ? "Edit Book" : "Add New Book"}
              </h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <input
                  type="text"
                  placeholder='Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='w-full border border-gray-300 rounded p-2 text-sm' />

                <input
                  type="text"
                  placeholder='Author'
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className='w-full border border-gray-300 rounded p-2 text-sm' />

                <textarea
                  placeholder='Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='w-full border border-gray-300 rounded p-2 text-sm' />

                <button type="submit" className='w-full bg-blue-500 text-white rounded p-2 text-sm'>
                  {editingId ? "Update Book" : "Add Book"}
                </button>
              </form>
            </div>
            {/* Book List Section */}
            <div className='w-2/3 space-y-4'>
              <h2 className='text-lg font-semibold text-gray-800 mb-3'>Book List</h2>
              <ul className='space-y-3'>
                {books.map(book => (
                  <li
                    key={book.id}
                    className='border border-gray-200 rounded-lg p-4 bg-white shadow-sm'
                  >
                    <p className='text-xs text-gray-500'>ID: {book.id}</p>
                    <h3 className='text-md font-bold text-gray-900'>Title: {book.title}</h3>
                    <p className='text-sm text-gray-600'>Author: {book.author}</p>
                    <p className='text-sm text-gray-700 mt-2'>Description: {book.description}</p>

                    <div className='flex gap-2 mt-2'>
                      <button
                        onClick={() => {
                          setEditingId(book.id);
                          setTitle(book.title);
                          setAuthor(book.author);
                          setDescription(book.description);
                        }}
                        className='px-3 py-1 text-xs bg-yellow-200 text-yellow-800 rounded'> Edit</button>
                      <button
                        onClick={() => handleDeleteBook(book.id)}
                        className="px-3 py-1 text-xs bg-red-200 text-red-800 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </li>

                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
