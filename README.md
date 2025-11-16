# PassMate - Password Manager

A secure and user-friendly password management solution with two different storage implementations to suit your needs.

## 🚀 Overview

PassMate is a modern password manager application built with React and Vite. It allows users to securely store, manage, and organize their website credentials with a clean and intuitive interface. The project comes in two flavors:
- **Local Storage Version**: Simple client-side storage using browser's localStorage
- **MongoDB Version**: Full-stack application with backend persistence using MongoDB

## ✨ Features

- **Password Storage**: Save and manage website URLs, usernames, and passwords
- **Secure Display**: Toggle password visibility with eye icon
- **Easy Access**: Copy credentials to clipboard with one click
- **Edit & Delete**: Modify or remove stored passwords as needed
- **Responsive Design**: Works seamlessly across devices (mobile, tablet, desktop)
- **Modern UI**: Clean, intuitive interface with TailwindCSS styling
- **Toast Notifications**: Visual feedback for user actions

## 🛠️ Technologies Used

### Frontend
- React 19
- Vite 6
- TailwindCSS 4
- React Toastify
- UUID for unique identifiers
- Lord Icons for UI elements

### Backend (MongoDB Version)
- Node.js with Express
- MongoDB with native driver
- CORS for cross-origin requests
- Dotenv for environment configuration

## 📁 Project Structure

```
password_manager/
├── passmate/                    # Local storage version
│   ├── components/              # React components
│   ├── src/                     # Main source files
│   ├── public/                  # Static assets
│   ├── package.json             # Dependencies and scripts
│   └── README.md               # Local version documentation
└── passmate-mongo/             # MongoDB version
    ├── backend/                # Express server and database logic
    │   ├── server.js           # Main server file
    │   ├── .env               # Environment variables (not included)
    │   └── package.json       # Backend dependencies
    └── frontend/               # React frontend for MongoDB version
        ├── components/         # React components
        ├── src/                # Main source files
        ├── public/             # Static assets
        └── package.json       # Frontend dependencies
```

## 🚀 Getting Started

### Local Storage Version (passmate/)

1. Navigate to the local version directory:
   ```bash
   cd passmate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your encryption key:
   ```bash
   echo "VITE_ENCRYPTION_KEY=your-secure-key-here" > .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

### MongoDB Version (passmate-mongo/)

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd passmate-mongo/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```env
   MONGO_URI=mongodb://localhost:27017
   DB_NAME=passmate
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd passmate-mongo/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your encryption key:
   ```bash
   echo "VITE_ENCRYPTION_KEY=your-secure-key-here" > .env
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## 🔧 Available Scripts

### In passmate/ and passmate-mongo/frontend/ directories:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Lint the code
- `npm run preview` - Preview production build

## 📋 API Endpoints (MongoDB Version)

The backend API provides the following endpoints:

- `GET /` - Retrieve all stored passwords
- `POST /` - Save a new password
- `PUT /` - Update an existing password
- `DELETE /` - Delete a password

## 🔐 Security Notes

- The local storage version now features targeted encryption security:
  - **AES Encryption**: Only the password field is encrypted using AES encryption before storage in localStorage (URL and username remain unencrypted for usability)
  - Uses an environment variable for the encryption key (set VITE_ENCRYPTION_KEY in your .env file)
- For the MongoDB version, passwords are encrypted before being sent to the backend, providing end-to-end encryption
- **IMPORTANT**: The current MongoDB version lacks user authentication and will show all passwords to all users. This means:
  - All users will see everyone else's stored passwords
  - There is no user isolation or access control
  - This is intended for demonstration purposes only
- For production use, additional security measures like user authentication, individual password encryption, and proper key management are required

## 🤝 Contributing

Contributions are welcome! Here are some areas that could use improvement:

- Adding encryption for stored passwords
- Implementing user authentication
- Adding search and filtering functionality
- Improving UI/UX design
- Adding backup and restore capabilities

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Made with 💖 by Kaushik