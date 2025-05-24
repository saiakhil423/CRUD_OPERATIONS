# Jala Backend Project

This is the backend service for the Jala Academy project, built with Django and Django REST Framework.

## Prerequisites

- Python 3.8 or higher installed on your system
- pip package manager
- (Optional but recommended) virtualenv to create isolated Python environments

## Setup and Installation

1. Clone the repository to your local machine.

2. Navigate to the project directory

3. (Optional) Create and activate a virtual environment:

   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On Unix or MacOS
   source venv/bin/activate
   ```

4. Install the required Python packages:

   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
   ```

5. Apply database migrations:

   ```bash
   python manage.py migrate
   ```

6. (Optional) Create a superuser to access the Django admin:

   ```bash
   python manage.py createsuperuser
   ```

## Running the Backend Server

Start the Django development server by running:

```bash
python manage.py runserver
```

By default, the server will run on `http://127.0.0.1:8000/`.

## Allowed Frontend Ports

This backend is configured to allow requests from any frontend origin and port. The CORS policy is set to allow all origins, so your frontend application can run on any port (e.g., 3000, 4200, 8080) and still communicate with this backend without CORS issues.

## Connecting Frontend to Backend

When running your frontend application, configure the API base URL to point to the backend server URL, for example:

```
http://127.0.0.1:8000/
```

Make sure the backend server is running before starting your frontend.

## Additional Notes

- This setup is intended for development and testing purposes.
- For production deployment, make sure to update the `DEBUG` setting to `False` and configure `ALLOWED_HOSTS` appropriately in `jalaBackend/settings.py`.
- Also, configure proper CORS settings for your production frontend domains.

---
This README should help beginners get started with running the backend and connecting it to their frontend application.

## JWT Authentication

This backend uses JSON Web Tokens (JWT) for authentication.

### Obtain Token

To obtain a JWT token pair (access and refresh tokens), send a POST request to:

```
POST http://127.0.0.1:8000/api/token/
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

The response will contain an access token and a refresh token:

```json
{
  "refresh": "your_refresh_token",
  "access": "your_access_token"
}
```

### Refresh Token

To refresh the access token when it expires, send a POST request to:

```
POST http://127.0.0.1:8000/api/token/refresh/
Content-Type: application/json

{
  "refresh": "your_refresh_token"
}
```

The response will contain a new access token:

```json
{
  "access": "new_access_token"
}
```

### Using the Token

Include the access token in the `Authorization` header of your API requests:

```
Authorization: Bearer your_access_token
```

This will authenticate your requests to protected endpoints.

## Creating Initial User (Username and Password)

To add a username and password for the first time (i.e., create a user for JWT authentication), you can create a superuser using Django's built-in command:

```bash
python manage.py createsuperuser
```

This command will prompt you to enter a username, email (optional), and password. The created superuser can then be used to obtain JWT tokens by sending the username and password to the token endpoint.

Alternatively, you can create users via the Django admin interface by running the server and navigating to:

```
http://127.0.0.1:8000/admin/
```

Log in with the superuser credentials and add new users.

For programmatic user creation, you can implement a registration API endpoint if needed.

---
