# Quick Setup Guide

## Step 1: Create .env File

Create a `.env` file in the root directory with the following content:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
DB_NAME=inventory_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Application Configuration
PORT=3000
NODE_ENV=development
```

**Important:** Replace `your_password_here` with your actual PostgreSQL password and change `JWT_SECRET` to a secure random string.

## Step 2: Create PostgreSQL Database

Open PostgreSQL command line or pgAdmin and run:

```sql
CREATE DATABASE inventory_db;
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Start the Server

```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

## Step 5: Test in Postman

See `API_DOCUMENTATION.md` for detailed API endpoints and Postman testing instructions.














