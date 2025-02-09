# Google-Auth-Module

This module provides a simple implementation of Google OAuth 2.0 authentication in a Node.js application. It handles user authentication via Google, exchanges authorization codes for tokens, and retrieves user profile information.

## Features
- Redirect users to Google OAuth 2.0 for authentication.
- Handle the OAuth 2.0 callback and exchange authorization codes for access tokens.
- Retrieve authenticated user profile information...

## Prerequisites

Before setting up this module, ensure the following:

1. **Google Cloud Project**:
   - Create a project on [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the "Google+ API" or "Google Identity Services" API.
   - Generate OAuth 2.0 credentials (Client ID and Client Secret).
   - Set the "Authorized redirect URI" to `http://localhost:<PORT>/auth/google/callback` (replace `<PORT>` with your app's port).

2. **Node.js**:
   - Ensure Node.js is installed (version 14.x or later recommended).
   - Install `express`, `axios`, and `dotenv` npm packages.

## Installation

1. Clone this repository or copy the module files into your project:

   ```bash
   git clone <repository-url>
   cd google-auth-module
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of your project and add the following:

   ```env
   PORT=3000
   GOOGLE_CLIENT_ID=<Your-Google-Client-ID>
   GOOGLE_CLIENT_SECRET=<Your-Google-Client-Secret>
   GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
   ```

4. Start the application:

   ```bash
   node app.js
   ```

## Usage

### Routes

- **`GET /auth/google`**:
  Redirects the user to Google's OAuth 2.0 authentication page.

- **`GET /auth/google/callback`**:
  Handles the callback from Google and retrieves the user's profile information.

### Example Flow

1. Navigate to `http://localhost:3000/auth/google`.
2. You will be redirected to Google's login page.
3. After logging in, Google redirects back to `http://localhost:3000/auth/google/callback`.
4. The application exchanges the authorization code for tokens and fetches the user's profile information.

### Sample Response

On successful authentication, the API responds with:.

```json
{
  "message": "Authentication successful",
  "user": {
    "id": "1234567890",
    "email": "user@example.com",
    "name": "John Doe",
    "picture": "https://example.com/photo.jpg"
  }
}
```

## Customization

- **Change Scopes**:
  Update the `scope` parameter in the `getGoogleAuthUrl` function to request additional permissions:

  ```javascript
  scope: 'email profile https://www.googleapis.com/auth/calendar',
  ```

- **Port Configuration**:
  Modify the `PORT` value in the `.env` file to run the application on a different port.

## Error Handling

- If the authorization code is missing, the API responds with:

  ```json
  {
    "error": "Authorization code not found"
  }
  ```

- For token exchange or profile retrieval failures, the API responds with:

  ```json
  {
    "error": "Authentication failed"
  }
  ```

Check the server logs for detailed error information.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Contact

For issues or feature requests, please open an issue in the repository or contact the maintainer.

