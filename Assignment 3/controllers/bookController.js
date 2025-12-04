// In-memory book data
let books = [
  { id: 1, title: "Math Book", author: "John" },
  { id: 2, title: "Science Book", author: "Smith" }
];

// Get all books
const getAllBooks = (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
};

// Get single book by ID
const getBookById = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  
  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: book
  });
};

// Create a new book
const createBook = (req, res) => {
  const { title, author } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Please provide title and author'
    });
  }
  
  const newBook = {
    id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
    title,
    author
  };
  
  books.push(newBook);
  
  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: newBook
  });
};

// Update a book
const updateBook = (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  
  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const { title, author } = req.body;
  
  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;
  
  res.status(200).json({
    success: true,
    message: 'Book updated successfully',
    data: books[bookIndex]
  });
};

// Delete a book
const deleteBook = (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  
  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const deletedBook = books.splice(bookIndex, 1);
  
  res.status(200).json({
    success: true,
    message: 'Book deleted successfully',
    data: deletedBook[0]
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
