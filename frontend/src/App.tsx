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
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-5xl mx-auto bg-white rounded-lg shadow p-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'> Library Management System </h1>
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
        </div>
      </div>
    </div>
    </>
  )
}

export default App
