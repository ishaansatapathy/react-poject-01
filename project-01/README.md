# FreeAuth - Authentication App

A modern, production-ready authentication application built with React, Tailwind CSS, and the FreeAPI Authentication Module.

![React](https://img.shields.io/badge/React-19.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF)

## 🚀 Features

- ✅ **User Registration** - Create new accounts with email, username, and password
- ✅ **User Login** - Secure authentication with session management
- ✅ **User Logout** - Clear sessions and secure sign-out
- ✅ **Current User Profile** - Display authenticated user details
- ✅ **Loading States** - Visual feedback during API requests
- ✅ **Error Handling** - Clear error messages for failed operations
- ✅ **Success Messages** - User-friendly success notifications
- ✅ **Responsive Design** - Beautiful UI with Tailwind CSS
- ✅ **Form Validation** - Client-side validation with helpful messages
- ✅ **Auto-persist Session** - Checks for existing user session on app load

## 📋 Tech Stack

- **Frontend Framework:** React 19.2
- **Styling:** Tailwind CSS 3.4 + Tailwind Forms
- **Build Tool:** Vite 8.0
- **API:** FreeAPI Authentication Module
- **Package Manager:** npm

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/freeauth-app.git
   cd freeauth-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5174/`

## 📝 API Endpoints Used

### Register User
```
POST https://api.freeapi.app/api/v1/users/register
Body: {
  "email": "user@example.com",
  "password": "test@123",
  "username": "username",
  "role": "USER"
}
```

### Login User
```
POST https://api.freeapi.app/api/v1/users/login
Body: {
  "username": "username",
  "password": "test@123"
}
```

### Get Current User
```
GET https://api.freeapi.app/api/v1/users/current-user
```

### Logout User
```
POST https://api.freeapi.app/api/v1/users/logout
```

## 🎯 How to Use

### Register a New Account
1. Click "Register here" to switch to registration mode
2. Fill in your username, email, and password
3. Select your role (User or Admin)
4. Click "Register" button
5. Success! Now you can log in

### Login
1. Enter your username and password
2. Click "Login" button
3. Your profile will be displayed upon successful login

### View Profile
- Once logged in, your username, email, and role are displayed
- Click "Logout" to sign out

## 📂 Project Structure

```
project-01/
├── src/
│   ├── App.jsx           # Main authentication component
│   ├── App.css           # Component styles and animations
│   ├── index.css         # Global styles with Tailwind
│   ├── main.jsx          # React entry point
│   └── assets/           # Static assets
├── public/               # Public files
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## 🎨 UI Features

- **Gradient Background** - Beautiful blue-to-indigo gradient
- **Responsive Cards** - Centered, shadow-enhanced containers
- **Loading Spinners** - Animated spinners during async operations
- **Form States** - Disabled inputs during loading
- **Alert Messages** - Color-coded success (green) and error (red) messages
- **Avatar** - User initial displayed in profile circle
- **Role Badge** - Visual indication of user role

## 🔒 Security Features

- Uses HTTP-only cookies for session management (via FreeAPI)
- Password validation (minimum 6 characters)
- Email validation on registration
- Secure token-based authentication
- CORS-enabled API communication

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Drag and drop 'dist' folder to Netlify
```

### Deploy to GitHub Pages
1. Update `vite.config.js` with your repository name
2. Run `npm run build`
3. Push the `dist` folder to `gh-pages` branch

## 🐛 Troubleshooting

**Login not working:**
- Ensure username and password are correct
- Check if user account exists in FreeAPI
- Look at browser console for detailed error messages

**Cookies not persisting:**
- Ensure the FreeAPI is returning cookies
- Check browser settings for cookie restrictions
- Use browser DevTools to inspect cookies

**Port 5174 already in use:**
```bash
# Kill the process on the port
# Windows:
netstat -ano | findstr :5174
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5174 | xargs kill -9
```

## 📖 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [FreeAPI Docs](https://freeapi.app)

## 👨‍💼 Author

Built as a FreeAPI Web Dev Cohort 2026 project.

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## 📞 Support

If you encounter any issues, please open an issue on GitHub or check the FreeAPI documentation.

---

**Happy Coding! 🎉**
