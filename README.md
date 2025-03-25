# Pexpenses – Personal Expense Tracker

Pexpenses is a web application that helps users track and manage their personal expenses. It provides a clean interface to log, search, and organize transactions, with features designed to ensure both usability and security.

---

## Features

### Core Functionalities
- Add, edit, and delete transactions (amount, date, category, description, tags)
- Filter and search transactions by multiple criteria
- Secure password reset via email link redirection and token.

### Technical Features
- JWT-based authentication
- Session management
- Email service for password recovery
- CSRF protection using csurf with secure cookies and custom headers
- XSS sanitization using xss-clean middleware
- Cookie-based session handling with cookie-parser
- CORS configured for Angular: allows cross-origin requests only from the frontend (localhost:4200) and supports credentialed sessions (cookies)

---

## 🛠 Tech Stack

- **Frontend**: Angular, TypeScript, Ag-Grid
- **Backend**: Express.js
- **Database**: MongoDB (Mongoose)
- **Tools**: MongoDB Atlas, Postman, GitHub

---

## Architecture

Modular architecture with:
- REST API built with Express
- Frontend powered by Angular
- MongoDB 

---

## Development Notes

- Agile methodology with kanban board
- Manual testing for functionality, UI flow, and basic security
- Some UI pages include template placeholders to be removed later (e.g. register form)

---

## 🔭 Next Steps

- UI/UX improvements
- Budget goals, alerts, and insights diagrams

---
