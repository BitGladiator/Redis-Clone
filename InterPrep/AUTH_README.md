# InterPrep Authentication System

## 📋 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies** (already done)
   ```bash
   npm install
   ```

3. **Configure environment**
   - The `.env` file is already created with default settings
   - For production, update the JWT secrets in `.env`

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   
   Server will run on: `http://localhost:5000`

### Frontend Setup

1. **Navigate to project root**
   ```bash
   cd ..
   ```

2. **Install dependencies** (already done)
   ```bash
   npm install
   ```

3. **Start the frontend**
   ```bash
   npm run dev
   ```
   
   Frontend will run on: `http://localhost:5173`

---

## 🎯 Testing the Authentication Flow

### 1. Create an Account
- Click "Sign Up" button in the navbar
- Fill in name, email, and password
- Password strength indicator will show
- Click "Create Account"

### 2. Login
- Click "Login" button
- Enter email and password
- Click "Sign In"

### 3. View Profile
- After login, your profile appears in navbar
- Click on your profile to see dropdown menu
- Access Settings or Logout

### 4. Session Persistence
- Refresh the page - you'll stay logged in
- JWT tokens are stored in localStorage
- Access token auto-refreshes when expired

---

## 📁 Project Structure

```
InterPrep/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   └── authController.js    # Auth logic
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── models/
│   │   └── User.js              # User schema
│   ├── routes/
│   │   └── auth.js              # API routes
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Express server
│
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginModal.jsx   # Login UI
│   │   │   └── SignupModal.jsx  # Signup UI
│   │   └── Layout.jsx           # Navbar with auth
│   ├── context/
│   │   ├── AuthContext.jsx      # Auth state
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   └── useAuth.js           # Auth hook
│   ├── services/
│   │   └── api.js               # API client
│   └── App.jsx
│
└── package.json
```

---

## 🔐 API Endpoints

### Public Routes
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token

### Protected Routes (require JWT)
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout user

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/interprep
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Features Implemented

✅ User registration with validation  
✅ User login with JWT authentication  
✅ Password hashing with bcrypt  
✅ Access & refresh tokens  
✅ Auto token refresh on expiry  
✅ Protected routes  
✅ Session persistence  
✅ User profile display  
✅ Logout functionality  
✅ Modern UI with loading states  
✅ Error handling  
✅ Password strength indicator  

---

## 🔍 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (`mongod`)
- Check MONGODB_URI in backend/.env
- Try: `mongodb://127.0.0.1:27017/interprep` instead of localhost

### CORS Errors
- Ensure backend is running on port 5000
- Check FRONTEND_URL in backend/.env matches your frontend port

### Token Errors
- Clear browser localStorage and try again
- Check JWT_SECRET is set in backend/.env

---

## 📝 Next Steps

1. Deploy backend to Heroku/Railway/Render
2. Deploy frontend to Vercel/Netlify
3. Use MongoDB Atlas for cloud database
4. Add email verification
5. Implement password reset
6. Add OAuth (Google, GitHub)
7. Add role-based access control
