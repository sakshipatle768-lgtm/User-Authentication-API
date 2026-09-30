# User Authentication API

A simple REST API built with Node.js and Express that supports user signup and login.
Passwords are hashed with bcrypt, users are stored in a JSON file, and login returns a JWT.

## Setup

```bash
npm install
cp .env.example .env     # then set JWT_SECRET to a long random string
npm run dev              # starts on http://localhost:3000
```

## Endpoints

Base URL: `http://localhost:3000/api/auth`

### 1. Signup

`POST /signup`

Request body:
```json
{ "name": "Asha", "email": "asha@example.com", "password": "secret123" }
```

Success (201):
```json
{
  "success": true,
  "message": "User created successfully",
  "user": { "id": "b1f0...", "name": "Asha", "email": "asha@example.com" }
}
```

Errors:
| Status | message |
|--------|---------|
| 400 | name, email and password are required |
| 400 | Invalid email format |
| 400 | Password must be at least 8 characters |
| 409 | Email already registered |

### 2. Login

`POST /login`

Request body:
```json
{ "email": "asha@example.com", "password": "secret123" }
```

Success (200):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "b1f0...", "name": "Asha", "email": "asha@example.com" }
}
```

Errors:
| Status | message |
|--------|---------|
| 400 | email and password are required |
| 401 | Invalid email or password |

### Other responses
| Status | message |
|--------|---------|
| 404 | Route not found |
| 500 | Internal server error |

## Notes
- Passwords are never stored in plain text (bcrypt, 10 salt rounds).
- The JWT expires after 1 hour.
- User data is saved in `data/users.json` (ignored by git).
