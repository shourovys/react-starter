# API Endpoints Documentation

## Authentication Endpoints

### POST /api/auth/login

Authenticate a user with email and password.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt-token-here"
}
```

### POST /api/auth/register

Register a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt-token-here"
}
```

### POST /api/auth/logout

Log out the current user.

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

### GET /api/auth/me

Get current user information.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe"
}
```

### POST /api/auth/refresh

Refresh the JWT token.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "token": "new-jwt-token-here"
}
```

## User Management Endpoints

### GET /api/users

Get a list of users.

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term

**Response:**

```json
{
  "users": [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

### GET /api/users/:id

Get a specific user by ID.

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2025-01-01T00:00:00Z"
}
```

### POST /api/users

Create a new user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2025-01-01T00:00:00Z"
}
```

### PUT /api/users/:id

Update a user.

**Request Body:**

```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

**Response:**

```json
{
  "id": 1,
  "email": "updated@example.com",
  "name": "Updated Name",
  "updatedAt": "2025-01-02T00:00:00Z"
}
```

### DELETE /api/users/:id

Delete a user.

**Response:**

```json
{
  "message": "User deleted successfully"
}
```

## Dashboard Endpoints

### GET /api/dashboard/metrics

Get dashboard metrics.

**Response:**

```json
{
  "totalUsers": 150,
  "activeUsers": 89,
  "totalRevenue": 12500.5,
  "conversionRate": 3.2
}
```

### GET /api/dashboard/charts

Get data for dashboard charts.

**Query Parameters:**

- `period`: Time period (7d, 30d, 90d)

**Response:**

```json
{
  "userGrowth": [
    { "date": "2025-01-01", "users": 10 },
    { "date": "2025-01-02", "users": 15 }
  ],
  "revenue": [
    { "date": "2025-01-01", "amount": 500 },
    { "date": "2025-01-02", "amount": 750 }
  ]
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "error": "Bad Request",
  "message": "Validation failed",
  "details": ["email is required", "password must be at least 8 characters"]
}
```

### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Invalid credentials"
}
```

### 403 Forbidden

```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found

```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

## Rate Limiting

API endpoints are rate limited to prevent abuse:

- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt-token>
```

Tokens expire after 24 hours. Use the refresh endpoint to get a new token.

## Content Types

- **Request**: `application/json`
- **Response**: `application/json`

## CORS

The API supports CORS for the following origins:

- `http://localhost:3000` (development)
- `https://yourdomain.com` (production)
