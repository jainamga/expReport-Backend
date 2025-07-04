# Author - Jainam Gala

# Expense Tracker Backend

This is the backend API for an Expense Tracker application, built with Node.js, Express, TypeScript, Sequelize, and MySQL.

## Features

- User registration and authentication (JWT)
- Role-based access (Admin, Employee)
- Expense CRUD operations
- Expense analytics (Admin only)
- Category management (via database)
- Secure password hashing (bcrypt)
- CORS support for frontend integration

## Project Structure

```
src/
  index.ts                # Entry point
  config/
    database.ts           # Sequelize DB config
  controllers/            # Route handlers
  middleware/             # Auth middleware
  models/                 # Sequelize models
  routes/                 # Express routes
.env                      # Environment variables
Dockerfile                # Docker support
buildspec.yml             # AWS CodeBuild spec
Procfile                  # For deployment (e.g., Heroku)
package.json              # NPM scripts and dependencies
tsconfig.json             # TypeScript config
```

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL database

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/jainamga/expReport-Backend
   cd expense-tracker-backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory:

   ```
   DB_NAME=expenseTracker
   DB_USER=root
   DB_PASS=your_mysql_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   PORT=8080
   ```

4. **Run database migrations (auto-sync):**
   The app will auto-sync models on start.

5. **Start the development server:**
   ```sh
   npm run dev
   ```

   Or build and run:
   ```sh
   npm run build
   npm start
   ```

### Docker

To run with Docker:

```sh
docker build -t expense-tracker-backend .
docker run -p 8080:8080 --env-file .env expense-tracker-backend
```

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Expenses

- `GET /api/expenses` — List expenses (protected)
- `POST /api/expenses` — Create expense (protected)
- `PATCH /api/expenses/:id/status` — Update status (admin only)
- `GET /api/expenses/analytics` — Expense analytics (admin only)

## License

ISC

---

**Note:** For full API details, see the route files in