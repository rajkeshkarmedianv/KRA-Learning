# Inventory Management System - API Documentation

## Setup Instructions

### 1. Database Setup (PostgreSQL)

1. Install PostgreSQL if not already installed
2. Create a database:
   ```sql
   CREATE DATABASE inventory_db;
   ```

### 2. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your PostgreSQL credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=inventory_db
   JWT_SECRET=your_super_secret_jwt_key
   PORT=3000
   NODE_ENV=development
   ```

### 3. Install Dependencies & Run

```bash
npm install
npm run start:dev
```

The server will run on `http://localhost:3000`

---

## API Endpoints

### Base URL
```
http://localhost:3000
```

---

## 1. Register User

**Endpoint:** `POST /auth/register`

**Description:** Register a new user in the system

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "admin"
}
```

**Role Options:**
- `admin`
- `manager`
- `staff`

**Response (Success - 201):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "admin"
}
```

**Response (Error - 400):**
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters",
    "role must be one of the following values: admin, manager, staff"
  ],
  "error": "Bad Request"
}
```

---

## 2. Login

**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and get JWT token

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error - 401):**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## 3. Get All Users

**Endpoint:** `GET /users`

**Description:** Get list of all users (requires authentication)

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Response (Success - 200):**
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "role": "admin"
  },
  {
    "id": 2,
    "email": "manager@example.com",
    "role": "manager"
  }
]
```

**Response (Error - 401):**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## 4. Get User by ID

**Endpoint:** `GET /users/:id`

**Description:** Get a specific user by ID (requires authentication)

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Response (Success - 200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "admin"
}
```

**Response (Error - 401):**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## Postman Testing Guide

### Step 1: Register a User

1. Create a new POST request
2. URL: `http://localhost:3000/auth/register`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "email": "admin@test.com",
     "password": "admin123",
     "role": "admin"
   }
   ```
5. Send the request
6. Save the response (you'll get user details)

### Step 2: Login

1. Create a new POST request
2. URL: `http://localhost:3000/auth/login`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "email": "admin@test.com",
     "password": "admin123"
   }
   ```
5. Send the request
6. Copy the `access_token` from the response

### Step 3: Get All Users (Protected Route)

1. Create a new GET request
2. URL: `http://localhost:3000/users`
3. Headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer {paste_your_access_token_here}`
4. Send the request
5. You should see the list of all users

### Step 4: Get User by ID (Protected Route)

1. Create a new GET request
2. URL: `http://localhost:3000/users/1` (replace 1 with actual user ID)
3. Headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer {paste_your_access_token_here}`
4. Send the request
5. You should see the user details

---

## Database Verification

### Check Data in PostgreSQL

1. Connect to PostgreSQL:
   ```bash
   psql -U postgres -d inventory_db
   ```

2. View all users:
   ```sql
   SELECT * FROM users;
   ```

3. View user details:
   ```sql
   SELECT id, email, role FROM users;
   ```

4. Check user count:
   ```sql
   SELECT COUNT(*) FROM users;
   ```

---

## Common Issues

### Issue: "Cannot connect to database"
**Solution:** 
- Check PostgreSQL is running
- Verify database credentials in `.env`
- Ensure database `inventory_db` exists

### Issue: "JWT_SECRET is required"
**Solution:** 
- Make sure `.env` file exists in root directory
- Add `JWT_SECRET=your_secret_key` to `.env`

### Issue: "Unauthorized" when accessing protected routes
**Solution:**
- Make sure you're including the `Authorization` header
- Format: `Bearer {token}` (with space after Bearer)
- Verify token hasn't expired (tokens expire after 1 day)

---

## Testing Checklist

- [ ] Server starts without errors
- [ ] Database connection successful
- [ ] Register endpoint creates user in database
- [ ] Login endpoint returns JWT token
- [ ] Get users endpoint requires authentication
- [ ] Get user by ID endpoint works with valid token
- [ ] Data persists in PostgreSQL after restart














