const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const loggingMiddleware = require('./middleware/loggingMiddleware');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use('/api/books', bookRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
