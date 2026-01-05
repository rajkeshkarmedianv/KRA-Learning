# Troubleshooting Guide

## Issue: 404 Error on /auth/register

If you're getting a 404 error, follow these steps:

### Step 1: Verify .env File Exists

Make sure you have a `.env` file in the root directory with:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=inventory_db
JWT_SECRET=your_secret_key_here
PORT=3000
NODE_ENV=development
```

### Step 2: Stop and Restart the Server

1. Stop the current server (Ctrl+C in terminal)
2. Rebuild the project:
   ```bash
   npm run build
   ```
3. Start the server again:
   ```bash
   npm run start:dev
   ```

### Step 3: Check Server is Running

Look for this message in the console:
```
Application is running on: http://localhost:3000
```

If you see database connection errors, check your PostgreSQL:
- Is PostgreSQL running?
- Is the database `inventory_db` created?
- Are the credentials in `.env` correct?

### Step 4: Test Root Endpoint

First, test the root endpoint:
- **GET** `http://localhost:3000/`
- Should return: `"Smart-Inventory-Project-Run"`

If this works, the server is running correctly.

### Step 5: Test Register Endpoint

- **POST** `http://localhost:3000/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "email": "test@example.com",
  "password": "password123",
  "role": "admin"
}
```

### Common Issues:

1. **Server not running**: Make sure `npm run start:dev` is running
2. **Wrong URL**: Use `http://localhost:3000/auth/register` (not `localhost:3000/auth/register/`)
3. **Missing Content-Type header**: Must be `application/json`
4. **Database connection error**: Check PostgreSQL is running and credentials are correct
5. **Port already in use**: Change PORT in `.env` if 3000 is taken

### Verify Routes are Registered

When the server starts, you should see routes being registered. If you see errors about missing modules or controllers, there's a configuration issue.














