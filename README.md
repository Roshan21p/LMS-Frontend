# LearnHub - Learning Management System
LearnHub is a full-featured Learning Management System (LMS) where students can browse and enroll in courses, while instructors can create and manage content. Built with React, Tailwind CSS, and Redux Toolkit for seamless state management.

 🔗 Frontend is deployed on **Vercel** 
 [Live Demo](https://lms-frontend-sepia-sigma.vercel.app)

🔗 **Backend Repository**: [https://github.com/Roshan21p/LMS-Backend](https://github.com/Roshan21p/LMS-Backend)

---

## 🚀 Features

- Instructor and Student login/signup
- Forgot password and reset password functionality
- JWT-based authentication, role-based authorization, and protected route setup
- Admin dashboard to manage users, courses, and content
- Course creation and enrollment
- Upload videos/images using Cloudinary
- Send email notifications using Nodemailer
- Razorpay integration for secure payments
- Track course progress
- State management using Redux Toolkit
- Fully responsive design (mobile, tablet, desktop)

---

## 🛠️ Technologies Used

- **React**
- **Tailwind CSS**
- **Redux Toolkit**
- **Axios**
- **React Router DOM**
- **Cloudinary** (for media storage)
- **Razorpay** (for payments)
- **Nodemailer** (for emails – via backend)
- **JWT** (for authentication & authorization)

---

## 🌐 Deployment

### ✅ Frontend (Vercel)

Frontend is deployed on **Vercel**  
🔗 [Live Demo](https://learnhub-frontend.vercel.app)

### ✅ Backend (Render)

Backend API is deployed on **Render**  
🔗 [Backend URL](https://lms-backend-wwa3.onrender.com)

> ⚠️ Render backend may take 30–40 seconds to start if inactive.

---


## 💻 How to Run Locally

#  Frontend SetUp
### 1. Clone the repository

```bash
git clone https://github.com/Roshan21p/LMS-Frontend.git
cd LMS-Frontend
```
### 2. Install dependencies
```bash
npm install
```
### 3. To run the project, use the following command
```bash
npm run dev
```
### 4 Frontend .env
 Create a .env file in the root of LMS-Frontend
```bash
VITE_BACKEND_URL=http://localhost:3000/api/v1
# Or for production:
VITE_BACKEND_URL=https://lms-backend-wwa3.onrender.com/api/v1
```

---
# Backend SetUp
### 1. Clone the repository

```bash
git clone https://github.com/Roshan21p/LMS-Backend.git
cd LMS-Backend
```
### 2. Install dependencies
```bash
npm install
```
### 3. To run the project, use the following command
```bash
npm start
```
### 4 Backend .env
Create a .env file in the root of LMS-Backend
```bash
PORT=3000
FRONTEND_URL=http://localhost:5173

# Add your actual credentials below:
DB_URL=DB_URL=mongodb+srv://<your-mongo-credentials>.oqsvz.mongodb.net/lms?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=your_jwt_secret
JWT_EXPIRY= expiry_time


CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_username
SMTP_PASSWORD=your_smtp_password
SMTP_FROM_EMAIL=your_email

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
RAZORPAY_PLAN_ID=your_plan_id

CONTACT_US_EMAIL=your_email
```

---

## 📸 Screenshots

### Homepage
![HomePage](https://github.com/user-attachments/assets/778e8971-21fb-47c5-9805-c164d6318f54)

### Signup Page
![signup](https://github.com/user-attachments/assets/6bcb43a7-44ad-481c-9805-3fa4005511ec)

### Signin page
![Login](https://github.com/user-attachments/assets/9c4e0c3c-8990-44d7-b2fc-b2115516f562)

### Profile page
![Profile](https://github.com/user-attachments/assets/c790b38d-649d-4297-bf23-6284109b9333)

### Courses Page
![Courses](https://github.com/user-attachments/assets/caf0126d-ff42-44fc-9a15-02e1986614e1)

### Course Detail Page
![courseDetails](https://github.com/user-attachments/assets/12069b3c-0968-40f6-a0f2-3464b47712de)

### Course Video Player
![Videos](https://github.com/user-attachments/assets/5d74f1b9-fb44-406e-be00-f797916cf863)

### 💳 Payment Page
![PaymentGateway](https://github.com/user-attachments/assets/c551f91f-91b7-427b-9edd-d7597ecaa65f)

### Admin Dashboard
![AdminDashboard](https://github.com/user-attachments/assets/df32204c-1a7c-40e0-81bc-7b028fba21f7)

### ContactUs Page
![ContactUs](https://github.com/user-attachments/assets/46c32126-0a18-4a05-8554-7a18a016398a)

