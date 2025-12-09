import { Link } from 'react-router-dom'


export default function HomePage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
        <div className='text-center space-y-4 rounded p-8 bg-white shadow-md'>
            <h1 className='text-2xl font-bold text-gray-800'>Library Management System</h1>
            <p className='text-smtest-gray-600'>Choose an action below...</p>
            <div className='flex justify-center gap-4 mt-4'>
                <Link to="/add-book" className='px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700'>Add New Book</Link>
                <Link to="/books" className='px-6 py-3 bg-green-500 text-white rounded hover:bg-green-700'>View Books</Link>
            </div>
        </div>
    </div>
  )
}
