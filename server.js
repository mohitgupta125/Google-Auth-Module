const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;

// Utility function to generate Google's OAuth URL
const getGoogleAuthUrl = () => {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'email profile',
    access_type: 'offline',
  });
  return `${baseUrl}?${params.toString()}`;
};

// Route: Redirect to Google's OAuth page
app.get('/auth/google', (req, res) => {
  const authUrl = getGoogleAuthUrl();
  res.redirect(authUrl);
});

// Route: Handle Google's callback
app.get('/auth/google/callback', async (req, res) => {
  const authCode = req.query.code;

  if (!authCode) {
    return res.status(400).json({ error: 'Authorization code not found' });
  }

  try {
    // Exchange the authorization code for access and ID tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code: authCode,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = tokenResponse.data;

    // Retrieve user information
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userInfo = userResponse.data;

    // Respond with user data
    res.json({
      message: 'Authentication successful',
      user: userInfo,
    });
  } catch (error) {
    console.error('Error during authentication:', error.response?.data || error.message);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
