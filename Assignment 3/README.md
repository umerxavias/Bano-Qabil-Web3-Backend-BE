# Express.js Book API with TypeScript

**Student:** Muhammad Umer Khan  
**ID:** 402480  
**Instructor:** Sir Waqar Rana  
**Centre:** Circle Welfare Foundation

A complete Express.js server with CRUD operations for managing books.

## Project Structure

```
├── src/
│   ├── controllers/
│   │   └── bookController.ts    # Controller functions for CRUD operations
│   ├── routes/
│   │   └── bookRoutes.ts        # Route definitions
│   ├── middleware/
│   │   └── logger.ts            # Logging middleware
│   └── server.ts                # Main server file
├── package.json
└── tsconfig.json
```

## Installation

```bash
npm install
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a single book by ID
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## Example Requests

### Get all books
```bash
curl http://localhost:3000/api/books
```

### Create a book
```bash
curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d "{\"title\":\"History Book\",\"author\":\"Jane\"}"
```

### Update a book
```bash
curl -X PUT http://localhost:3000/api/books/1 -H "Content-Type: application/json" -d "{\"title\":\"Advanced Math\"}"
```

### Delete a book
```bash
curl -X DELETE http://localhost:3000/api/books/1
```

## Features

- TypeScript for type safety
- Proper folder structure (routes, controllers, middleware)
- CRUD operations for books
- Request logging middleware (logs URL, Method, Date, and Time)
- In-memory data storage
