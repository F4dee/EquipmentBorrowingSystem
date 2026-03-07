# IT342 Phase 1 – Implementation Summary
**Equipment Borrowing System**

## User Registration
**Registration fields used:**
- `name`: The full name of the user.
- `email`: The user's email address (used as the primary identifier).
- `password`: The user's secure password.

**Validation process:**
- All fields are marked as required (`@NotBlank`).
- The email field uses the `@Email` annotation to ensure it is in a valid format.
- The password field uses the `@Size(min = 6)` annotation to guarantee it has at least 6 characters.

**How duplicate accounts are prevented:**
- When registering, the system checks the `UserRepository` if the email already exists using `existsByEmail(email)`. 
- If the email is found, the system immediately returns a `400 Bad Request` with the message "Email is already taken".
- The `users` table also has a `UNIQUE` constraint on the `email` column at the database level to prevent duplicate records.

**How passwords are stored securely:**
- The application uses Spring Security's `BCryptPasswordEncoder` to hash user passwords before saving them. Raw passwords are never stored in the database.

## User Login
**Login credentials used:**
- `email`: Used to find the registered user.
- `password`: Used to verify against the stored hashed password.

**How the system verifies users:**
- The system receives the email and password in the request body.
- It queries the database using `findByEmail(email)` to find the existing user record.
- If the user exists, it uses `passwordEncoder.matches(rawPassword, hashedPassword)` to verify that the provided password matches the secure hash in the database.
- If they don't match, it returns a `401 Unauthorized` status.

**What happens after successful login:**
- If the credentials are correct, the system returns a `200 OK` status with a success message ("Login successful").
- It additionally returns a JSON object containing the user's details (such as `id`, `name`, `email`, and `role`) so the frontend can store this in the application state and navigate the user to the protected dashboard. The hashed password is intentionally excluded from this response for security.

## Database Table
**Table Name:** `users`

**Description:** This table is used to securely store all registered user accounts. We used H2 database for this phase.

**Columns:**
- `id`: (Primary Key, Auto-increment) Unique identifier for each user.
- `name`: (VARCHAR, Not Null) Stores the user's full name.
- `email`: (VARCHAR, Not Null, Unique) Stores the user's email address. Used for logging in.
- `password`: (VARCHAR, Not Null) Stores the BCrypt hashed password.
- `created_at`: (TIMESTAMP, Not Null) Automatically records the date and time when the user was registered.

## API Endpoints
**1. User Registration**
- **URL:** `POST /api/auth/register`
- **Purpose:** Creates a new user account.
- **Request Body:** `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`

**2. User Login**
- **URL:** `POST /api/auth/login`
- **Purpose:** Authenticates an existing user and returns their profile data.
- **Request Body:** `{ "email": "john@example.com", "password": "password123" }`
