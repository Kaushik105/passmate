# PassMate - Secure Password Manager

A modern, full-stack password management solution with a polished UI and robust encryption. This project is the backend-integrated (MERN) version of the previous local version that used browser localStorage for data persistence.

## 🚀 Overview

PassMate allows users to securely store, manage, and organize their website credentials with a clean, intuitive interface. 

- **MongoDB Version (Current)**: Full-stack application with backend persistence using Node.js, Express, and MongoDB.
- **Local Version**: The original predecessor that saved data exclusively to the browser's localStorage.

## ✨ Features

- **AES-256 Encryption**: Client-side encryption ensures passwords are never stored or transmitted in plain text.
- **Modern UI**: Polished, violet-themed design with backdrop blur and responsive layouts.
- **Vault Management**: View all saved credentials in a centralized, secure vault.
- **Secure Display**: Toggle password visibility for individual entries.
- **One-Click Actions**: Quickly copy credentials to the clipboard.
- **Full CRUD**: Seamlessly add, edit, and delete credentials via the MERN backend.
- **Interactive UX**: Smooth animations and icons powered by LordIcon.

## 🛠️ Technologies Used

### Frontend
- **React 19** & **Vite 6**
- **Tailwind CSS 4**
- **CryptoJS** (AES Encryption)
- **React Toastify** (Notifications)
- **Lord Icons**

### Backend
- **Node.js** with **Express**
- **MongoDB** (Native Driver)
- **CORS** & **Dotenv**

## 📁 Project Structure

```
password_manager/
├── backend/                # Express server and MongoDB logic
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
└── frontend/               # React frontend with MERN integration
    ├── components/         # UI Components (Navbar, Manager, Footer)
    ├── src/                # Core application logic
    └── package.json        # Frontend dependencies
```

## 🚀 Getting Started

### 1. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```
Create a `.env` file:
```env
MONGODB_URI=your_mongodb_uri/
DB_NAME=passmate
PORT=5000
```
Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```
Create a `.env` file:
```env
VITE_ENCRYPTION_KEY=your_secret_key
VITE_API_URL=http://localhost:5000
```
Start the development server:
```bash
npm run dev
```

## 🔐 Security Notes

- **IMPORTANT**: The current MongoDB version lacks user authentication. This means all passwords stored in the database are visible to anyone who accesses the application. This version is intended for personal or demonstration purposes.
- **Local Version Privacy**: Unlike the MongoDB version, the previous local version is entirely private, as passwords remain stored only within your own local browser's storage and are never sent to a shared database.
- **End-to-End Encryption**: Passwords are encrypted on the client side using your `VITE_ENCRYPTION_KEY` before being sent to the MongoDB database.

## 📄 License
This project is licensed under the ISC License.

## 👨‍💻 Author
Made with 💖 by Kaushik
