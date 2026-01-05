# Quick Fix for 404 Error

## Immediate Steps:

### 1. Stop the Server
Press `Ctrl+C` in your terminal to stop the current server.

### 2. Create/Verify .env File
Create a `.env` file in the root directory (same level as `package.json`):

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=inventory_db
JWT_SECRET=my_super_secret_jwt_key_12345
PORT=3000
NODE_ENV=development
```

**Important:** Replace `your_postgres_password` with your actual PostgreSQL password.

### 3. Rebuild the Project
```bash
npm run build
```

### 4. Start the Server
```bash
npm run start:dev
```

### 5. Verify Server Started
You should see:
```
✅ Application is running on: http://localhost:3000
📝 Available endpoints:
   GET  http://localhost:3000/
   POST http://localhost:3000/auth/register
   POST http://localhost:3000/auth/login
   GET  http://localhost:3000/users (protected)
   GET  http://localhost:3000/users/:id (protected)
```

### 6. Test in Postman

**Test Root (should work now):**
- Method: `GET`
- URL: `http://localhost:3000/`
- Should return: `"Smart-Inventory-Project-Run"`

**Test Register:**
- Method: `POST`
- URL: `http://localhost:3000/auth/register`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "email": "admin@test.com",
  "password": "admin123",
  "role": "admin"
}
```

## If Still Getting 404:

1. **Check the URL**: Make sure there's no trailing slash or extra characters
2. **Check Content-Type**: Must be `application/json` in headers
3. **Check Server Logs**: Look for any error messages in the terminal
4. **Verify Database**: Make sure PostgreSQL is running and database exists:
   ```sql
   CREATE DATABASE inventory_db;
   ```

## Common Mistakes:

❌ Wrong: `http://localhost:3000/auth/register/` (trailing slash)
✅ Correct: `http://localhost:3000/auth/register`

❌ Wrong: Missing `Content-Type: application/json` header
✅ Correct: Include the header

❌ Wrong: Using GET instead of POST
✅ Correct: Use POST method














