# Postman Quick Reference

## API Endpoints Summary

### Base URL: `http://localhost:3000`

---

## 1. Register User
- **Method:** `POST`
- **URL:** `http://localhost:3000/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "email": "admin@test.com",
  "password": "admin123",
  "role": "admin"
}
```
- **Note:** Role can be `admin`, `manager`, or `staff`

---

## 2. Login
- **Method:** `POST`
- **URL:** `http://localhost:3000/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```
- **Response:** Copy the `access_token` for protected routes

---

## 3. Get All Users (Protected)
- **Method:** `GET`
- **URL:** `http://localhost:3000/users`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {your_access_token}`

---

## 4. Get User by ID (Protected)
- **Method:** `GET`
- **URL:** `http://localhost:3000/users/1`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {your_access_token}`

---

## Testing Flow

1. **Register** → Get user details
2. **Login** → Get access_token
3. **Get All Users** → Use access_token in Authorization header
4. **Get User by ID** → Use access_token in Authorization header

---

## Check Database

Connect to PostgreSQL and run:
```sql
SELECT id, email, role FROM users;
```














