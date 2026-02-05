# 🔐 PassMate - Secure Password Manager

PassMate is a modern, responsive, and secure local password manager built with **React 19**, **Vite**, and **Tailwind CSS**. It allows users to store their website credentials locally with AES-256 encryption, ensuring that sensitive data never leaves the browser in plain text.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![CryptoJS](https://img.shields.io/badge/CryptoJS-E34F26?style=for-the-badge&logo=javascript&logoColor=white)

---

## ✨ Features

- **End-to-End Local Encryption:** Uses AES-256 via `crypto-js` to encrypt passwords before storing them in the browser's `localStorage`.
- **Dynamic Vault Management:** Easily add, edit, and delete password entries with a smooth, interactive UI.
- **Smart Visibility Toggle:** One-click visibility control for usernames and passwords to prevent shoulder surfing.
- **Clipboard Integration:** Quick-copy buttons for URLs, usernames, and passwords with instant feedback via `react-toastify`.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.
- **Animated UI:** Integrated with `LordIcons` for a premium, interactive feel.
- **Glassmorphism UI:** A clean, modern aesthetic with violet-themed accents and backdrop-blur effects.

## 🛡️ Security Implementation

PassMate prioritizes your privacy by implementing a client-side security layer:
1. **Encryption:** When a password is saved, it is processed through the AES (Advanced Encryption Standard) algorithm using a unique encryption key.
2. **Persistence:** Only the encrypted strings are stored in `localStorage`.
3. **Decryption:** Data is decrypted on-the-fly only when retrieved for display in the UI, ensuring that raw passwords are never stored at rest.

## 🚀 Tech Stack

- **Frontend:** React 19, Tailwind CSS 4
- **State Management:** React Hooks (useState, useEffect, useRef)
- **Security:** CryptoJS (AES Encryption)
- **Icons:** LordIcons, SVG
- **Notifications:** React-Toastify
- **Build Tool:** Vite

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/passmate.git
   cd passmate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your secret encryption key:
   ```env
   VITE_ENCRYPTION_KEY=your_secret_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 📸 Project Structure

```text
├── components/       # UI Components (Navbar, Manager, Footer)
├── src/
│   ├── utils/        # Encryption logic and helper functions
│   ├── App.jsx       # Main application layout
│   └── main.jsx      # Entry point
├── public/           # Static assets (icons, logos)
└── tailwind.config   # Styling configurations
```

## 📝 License

This project is for educational purposes. Feel free to use the code to learn and build your own security tools.

---
Made with ❤️ by [Kaushik]