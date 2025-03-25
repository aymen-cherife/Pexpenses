require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const xss = require('xss-clean');

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// CSRF protection middleware
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    sameSite: 'strict'
  }
});

// Middleware to set CSRF token in headers
const setCsrfTokenInHeaders = (req, res, next) => {
  const csrfToken = req.csrfToken();
  res.cookie('XSRF-TOKEN', csrfToken, {
    httpOnly: false,  // Set to false so it can be accessed by the client
    sameSite: 'strict'
  });
  res.set('X-CSRF-Token', csrfToken);
  next();
};

// XSS Clean to sanitize user input
app.use(xss());

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200', //  port of  Angular app is served from
  credentials: true,  // Crucial for cookies to be sent and received
}));

// MongoDB connection
const PORT = process.env.PORT || 3000;
const uri = "YOUR MONGODB DATABSE";
const clientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("Connected to MongoDB!");

    // Setting up the routes under '/'
    app.use('/', authRoutes);
    app.use('/', transactionRoutes);
    app.get('/', (req, res) => res.send('Hello, Pexpenses!'));

    // CSRF token endpoint
    app.get('/send_csrf', csrfProtection, (req, res) => {
      const csrfToken = req.csrfToken();
      console.log('Generated CSRF Token:', csrfToken);
      res.cookie('XSRF-TOKEN', csrfToken, {
        httpOnly: false,  // Set to false so it can be accessed by the client
        sameSite: 'strict'
      });
      res.json({ csrfToken });
    });

    // Apply CSRF protection and set token in headers
    app.use(csrfProtection);
    app.use(setCsrfTokenInHeaders);

    // CSRF protected route
    app.post('/test_csrf', (req, res) => {
      console.log('Received CSRF Token:', req.headers['x-csrf-token']);
      res.send('Data processed');
    });

    // CSRF error handling
    app.use((err, req, res, next) => {
      if (err.code !== 'EBADCSRFTOKEN') return next(err);
      res.status(403).send('CSRF token mismatch');
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
