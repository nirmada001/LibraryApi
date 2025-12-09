import { Link } from 'react-router-dom'


export default function HomePage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className='text-4xl font-bold text-gray-800 mt-10'>Welcome to the Library Management System</h1>
        <div className='w-1/3 text-center space-y-4 rounded p-8 bg-gray-100 shadow-md mt-8'>
        <h1 className='text-xl font-bold text-gray-800 mt-10'>Library Management System</h1>
            <p className='text-sm text-gray-600'>Choose an action below...</p>
            <div className='flex justify-center gap-4 mt-4'>
                <Link to="/add-book" className='px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700'>Add New Book</Link>
                <Link to="/books" className='px-6 py-3 bg-green-500 text-white rounded hover:bg-green-700'>View Books</Link>
            </div>
        </div>
        {/* About Section */}
        <div className='mt-10 max-w-3xl mx-auto p-6 bg-green-100 border-green-200 rounded shadow-md'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>About This System</h2>
            <p className='text-gray-600'>
                This Library Management System allows users to efficiently manage a collection of books. 
                Users can add new books, view the list of available books, edit book details, and delete books from the collection.
            </p>
        </div>
    </div>
  )
}
