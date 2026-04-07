# 🚀 Task Manager SaaS App

## 📌 Project Overview
This is a full-stack Task Manager application built using the MERN stack. It allows users to manage tasks efficiently with authentication and a modern UI.

---

## ✨ Features
- User authentication (JWT)
- Add, update, delete tasks
- Mark tasks as completed
- Responsive SaaS-style UI
- Sidebar dashboard layout
- Toast notifications and loading states

---

## 🛠️ Technologies Used
Frontend:
- React.js
- Axios
- React Router
- React Icons
- CSS (custom SaaS design)

Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## 🗄️ Database Schema

### User
- email
- password

### Task
- title
- userId
- completed
- createdAt

---

## 🔗 API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Tasks
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

---

## ⚙️ Setup Instructions

### Backend
```bash
cd server
npm install
npm run dev