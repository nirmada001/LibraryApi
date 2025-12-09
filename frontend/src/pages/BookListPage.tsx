import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import type { Book } from "../types/book";
import { getBooks, deleteBook } from "../api/booksapi";


export default function BookListPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    //get all books
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await getBooks();
                setBooks(data);
                setError(null);
            } catch {
                setError("Failed to load books.")
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    //delete book
    const handleDelete = async (id: number) => {
        const ok = window.confirm("Are you sure you want to delete this book?");
        if (!ok) return;

        try {
            await deleteBook(id);
            setBooks(books.filter(book => book.id !== id));
            setSuccess("Book deleted successfully.");
            setError(null);
        } catch {
            setError("Failed to delete the book.");
        }
    };

    return (
        <div className='max-w-3xl m-auto p-6 rounded shadow-md min-h-[60vh] mt-5'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-2xl font-semibold text-gray-800'>Book List</h2>
                <div className='space-x-2'>
                    <Link to="/" className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Home</Link>
                    <Link to="/add-book" className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'>Add New Book</Link>
                </div>
            </div>

            {loading && <p className='test-sm test-gray-500 mb-2'>Loading books...</p>}
            {error && (
                <div className="mb-3 text-sm text-red-700 bg-red-100 border border-red-200 px-3 py-2 rounded flex justify-between">
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="ml-3">✕</button>
                </div>
            )}

            {success && (
                <div className="mb-3 text-sm text-green-700 bg-green-100 border border-green-200 px-3 py-2 rounded flex justify-between">
                    <span>{success}</span>
                    <button onClick={() => setSuccess(null)} className="ml-3">✕</button>
                </div>
            )}

            
            <div className='flex justify-center'>
                {books.length === 0 ? (
                    <p className='text-sm text-gray-500'>No books available. Click "Add New Book" to add books.</p>
                ) : (
                    <ul className='space-y-4 w-full max-w-lg'>
                        {books.map((book) => (
                            <li key={book.id} className='border border-gay-200 rounded-lg p-4 bg-white shadow-sm flex justify-between items-start'>
                                <div>
                                    <p className='text-sm text-gray-500'>ID: {book.id}</p>
                                    <h3 className='text-lg font-semibold text-gray-800'>{book.title}</h3>
                                    <p className='text-sm text-gray-600'>Author: {book.author}</p>
                                    <p className='text-sm text-gray-600'>Description: {book.description}</p>
                                </div>
                                <div className='flex flex-col gap-2 items-end'>
                                    <button onClick={() => navigate(`/edit-book/${book.id}`)} className='flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700'>Edit</button>
                                    <button onClick={() => handleDelete(book.id)} className='flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700'>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}