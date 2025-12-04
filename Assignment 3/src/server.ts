import express, { Application } from 'express';
import bookRoutes from './routes/bookRoutes';
import { loggerMiddleware } from './middleware/logger';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(loggerMiddleware);
app.use('/api/books', bookRoutes);

app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to Book API',
    student: 'Muhammad Umer Khan',
    id: '402480',
    instructor: 'Sir Waqar Rana',
    centre: 'Circle Welfare Foundation',
    endpoints: {
      'GET /api/books': 'Get all books',
      'GET /api/books/:id': 'Get book by ID',
      'POST /api/books': 'Create a new book',
      'PUT /api/books/:id': 'Update a book',
      'DELETE /api/books/:id': 'Delete a book'
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📚 Book API by Muhammad Umer Khan (ID: 402480)`);
});
