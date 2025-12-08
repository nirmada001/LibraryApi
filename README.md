          --Library Management System--
Simple full-stack CRUD application developed using ASP.NET Core Web API, SQLite, Entity Framework Core, React, TypeScript, and Tailwind CSS.
The application allows users to add, view, update, and delete books from the library.

-- Features --
Frontend (React + TypeScript)
- Clean, simple UI developed with Tailwind CSS
- Form to create and update book details
- List to view all the books
- Edit and delete functions
- Realtime UI updates

Backend (ASP.NET Core Web API)
- RESTful API with CRUD operations
- SQLite database using Entity Framework Core
- Error handling and model validation
- CORS enabled to communicate successfully with the frontend

                    -- How to run the application --
  Backend
Prequisities
- Visual Studio
- .NET SDK (8.0 or later)
Steps:
1. Navigate to the project folder Backend/LibraryApi and double-click on LibraryApi.sln. This will open the project in Visual Studio.
2. In Solution Explorer, right-click LibraryApi and set it as the startup project.
3. Run the project using F5 or the green colour button on top. The Swagger UI will be opened automatically in your browser.
4. Test the API endpoints using the Swagger if needed.

  Frontend
Prequisities
- Visual Studio Code (recommended)
- Node.js (v16+)
- npm installed
Steps:
1. Open the project folder in Visual Studio Code
2. Navigate to the frontend folder using cd frontend
3. Install all dependencies using npm install
4. Start the development server using npm run dev
5. Then you can view the frontend.
 -- Important !! --
   For the application to work, the backend must be running; if not frontend cannot fetch data from the backend.
