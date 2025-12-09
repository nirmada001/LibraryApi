import React from 'react'
import {Link, useNavigate } from 'react-router-dom';
import { createBook } from '../api/booksapi';



export default function AddBookPage() {

    const [Tittle, setTitle] = React.useState("");
    const [Author, setAuthor] = React.useState("");
    const [Description, setDescription] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [sucess, setSuccess] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(null);

        if (!Tittle || !Author || !Description) {
            setError("All fields are required.");
            return;
        }

        const bookData = { title: Tittle, author: Author, description: Description };

        try {
            await createBook(bookData);
            setSuccess("Book added successfully.");
            setError(null);
            setTitle("");
            setAuthor("");
            setDescription("");
            navigate("/books");
        } catch {
            setError("Failed to add the book.");
            setSuccess(null);
        }
    }
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-semibold text-gray-800'>Add New Book</h2>
                <div className='space-x-2'>
                    <Link to="/" className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Home</Link>
                </div>
            </div>
            {error && (
                <div className='mb-3 text-sm text-red-700 bg-red-100 border border-red-200 px-3 py-2 rounded flex justify-between'>
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="ml-3">✕</button>
                </div>
            )}

            {sucess && (
                <div className='mb-3 text-sm text-green-700 bg-green-100 border border-green-200 px-3 py-2 rounded flex justify-between'>
                    <span>{sucess}</span>
                    <button onClick={() => setSuccess(null)} className="ml-3">✕</button>
                </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm'>
                <div>
                    <label className='block text-sm font-medium mb-1'>Title</label>
                    <input value={Tittle} onChange={(e) => setTitle(e.target.value)} className='w-full border border-gray-300 rounded p-2 text-sm' placeholder='Book Title'/>
                </div>
                <div>
                    <label className='block text-sm font-medium mb-1'>Author</label>
                    <input value={Author} onChange={(e) => setAuthor(e.target.value)} className='w-full border border-gray-300 rounded p-2 text-sm' placeholder='Author Name'/>
                </div>
                <div>
                    <label className='block text-sm font-medium mb-1'>Description</label>
                    <textarea value={Description} onChange={(e) => setDescription(e.target.value)} className='w-full border border-gray-300 rounded p-2 text-sm' placeholder='Book Description'></textarea>
                </div>
                <button type="submit" className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'>Add Book</button>
            </form>
        </div>
    )
}
