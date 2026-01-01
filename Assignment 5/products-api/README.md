# Products CRUD REST API

**Author:** Muhammad Umer Khan  
**Student ID:** 402480

A clean, production-ready REST API for managing products built with Node.js, Express, TypeScript, MongoDB, and Zod validation.

## Features

- ✅ Full CRUD operations for products
- ✅ Soft delete functionality
- ✅ Zod schema validation with meaningful error messages
- ✅ MongoDB with Mongoose ODM
- ✅ TypeScript for type safety
- ✅ Clean folder structure
- ✅ Error handling
- ✅ CORS enabled

## Project Structure

```
src/
├── config/
│   └── database.ts          # MongoDB connection
├── controllers/
│   └── productController.ts # Business logic
├── models/
│   └── Product.ts           # Mongoose schema
├── routes/
│   └── productRoutes.ts      # API routes
├── schemas/
│   └── productSchema.ts      # Zod validation schemas
├── app.ts                    # Express app setup
└── index.ts                  # Server entry point
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/products-api
   NODE_ENV=development
   ```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## API Endpoints

### Create Product
```
POST /api/products
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "category": "Electronics",
  "stock": 50,
  "sku": "LAPTOP-001",
  "image": "https://example.com/laptop.jpg"
}
```

### Get All Products
```
GET /api/products
```

### Get Single Product
```
GET /api/products/:id
```

### Update Product
```
PUT /api/products/:id
Content-Type: application/json

{
  "price": 899.99,
  "stock": 45
}
```

### Delete Product (Soft Delete)
```
DELETE /api/products/:id
```

## Product Schema

| Field       | Type    | Required | Validation                          |
|-------------|---------|----------|-------------------------------------|
| name        | String  | Yes      | 1-100 characters                    |
| description | String  | Yes      | 1-500 characters                    |
| price       | Number  | Yes      | Must be positive                    |
| category    | String  | Yes      | 1-50 characters                     |
| stock       | Number  | Yes      | Non-negative integer                |
| sku         | String  | Yes      | Unique, 1-50 characters             |
| image       | String  | No       | Valid URL format                    |
| isDeleted   | Boolean | No       | Default: false (soft delete flag)   |

## Error Handling

The API returns meaningful error messages for validation failures:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "price",
      "message": "Price must be a positive number"
    }
  ]
}
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Zod** - Schema validation
- **Nodemon** - Development auto-reload
- **CORS** - Cross-origin resource sharing

## License

ISC
