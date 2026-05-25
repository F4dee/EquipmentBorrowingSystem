# Equipment Borrowing System (EBS)
# Phase 1: Implementation Summary

## 1. Registration
*   **Fields Used:** The frontend registration form captures the user's `Full Name`, `CIT-U Email`, `Password`, and `Confirm Password`.
*   **Validation Process:**
    *   **Frontend Check:** React ensures all required fields are filled, that passwords match (by comparing `password` and `confirmPassword`), and dynamically tracks password strength (length, uppercase, numbers, symbols) and forces users to consent to the terms.
    *   **Backend Check:** Spring Boot utilizes Java Validation (`@NotBlank`, `@Email`, `@Size(min = 6)`) to ensure the email format is strictly valid before proceeding and that the password is a minimum of 6 characters.
*   **Duplicate Prevention:** A `findByEmail()` JPA Query checks the database upon submission. If the email already exists, Spring Boot aggressively blocks the registration and returns an HTTP 400 error preventing duplicate accounts.
*   **Password Storage:** Plain-text passwords are never saved. Spring Security handles incoming registration data by immediately encrypting the password using the **BCryptPasswordEncoder** hashing algorithm before persisting it to the database table.

## 2. Login
*   **Credentials Used:** The user provides their `CIT-U Email` and their `Password`.
*   **Verification Process:** The backend retrieves the database `User` entity matching the provided email. The `BCryptPasswordEncoder.matches()` function securely compares the unhashed login password against the BCrypt hashed password pulled from the database to grant access.
*   **Post-Login Behavior:** Upon successful authentication, the backend sends back the user data (omitting the secured password). The React frontend stores this authorized user state and routes the user to either the User Dashboard catalog or the Admin Dashboard depending on their system role.

## 3. Database Table
The system leverages an SQL Database (migrated from H2 to MySQL). Hibernate/JPA automatically generates and maintains the following table structure via the `@Entity` definition:

**Table:** `users`
*   `id` (BIGINT) - Auto-incrementing Primary Key
*   `name` (VARCHAR) - Stores the physical user's full name
*   `email` (VARCHAR) - Unique Constraint enforced; stores user email
*   `password` (VARCHAR) - Stores the BCrypt encrypted password hash
*   `created_at` (TIMESTAMP) - Automatically populated at insertion time

## 4. API Endpoints
The RESTful architecture created with Spring Boot revolves around two primary authentication endpoints utilizing Cross-Origin Resource Sharing (CORS) to accept local Vite server traffic:

*   **`POST /api/auth/register`** 
    *   *Payload:* JSON `{name, email, password}`
    *   *Behavior:* Validates fields, checks for duplicates, hashes the password, and creates a new `users` database record.
    *   *Response Check:* Returns standard HTTP 200 OK with success message or HTTP 400 Bad Request regarding invalidity/duplication.

*   **`POST /api/auth/login`**
    *   *Payload:* JSON `{email, password}`
    *   *Behavior:* Retrieves user by email, verifies BCrypt hash, and processes login authorization.
    *   *Response Check:* Returns HTTP 200 OK alongside the User data object, or an HTTP 401 Unauthorized for invalid credentials.
