import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;
const nodemailer = require('nodemailer');

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground',
);

oauth2Client.setCredentials({
  refresh_token:
    process.env.OAUTH_REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();

export const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: 'naorespondastarthos@gmail.com',
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken:process.env.OAUTH_REFRESH_TOKEN,
    accessToken: accessToken,
    tls: {
      rejectUnauthorized: false,
    },
  },
});