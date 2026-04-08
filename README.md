# GMCCP - Gujarat Municipal Corporation Complaint Portal

A modern, government-style MERN stack web application for citizens to submit and track municipal complaints.

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Auth:** JWT + bcrypt

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB or Docker Compose

### 1. Start MongoDB
```bash
docker-compose up -d
```

### 2. Start Backend
```bash
cd server
npm install
npm run dev
```

### 3. Start Frontend
```bash
cd client
npm install
npm run dev
```

### 4. Open Browser
Visit `http://localhost:5173`

## Deployment Notes

### Full Stack on Vercel
- The repo root includes `vercel.json`, so Vercel builds the `client/` app and serves the Express backend through `api/[...path].js`
- If frontend and backend are on the same Vercel project, keep `VITE_API_URL` empty so the client uses same-origin `/api`
- Set `MONGO_URI` to your MongoDB Atlas connection string
- Set `JWT_SECRET` and `FRONTEND_URL` in Vercel Project Settings -> Environment Variables
- For image uploads on Vercel, set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`
- React Router refreshes are handled by the Vercel rewrite to `index.html`

### Atlas Notes
- Use a `mongodb+srv://...` Atlas URI instead of the local Docker URI from `server/.env`
- In Atlas, create a database user and allow network access before deploying
- Test backend health at `https://your-vercel-domain/api/health`

### Recommended Deployment Order
1. Create MongoDB Atlas cluster, database user, and network access rule
2. Add Vercel env vars: `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, and Cloudinary keys
3. Deploy this repo to Vercel
4. Open `https://your-vercel-domain/api/health`
5. Test signup, login, and complaint submission

## Project Structure
```text
gmccp/
|- client/              # React frontend
|- server/              # Express backend
|- docker-compose.yml
\- docs/                # Documentation and reference assets
```
