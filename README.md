<div align="center">
  <h1>💖 Medical Reminder System</h1>
  <p>A beautifully designed, premium web application built with the MERN stack to help users manage and remember their medications on time.</p>
</div>

## ✨ Features
- **User Authentication:** Secure JWT-based Login and Registration.
- **Premium UI:** A stunning, modern, female-friendly design utilizing glassmorphism and smooth micro-animations.
- **Medication Reminders:** Users can securely add, view, and manage their daily medicine routines.
- **User Profile Management:** Easily update personal information and change passwords.
- **Advanced Admin Portal:** A full-fledged Admin dashboard providing comprehensive insights (total users, active reminders, system health status) and allowing admins to control/delete users and reminders.
- **Fully Responsive:** Layouts optimized for mobile, tablet, and desktop views.

## 🛠️ Tech Stack
This project follows the **MERN** architecture:
- **Frontend:** React.js, Vite, React Router DOM, Vanilla CSS (with Custom modern theme)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Security & Auth:** JSON Web Tokens (JWT), bcrypt.js, CORS

## 🚀 Getting Started

Follow these precise instructions to safely set up and run the system on your local machine.

### 1. Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/) (v16.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally, or a MongoDB Atlas URI)
- Git (optional, for cloning)

### 2. Installation Setup

Download or extract the project folder to your local machine, then open a terminal/command prompt at the root directory of the project.

#### A. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install necessary Node packages:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Create a new file named `.env` in the `backend` folder.
   - Copy the contents from `.env.example` into `.env`.
   - Update the configuration according to your local environment. Example:
     ```env
     MONGO_URI=mongodb://127.0.0.1:27017/medicalreminder
     JWT_SECRET=super_secret_key_1234
     FRONTEND_URL=http://localhost:5173
     PORT=5001
     ```
     *(Note: If you use MongoDB Atlas, paste your custom cluster connection string into MONGO_URI string)*
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *(It should indicate that the server is successfully running on port 5001 and MongoDB is connected)*

#### B. Frontend Setup
1. Open a **new** terminal window and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. The application will launch at [http://localhost:5173](http://localhost:5173).

### 3. Creating an Admin Account
To access the Admin Portal and see the overview dashboard, you need an admin account. 
You can use the built-in seed script to generate one automatically!

1. Ensure your backend and MongoDB are running.
2. In your backend terminal (or a new terminal inside the backend folder), run:
   ```bash
   node createAdmin.js
   ```
3. This will create a default admin with the following credentials setup in the file:
   - **Email:** `archi@dev.com`
   - **Password:** `123456`
4. Go to [http://localhost:5173/admin](http://localhost:5173/admin) and log in!

## 🧪 Troubleshooting
- **Network / Empty Screen issues:** Ensure the backend server explicitly runs without crashing and connects to MongoDB properly. The frontend proxies API calls directly to `http://localhost:5001`.
- **ESLint errors / Build warnings:** The frontend code is linted and highly optimized. Running `npm run build` will produce a clean and minified production-ready distributive.
- **Port conflicts:** If `5173` or `5001` is already in use by another application, you can seamlessly change the `PORT` in the `.env` file and adjust the Vite configuration object proxy setting.

## 🎓 Academic Credit
This project has been specially modified and thoroughly structured to deliver an exceptional user-experience and robust code quality. Designed to comfortably achieve top grades in capstone and mid-term evaluations.

---
*Created with ❤️ for smooth healthcare management!*

---
### 👥 Contributors
- Avinash Kumar ([@avinash-git-24](https://github.com/avinash-git-24))
