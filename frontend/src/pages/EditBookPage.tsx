import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Book } from "../types/book";
import { getBookById, updateBook } from "../api/booksapi";

export default function EditBookPage() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sucess, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            setLoading(true);

            try {
                const book: Book = await getBookById(Number(id));
                setTitle(book.title);
                setAuthor(book.author);
                setDescription(book.description);
                setError(null);
            } catch {
                setError("Failed to load book");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        setSuccess(null);

        if (!title || !author || !description) {
            setError("All fields are required");
            return;
        }


        try {
            await updateBook(Number(id), { id: Number(id), title: title, author: author, description: description });
            setError(null);
            setSuccess("Book updated successfully");
            navigate("/books");
        } catch {
            setError("Failed to update book");
            setSuccess(null);
        }
    };

    if (loading) {
        return <div className="max-w-3xl mx-auto p-6"><p>Loading...</p></div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800"> Edit Book</h2>
                <div className="space-x-3">
                    <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Home</Link>
                    <Link to="/books" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">View Books</Link>
                </div>
            </div>

            {error && (
                <div className="mb-3 text-sm text-red-700 bg-red-100 border border-red-200 px-3 py-2 rounded flex justify-between">
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="ml-3">✕</button>
                </div>
            )}

            {sucess && (
                <div className="mb-3 text-sm text-green-700 bg-green-100 border border-green-200 px-3 py-2 rounded flex justify-between">
                    <span>{sucess}</span>
                    <button onClick={() => setSuccess(null)} className="ml-3">✕</button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Author</label>
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>

                <div className="flex gap-3">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Update Book</button>
                    <button type="button" onClick={() => navigate("/books")} className="px-4 py-2 border border-gray-300 rounded text-sm">Cancel</button>
                </div>
            </form>
        </div>
    )
}