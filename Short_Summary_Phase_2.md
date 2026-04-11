# IT342 Phase 2 – Mobile Development Short Summary

## 1. How Registration Works
The mobile registration process allows new users to create an account by interacting with the `RegisterActivity` screen. 
- **User Interface**: The layout presents a clean, Material Design-inspired form with fields for Full Name, Email Address, and Password. We implemented strict input validations to ensure no empty fields are submitted.
- **Workflow**: When the user clicks the "SIGN UP" button, the application disables the UI elements to prevent duplicate submissions and displays a progress indicator. The inputted data is encapsulated into a `RegisterRequest` data object.
- **API Communication**: The request object is serialized into JSON and dispatched to the backend `POST /api/auth/register` endpoint asynchronously.
- **Handling Responses**: 
  - On a `200 OK` response, the app interprets the registration as successful, clears the form, and redirects the new user to the `LoginActivity`.
  - On a failure (such as an email explicitly already existing), the JSON error response is decoupled, and the specific failure reason is explicitly rendered to the user via a red error TextView directly above the input box.

## 2. How Login Works
The mobile login flow is designed to securely authenticate returning users and grant them access to the primary application logic via `LoginActivity`.
- **User Interface**: Similar to registration, the login screen utilizes a Material Outlined-box aesthetic containing just the Email and Password fields alongside a "LOGIN" execution button.
- **Workflow**: Upon submission, the user's credentials are encrypted in a `LoginRequest` payload and sent securely to the `POST /api/auth/login` server endpoint.
- **Token Management & Routing**: 
  - If the credentials are valid, the server returns an `AuthResponse` containing a JWT (JSON Web Token). 
  - A successful response triggers a direct Intent, immediately navigating the user away from the authentication stack directly to the `DashboardActivity`.
  - If the credentials correspond to an unrecognized or unauthorized user, the backend returns a `401 Unauthorized`. The Retrofit callback catches this, halts the loading spinner, and injects a "Network error / Invalid Credentials" message inline on the UI natively mimicking the web application.

## 3. API Integration Used
The entire architectural backbone for remote data synchronization relies on **Retrofit2**—a type-safe HTTP client for Android.

1. **Retrofit Client Initialization**: The app utilizes a singleton pattern (`RetrofitClient.instance`) configured with an `OkHttpClient` and a `GsonConverterFactory`. This automatically converts native Kotlin Data Classes (like `LoginRequest`) into correctly formatted JavaScript Object Notation (JSON) payloads.
2. **Interface Declarations**: Communication endpoints are strictly defined in an `ApiService` interface using concise annotations (e.g., `@POST("auth/login")`). This guarantees compile-time type-checking for network calls.
3. **Asynchronous Callbacks**: All integrations execute on background threads utilizing Retrofit's `.enqueue(object : Callback<T>)` architecture. This prevents the Android Main/UI thread from hanging during API latency and natively manages `.onResponse()` and `.onFailure()` states cleanly out of the box.
