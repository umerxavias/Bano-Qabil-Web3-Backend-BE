import { Request, Response } from 'express';

interface Book {
  id: number;
  title: string;
  author: string;
}

let books: Book[] = [
  { id: 1, title: "Math Book", author: "John" },
  { id: 2, title: "Science Book", author: "Smith" }
];

export const getAllBooks = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: books
  });
};

export const getBookById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    res.status(404).json({
      success: false,
      message: 'Book not found'
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: book
  });
};

export const createBook = (req: Request, res: Response): void => {
  const { title, author } = req.body;

  if (!title || !author) {
    res.status(400).json({
      success: false,
      message: 'Title and author are required'
    });
    return;
  }

  const newBook: Book = {
    id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
    title,
    author
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    data: newBook
  });
};

export const updateBook = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    res.status(404).json({
      success: false,
      message: 'Book not found'
    });
    return;
  }

  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;

  res.status(200).json({
    success: true,
    data: books[bookIndex]
  });
};

export const deleteBook = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    res.status(404).json({
      success: false,
      message: 'Book not found'
    });
    return;
  }

  const deletedBook = books.splice(bookIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: 'Book deleted successfully',
    data: deletedBook
  });
};
