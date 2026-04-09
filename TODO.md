# Medical Reminder System - Render Backend Deployment TODO

✅ 1. backend/.env.example created
✅ 2. backend/server.js CORS updated  
✅ 3. Changes committed & pushed (e3b2b58)

## Remaining User Steps:

4. [ ] MongoDB Atlas: 
   - Sign up: https://mongodb.com/atlas
   - Create free M0 cluster (AWS/GCP)
   - Network Access: Add IP 0.0.0.0/0 
   - DB User: Create admin user/password
   - Connect → Drivers → Copy MONGO_URI (mongodb+srv://...)

5. [ ] Render.com Backend Deploy:
   - Free account: https://render.com (GitHub login)
   - New → Web Service → Select this repo
   - Environment: Node
   - **Root Directory: `backend`**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variable: `MONGO_URI` = your Atlas URI
   - Create → Deploy (free tier: sleeps after inactivity)

6. [ ] Test Backend:
   - Visit: https://your-app-name.onrender.com/
   - Expected: "API is running..."
   - POST /api/auth/register {name, email, password}

**Next: Frontend deploy? (Netlify/Vercel)**


