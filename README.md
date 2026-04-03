# GMCCP – Gujarat Municipal Corporation Complaint Portal

A modern, government-style MERN stack web application for citizens to submit and track municipal complaints.

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Docker)
- **Auth:** JWT + bcrypt

## Quick Start

### Prerequisites
- Node.js v18+
- Docker & Docker Compose

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

## Project Structure
```
gmccp/
├── client/          # React Frontend
├── server/          # Express Backend
├── docker-compose.yml
└── docs/            # Documentation & DFD diagrams
```
