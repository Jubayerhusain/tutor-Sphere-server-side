# 🛠️ Online Tutor Booking Platform - Backend

## 🚀 Project Overview
This is the **backend** of the **Online Tutor Booking Platform**, developed using **Node.js** and **Express.js** with **MongoDB** as the database. It powers essential features like tutor management, booking functionalities, authentication, and secure data handling.

---

## 🔗 Live API Server
🌐 **[Live API URL](https://turtorsphere.web.app/)**

---

## 🔑 Key Features
- 🌐 **RESTful API:** Endpoints to handle tutor addition, updates, deletions, bookings, and reviews.
- 🔒 **Secure Authentication:**
  - JWT-based authentication for private routes.
  - Firebase integration for secure user sign-ins.
- 💾 **MongoDB Integration:**
  - Store and retrieve data using Mongoose models.
- 🔍 **Search Functionality:** Fetch tutors based on languages or categories.
- 📊 **Database Operations:**
  - Incremental review updates for tutors using MongoDB's `$inc` operator.
- ⚡ **Deployment Ready:** Hosted on production-ready platforms like Render/Heroku.

## 📂 Folder Structure
```
server/
├── routes/        # API route definitions
├── middlewares/   # Authentication, error handling
├── utils/         # Helper functions
├── .env           # Environment variables
├── index.js      # Entry point
├── package.json
```

---

## 🔗 API Endpoints
| Method | Endpoint                | Description                     | Access   |
|--------|-------------------------|---------------------------------|----------|
| POST   | `/api/auth/login`       | User login (JWT & Firebase)     | Public   |
| POST   | `/api/auth/register`    | User registration               | Public   |
| GET    | `/api/tutors`           | Get all tutors                  | Public   |
| POST   | `/api/tutors`           | Add a new tutor                 | Private  |
| DELETE | `/api/tutors/:id`       | Delete a tutor                  | Private  |
| PATCH  | `/api/tutors/:id`       | Update a tutor                  | Private  |
| POST   | `/api/bookings`         | Book a tutor                    | Private  |
| GET    | `/api/bookings`         | Get user bookings               | Private  |

---

