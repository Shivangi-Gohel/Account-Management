# 🧾 Account Management System

A full-stack **MERN application** for managing user accounts — including registration, login, profile management, and protected routes.  
This project uses **JWT Authentication** with tokens stored in **localStorage** for session handling.

## 🗂 Step 1: Clone the Repository
git clone https://github.com/shivangi-gohel/Account-management

## ⚙️ Step 2: Setup Frontend
cd frontend 
npm install

## ⚙️ Step 3: Setup Backend
cd backend
npm install

## ▶️ Run Backend Server
npm install
npm run dev

## 🧪 Testing
1. **Register** a new account.  
2. **Login** with valid credentials.  
3. Access the `/profile` page → should load user data.  
4. **Logout** → `/profile` will now redirect to `/login`.  
5. While logged in, try accessing `/login` or `/register` → will auto-redirect to `/profile`.

## 🚀 Features

✅ **User Authentication** – Registration & Login using JWT.  
✅ **localStorage for Tokens** – Manages user authentication state.  
✅ **Protected Routes** – Only accessible after successful login.  
✅ **Auto Redirects** – Logged-in users can’t access login or register pages.  
✅ **Editable Profile Page** – Update name, bio, address, and profile image.  
✅ **Persistent Login** – User stays logged in after refresh.  
✅ **Responsive UI** – Built with modern React components.  
✅ **Notifications** – Success and error toasts for better UX.  
✅ **Scalable Backend** – Express + MongoDB setup for user management.  


## 🧩 Tech Stack

**Frontend:** React, Axios, TailwindCSS, Shadcn UI  
**Backend:** Node.js, Express.js, MongoDB  
**Authentication:** JWT (stored in localStorage) 


**👩‍💻 Shivangi Gohel**  
🔗 [GitHub](https://github.com/shivangi-gohel)  

**🔗 Youtube vidoe link**
https://youtu.be/5AA0kyO070s