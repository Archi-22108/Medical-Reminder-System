# Medical Reminder System - Render Backend Deployment TODO

✅ GitHub repo pushed with all files
## Backend Render Deployment Steps

1. [ ] Create `backend/.env.example` (done below)
2. [ ] Update CORS in `backend/server.js` (done below)
3. [ ] git add . && git commit -m \"Prepare backend for Render deployment\" && git push
4. [ ] Create MongoDB Atlas cluster (free):
   - Sign up mongodb.com/atlas
   - Create M0 cluster
   - Add Network Access (0.0.0.0/0)
   - Create DB user
   - Get MONGO_URI
5. [ ] Render.com:
   - Sign up render.com (GitHub login)
   - New → Web Service → Connect repo
   - Node, Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
   - Env: MONGO_URI = your_atlas_uri
   - Deploy → get https://your-app.onrender.com
6. [ ] Test: https://your-app.onrender.com/api/auth/register (POST)
7. [ ] Frontend: Update api.jsx baseURL, deploy Netlify/Vercel

**Next auto-steps: 1-3**

