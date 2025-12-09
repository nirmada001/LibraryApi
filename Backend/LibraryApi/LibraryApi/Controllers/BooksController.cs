using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LibraryApi.Models;
using LibraryApi.Data;
using Microsoft.AspNetCore.Http.HttpResults;

namespace LibraryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;


        public BooksController(LibraryContext context)
        {
            _context = context;
        }

        //Get all books from database as a list
        [HttpGet]
        public IActionResult GetBooks()
        {
            var books = _context.Books.ToList();
            return Ok(books);
        }

        //Get book by Id
        [HttpGet("{id}")]
        public IActionResult GetBookById(int id)
        {
            var book = _context.Books.Find(id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }



        //Add a new book to the database
        [HttpPost]
        public IActionResult PostBook(Book book)
        {
            if (ModelState.IsValid)
            {
                // Validate the book details
                var books = _context.Books.ToList();
                if (books.Any(b => b.Title == book.Title))
                {
                    return Conflict(new { message = "A book with the same Title already exists." });
                }
                _context.Books.Add(book);
                _context.SaveChanges();

                return Ok(book);
            }
            else
            {
                return BadRequest(new { message = "Properly fillout all the fields." });
            }

           
        }

        //Update an existing book in the database
        [HttpPut("{id}")]
        public IActionResult PutBook(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest(new {message = "Recheck the book id and enter properly..."});
            }

            if (ModelState.IsValid)
            {
                _context.Entry(book).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();
                return Ok(new {message = "Book Updated Successfully"});
            }
            else {
                return BadRequest(new { message = "Properly fillout all the fields." });
            }
        }

        //Delete a book from database
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var book = _context.Books.Find(id);

            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return Ok(new {message = "Book deleted successfully..."});
        }
    }
}
