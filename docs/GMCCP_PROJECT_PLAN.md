# GMCCP – Gujarat Municipal Corporation Complaint Portal

## 📋 Complete Project Plan (MERN Stack + Docker MongoDB)

---

## 1. Project Overview

**GMCCP** is a modern, professional, government-style web application that enables citizens of Gujarat to submit municipal complaints with image uploads, track complaint status, and receive resolutions. The system supports multiple user roles including Admin, Citizen, Department Officer, and Visitor.

### Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| **Frontend** | React (Vite) + Tailwind CSS                     |
| **Backend**  | Node.js + Express.js                            |
| **Database** | MongoDB (running on Docker)                     |
| **Auth**     | JWT + bcrypt                                    |
| **Storage**  | Cloudinary (image uploads) / Multer (local dev) |
| **Email**    | Nodemailer (for notifications)                  |
| **DevOps**   | Docker & Docker Compose (for MongoDB)           |

---

## 2. System Architecture (From DFD Diagrams)

### 2.1 Context Diagram (Level 0) — 4 Actors

The system has **4 distinct user roles** interacting with the GMCCP portal:

```
┌─────────┐                                          ┌──────────────┐
│  ADMIN   │ ◄──────────────────────────────────────► │ CITIZEN/USER │
└─────────┘                                          └──────────────┘
      ▲                                                     ▲
      │           ┌──────────────────────────┐              │
      │           │        GMCCP PORTAL      │              │
      └──────────►│  Gujarat Municipal Corp  │◄─────────────┘
      ┌──────────►│   Complaint Portal       │◄─────────────┐
      │           └──────────────────────────┘              │
      ▼                                                     ▼
┌──────────┐                                         ┌─────────────────┐
│  VISITOR  │                                         │ DEPT. OFFICER   │
└──────────┘                                         └─────────────────┘
```

### 2.2 Role Capabilities

| Role                  | Capabilities                                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Admin**             | Registration, Login, Manage Users, Manage Complaints, Manage Categories, Manage Departments, Generate Reports, Manage Help/Support, Manage Feedbacks |
| **Citizen/User**      | Registration, Login, Manage Profile, Add Complaint, Browse Categories, Check Complaint Status, Contact Help/Support, Download Complaint Receipt, Give Feedback |
| **Department Officer** | Registration, Login, View Complaints, Update Complaint Status, Resolve Complaints, Manage Priority, Generate Reports, Close Complaints |
| **Visitor**           | View Portal Services, View Feedbacks (public, no login required)                                                |

---

## 3. Database Models (MongoDB + Mongoose)

Based on the DFD diagrams, the following collections/tables are needed:

### 3.1 User Model

| Field             | Type     | Details                                                  |
| ----------------- | -------- | -------------------------------------------------------- |
| name              | String   | Required                                                 |
| email             | String   | Required, Unique                                         |
| password          | String   | Required (hashed with bcrypt)                            |
| phone             | String   | Optional                                                 |
| role              | String   | Enum: `admin`, `citizen`, `officer`, `visitor` (default: `citizen`) |
| department        | ObjectId | Ref: Department (only for officers)                      |
| profileImage      | String   | Optional                                                 |
| address           | String   | Optional                                                 |
| city              | String   | Optional                                                 |
| isActive          | Boolean  | Default: true                                            |
| createdAt         | Date     | Auto (timestamps)                                        |
| updatedAt         | Date     | Auto (timestamps)                                        |

### 3.2 Complaint Model

| Field          | Type       | Details                                                                  |
| -------------- | ---------- | ------------------------------------------------------------------------ |
| complaintId    | String     | Auto-generated unique ID (e.g., `GMCCP-2025-00001`)                     |
| user           | ObjectId   | Ref: User (citizen who filed)                                            |
| title          | String     | Required                                                                 |
| description    | String     | Required                                                                 |
| category       | ObjectId   | Ref: Category                                                            |
| city           | String     | Required                                                                 |
| state          | String     | Required (default: Gujarat)                                              |
| address        | String     | Required                                                                 |
| imageUrl       | String     | Uploaded image URL                                                       |
| status         | String     | Enum: `New`, `In Progress`, `Verified`, `Resolved`, `Closed` (default: `New`) |
| priority       | String     | Enum: `Low`, `Medium`, `High`, `Urgent` (default: `Medium`)             |
| assignedTo     | ObjectId   | Ref: User (department officer)                                           |
| department     | ObjectId   | Ref: Department                                                          |
| remarks        | String     | Officer remarks on resolution                                            |
| resolvedAt     | Date       | When complaint was resolved                                              |
| createdAt      | Date       | Auto (timestamps)                                                        |
| updatedAt      | Date       | Auto (timestamps)                                                        |

### 3.3 Category Model

| Field       | Type    | Details                                    |
| ----------- | ------- | ------------------------------------------ |
| name        | String  | Required, Unique (e.g., Roads, Water, etc) |
| description | String  | Optional                                   |
| isActive    | Boolean | Default: true                              |
| createdAt   | Date    | Auto (timestamps)                          |

### 3.4 Department Model

| Field         | Type    | Details                                          |
| ------------- | ------- | ------------------------------------------------ |
| name          | String  | Required, Unique (e.g., Water Supply, Roads)     |
| description   | String  | Optional                                         |
| contactEmail  | String  | Department email for notifications               |
| contactPerson | String  | Head of department name                          |
| isActive      | Boolean | Default: true                                    |
| createdAt     | Date    | Auto (timestamps)                                |

### 3.5 Feedback Model

| Field     | Type     | Details                          |
| --------- | -------- | -------------------------------- |
| user      | ObjectId | Ref: User                        |
| complaint | ObjectId | Ref: Complaint (optional)        |
| rating    | Number   | 1-5 star rating                  |
| comment   | String   | Feedback text                    |
| createdAt | Date     | Auto (timestamps)                |

### 3.6 HelpSupport Model

| Field     | Type     | Details                                          |
| --------- | -------- | ------------------------------------------------ |
| user      | ObjectId | Ref: User                                        |
| subject   | String   | Required                                         |
| message   | String   | Required                                         |
| response  | String   | Admin response                                   |
| status    | String   | Enum: `Open`, `Responded`, `Closed` (default: `Open`) |
| createdAt | Date     | Auto (timestamps)                                |
| updatedAt | Date     | Auto (timestamps)                                |

### 3.7 Report Model (Generated Reports)

| Field       | Type     | Details                                          |
| ----------- | -------- | ------------------------------------------------ |
| generatedBy | ObjectId | Ref: User (admin/officer)                        |
| type        | String   | Enum: `complaints`, `department`, `status`, `city` |
| filters     | Object   | Filter criteria used (city, status, date range)  |
| data        | Object   | Report data snapshot                             |
| createdAt   | Date     | Auto (timestamps)                                |

---

## 4. API Endpoints

### 4.1 Auth Routes (`/api/auth`)

| Method | Endpoint             | Description                | Auth     |
| ------ | -------------------- | -------------------------- | -------- |
| POST   | `/api/auth/register` | Register new user          | Public   |
| POST   | `/api/auth/login`    | Login & get JWT token      | Public   |
| GET    | `/api/auth/me`       | Get current user profile   | Protected |
| PUT    | `/api/auth/profile`  | Update profile             | Protected |

### 4.2 Complaint Routes (`/api/complaints`) — Citizen

| Method | Endpoint                       | Description                              | Auth      |
| ------ | ------------------------------ | ---------------------------------------- | --------- |
| POST   | `/api/complaints`              | Submit new complaint (with image)        | Citizen   |
| GET    | `/api/complaints`              | Get logged-in user's complaints          | Citizen   |
| GET    | `/api/complaints/:id`          | Get single complaint detail              | Citizen   |
| GET    | `/api/complaints/:id/status`   | Track complaint status                   | Citizen   |
| GET    | `/api/complaints/:id/download` | Download complaint receipt/PDF           | Citizen   |

### 4.3 Category Routes (`/api/categories`)

| Method | Endpoint               | Description              | Auth       |
| ------ | ---------------------- | ------------------------ | ---------- |
| GET    | `/api/categories`      | List all active categories | Public   |
| POST   | `/api/categories`      | Create category          | Admin Only |
| PUT    | `/api/categories/:id`  | Update category          | Admin Only |
| DELETE | `/api/categories/:id`  | Delete/deactivate category | Admin Only |

### 4.4 Department Routes (`/api/departments`)

| Method | Endpoint                 | Description              | Auth       |
| ------ | ------------------------ | ------------------------ | ---------- |
| GET    | `/api/departments`       | List all departments     | Protected  |
| POST   | `/api/departments`       | Create department        | Admin Only |
| PUT    | `/api/departments/:id`   | Update department        | Admin Only |
| DELETE | `/api/departments/:id`   | Delete/deactivate dept   | Admin Only |

### 4.5 Admin Routes (`/api/admin`)

| Method | Endpoint                              | Description                          | Auth       |
| ------ | ------------------------------------- | ------------------------------------ | ---------- |
| GET    | `/api/admin/complaints`               | Get all complaints (with filters)    | Admin Only |
| GET    | `/api/admin/users`                    | Get all users                        | Admin Only |
| PUT    | `/api/admin/users/:id`                | Update user (role, status)           | Admin Only |
| DELETE | `/api/admin/users/:id`                | Deactivate user                      | Admin Only |
| GET    | `/api/admin/stats`                    | Dashboard statistics                 | Admin Only |
| GET    | `/api/admin/reports`                  | Generate/view reports                | Admin Only |
| POST   | `/api/admin/reports`                  | Generate new report                  | Admin Only |

### 4.6 Department Officer Routes (`/api/officer`)

| Method | Endpoint                                  | Description                          | Auth         |
| ------ | ----------------------------------------- | ------------------------------------ | ------------ |
| GET    | `/api/officer/complaints`                 | View assigned complaints             | Officer Only |
| GET    | `/api/officer/complaints/:id`             | View complaint detail                | Officer Only |
| PATCH  | `/api/officer/complaints/:id/status`      | Update complaint status              | Officer Only |
| PATCH  | `/api/officer/complaints/:id/resolve`     | Resolve complaint (with remarks)     | Officer Only |
| PATCH  | `/api/officer/complaints/:id/priority`    | Set/change priority                  | Officer Only |
| PATCH  | `/api/officer/complaints/:id/close`       | Close complaint                      | Officer Only |
| GET    | `/api/officer/reports`                    | Generate officer reports             | Officer Only |

### 4.7 Feedback Routes (`/api/feedback`)

| Method | Endpoint            | Description                    | Auth      |
| ------ | ------------------- | ------------------------------ | --------- |
| POST   | `/api/feedback`     | Submit feedback                | Citizen   |
| GET    | `/api/feedback`     | Get all feedbacks (public)     | Public    |
| GET    | `/api/feedback/my`  | Get user's own feedbacks       | Citizen   |
| DELETE | `/api/feedback/:id` | Delete feedback                | Admin     |

### 4.8 Help/Support Routes (`/api/support`)

| Method | Endpoint              | Description                    | Auth      |
| ------ | --------------------- | ------------------------------ | --------- |
| POST   | `/api/support`        | Submit support query           | Citizen   |
| GET    | `/api/support`        | Get user's support tickets     | Citizen   |
| GET    | `/api/support/all`    | Get all support tickets        | Admin     |
| PUT    | `/api/support/:id`    | Respond to support ticket      | Admin     |

---

## 5. Frontend Pages & Components

### 5.1 Public Pages (Visitor)

| #  | Page              | Route          | Description                                              |
| -- | ----------------- | -------------- | -------------------------------------------------------- |
| 1  | **Home**          | `/`            | Hero, CTA buttons, stats, how-it-works, footer           |
| 2  | **Login**         | `/login`       | Email + password login (card layout)                     |
| 3  | **Signup**        | `/signup`      | Registration form with role selection                    |
| 4  | **Public Feedback** | `/feedbacks` | View public feedbacks/testimonials                       |

### 5.2 Citizen Pages

| #  | Page                  | Route                  | Description                                        |
| -- | --------------------- | ---------------------- | -------------------------------------------------- |
| 5  | **Citizen Dashboard** | `/dashboard`           | User's complaints list with status badges          |
| 6  | **Submit Complaint**  | `/submit-complaint`    | Form: category, city, address, image + submit      |
| 7  | **Complaint Detail**  | `/complaints/:id`      | Single complaint view with full details & status   |
| 8  | **Track Complaint**   | `/track-complaint`     | Track by complaint ID                              |
| 9  | **Download Receipt**  | `/complaints/:id/download` | Download complaint receipt                     |
| 10 | **Profile**           | `/profile`             | View/edit user profile                             |
| 11 | **Help/Support**      | `/support`             | Submit and view support queries                    |
| 12 | **Give Feedback**     | `/feedback`            | Submit feedback/rating                             |

### 5.3 Department Officer Pages

| #  | Page                    | Route                        | Description                                      |
| -- | ----------------------- | ---------------------------- | ------------------------------------------------ |
| 13 | **Officer Dashboard**   | `/officer`                   | Assigned complaints overview + stats             |
| 14 | **Officer Complaints**  | `/officer/complaints`        | List of assigned complaints with filters         |
| 15 | **Officer Complaint Detail** | `/officer/complaints/:id` | View detail, update status, resolve, set priority |
| 16 | **Officer Reports**     | `/officer/reports`           | Generate and view reports                        |

### 5.4 Admin Pages

| #  | Page                    | Route                        | Description                                      |
| -- | ----------------------- | ---------------------------- | ------------------------------------------------ |
| 17 | **Admin Dashboard**     | `/admin`                     | Stats overview (total, resolved, pending, etc.)  |
| 18 | **Manage Users**        | `/admin/users`               | List, edit roles, activate/deactivate users      |
| 19 | **Manage Complaints**   | `/admin/complaints`          | All complaints table + filters + assign officer  |
| 20 | **Admin Complaint Detail** | `/admin/complaints/:id`   | View detail, assign dept/officer                 |
| 21 | **Manage Categories**   | `/admin/categories`          | CRUD categories                                  |
| 22 | **Manage Departments**  | `/admin/departments`         | CRUD departments                                 |
| 23 | **Generate Reports**    | `/admin/reports`             | Filter & generate reports                        |
| 24 | **Manage Help/Support** | `/admin/support`             | View & respond to support tickets                |
| 25 | **Manage Feedbacks**    | `/admin/feedbacks`           | View & manage user feedbacks                     |

### 5.5 Key Reusable Components

| Component          | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `Navbar`           | Logo "GMCCP", nav links, role-based menu, profile dropdown |
| `Footer`           | Contact info, copyright, links                             |
| `Sidebar`          | Admin/Officer sidebar navigation                           |
| `HeroSection`      | Bold heading + CTA buttons (Register/Track Complaint)      |
| `StatsSection`     | Total Complaints, Resolved, In Progress counters           |
| `HowItWorks`       | 3-step visual guide                                        |
| `ComplaintCard`    | Card with complaint summary + status badge                 |
| `StatusBadge`      | New (Blue), In Progress (Orange), Resolved (Green), Closed (Gray) |
| `PriorityBadge`    | Low (Gray), Medium (Blue), High (Orange), Urgent (Red)     |
| `ProtectedRoute`   | Wrapper to check auth before rendering child routes        |
| `RoleRoute`        | Wrapper to check specific role (admin/officer/citizen)     |
| `DataTable`        | Reusable table with sorting, filtering, pagination         |
| `Modal`            | Reusable modal dialog                                      |
| `FileUpload`       | Image upload component with preview                        |
| `SearchFilter`     | Reusable filter bar (city, status, category, date range)   |

---

## 6. Design & Theme

- **Color Palette:** Blue (`#1a56db`), White (`#ffffff`), Light Saffron (`#ff9933`), Light Gray (`#f3f4f6`)
- **Style:** Clean government theme, professional, trustworthy
- **Typography:** Clean, accessible, high contrast
- **Layout:** Mobile responsive, card-based, modern shadows & smooth animations
- **Navbar:** Logo "GMCCP" + role-based navigation + user profile dropdown
- **Admin/Officer Layout:** Sidebar + main content area

### Status Badge Colors

| Status          | Color   | Tailwind Class                          |
| --------------- | ------- | --------------------------------------- |
| **New**         | Blue    | `bg-blue-100 text-blue-800`            |
| **In Progress** | Orange  | `bg-orange-100 text-orange-800`        |
| **Verified**    | Purple  | `bg-purple-100 text-purple-800`        |
| **Resolved**    | Green   | `bg-green-100 text-green-800`          |
| **Closed**      | Gray    | `bg-gray-100 text-gray-800`            |

### Priority Badge Colors

| Priority    | Color  | Tailwind Class                        |
| ----------- | ------ | ------------------------------------- |
| **Low**     | Gray   | `bg-gray-100 text-gray-700`          |
| **Medium**  | Blue   | `bg-blue-100 text-blue-700`          |
| **High**    | Orange | `bg-orange-100 text-orange-700`      |
| **Urgent**  | Red    | `bg-red-100 text-red-700`            |

---

## 7. Project Folder Structure

```
gmccp/
├── client/                          # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/                  # Images, icons, logos
│   │   ├── components/              # Reusable UI components
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── DataTable.jsx
│   │   │   │   ├── FileUpload.jsx
��   │   │   │   ├── SearchFilter.jsx
│   │   │   │   ├── StatusBadge.jsx
│   │   │   │   ├── PriorityBadge.jsx
│   │   │   │   └── Loader.jsx
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── StatsSection.jsx
│   │   │   │   └── HowItWorks.jsx
│   │   │   ├── complaints/
│   │   │   │   └── ComplaintCard.jsx
│   │   │   └── auth/
│   │   │       ├── ProtectedRoute.jsx
│   │   │       └── RoleRoute.jsx
│   │   ├── pages/                   # Page-level components
│   │   │   ├── public/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Signup.jsx
│   │   │   │   └── PublicFeedbacks.jsx
│   │   │   ├── citizen/
│   │   │   │   ├── CitizenDashboard.jsx
│   │   │   │   ├── SubmitComplaint.jsx
│   │   │   │   ├── ComplaintDetail.jsx
│   │   │   │   ├── TrackComplaint.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── Support.jsx
│   │   │   │   └── Feedback.jsx
│   │   │   ├── officer/
│   │   │   │   ├── OfficerDashboard.jsx
│   │   │   │   ├── OfficerComplaints.jsx
│   │   │   │   ├── OfficerComplaintDetail.jsx
│   │   │   │   └── OfficerReports.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── ManageUsers.jsx
│   │   │       ├── ManageComplaints.jsx
│   │   │       ├── AdminComplaintDetail.jsx
│   │   │       ├── ManageCategories.jsx
│   │   │       ├── ManageDepartments.jsx
│   │   │       ├── GenerateReports.jsx
│   │   │       ├── ManageSupport.jsx
│   │   │       └── ManageFeedbacks.jsx
│   │   ├── context/                 # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── services/                # Axios API service layer
│   │   │   ├── api.js               # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── complaintService.js
│   │   │   ├── categoryService.js
│   │   │   ├── departmentService.js
│   │   │   ├── feedbackService.js
│   │   │   ├── supportService.js
│   │   │   └── reportService.js
│   │   ├── utils/                   # Helper functions
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                # Tailwind directives
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── complaintController.js
│   │   ├── adminController.js
│   │   ├── officerController.js
│   │   ├── categoryController.js
│   │   ├── departmentController.js
│   │   ├── feedbackController.js
│   │   ├── supportController.js
│   │   └── reportController.js
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   ├── roleMiddleware.js        # Role-based access
│   │   └── uploadMiddleware.js      # Multer config
│   ├── models/
│   │   ├── User.js
│   │   ├── Complaint.js
│   │   ├── Category.js
│   │   ├── Department.js
│   │   ├── Feedback.js
│   │   ├── HelpSupport.js
│   │   └── Report.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── complaintRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── officerRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── departmentRoutes.js
│   │   ├── feedbackRoutes.js
│   │   ├── supportRoutes.js
│   │   └── reportRoutes.js
│   ├── utils/
│   │   ├── emailService.js          # Nodemailer helper
│   │   ├── cloudinary.js            # Cloudinary upload helper
│   │   └── generateComplaintId.js   # Auto-generate complaint IDs
│   ├── index.js                     # Entry point
│   ├── .env                         # Environment variables
│   └── package.json
│
├── docker-compose.yml               # Docker Compose for MongoDB
├── .gitignore
├── README.md
└── docs/                            # Requirements, plan, DFD diagrams
    ├── requirement.txt
    ├── GMCCP_step_by_step_plan.txt
    ├── GMCCP_PROJECT_PLAN.md
    └── *.jpg                        # DFD diagrams (Context, Admin L1, Citizen L1, Officer L1)
```

---

## 8. Docker Setup (MongoDB)

MongoDB will run inside a Docker container using Docker Compose.

### `docker-compose.yml`

```yaml
version: "3.8"
services:
  mongodb:
    image: mongo:7
    container_name: gmccp-mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin123
      MONGO_INITDB_DATABASE: gmccp
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### Connection String (for `server/.env`)

```
MONGO_URI=mongodb://admin:admin123@localhost:27017/gmccp?authSource=admin
```

### Commands

```bash
# Start MongoDB container
docker-compose up -d

# Stop MongoDB container
docker-compose down

# View logs
docker-compose logs -f mongodb
```

---

## 9. Authentication & Authorization Flow

### 9.1 Auth Flow

```
┌─────────┐     POST /api/auth/register      ┌──────────┐     ┌──────────┐
│  Client  │ ──────────────────────────────► │  Server   │ ──► │ MongoDB  │
│ (React)  ��                                  │ (Express) │     │ (Docker) │
│          │     POST /api/auth/login         │           │     │          │
│          │ ──────────────────────────────► │           │     │          │
│          │ ◄────────── JWT Token ────────── │           │     │          │
│          │                                  │           │     │          │
│          │  Authorization: Bearer <token>   │           │     │          │
│          │ ──────────────────────────────► │ verify ──►│ ──► │          │
│          │ ◄────────── Protected Data ───── │           │     │          │
└─────────┘                                  └──────────┘     └──────────┘
```

### 9.2 Role-Based Access Control

```
Middleware Chain:
  Request → authMiddleware (verify JWT) → roleMiddleware(roles[]) → Controller

Examples:
  Admin routes:    authMiddleware → roleMiddleware(['admin'])
  Officer routes:  authMiddleware → roleMiddleware(['officer'])
  Citizen routes:  authMiddleware → roleMiddleware(['citizen'])
  Public routes:   No middleware
```

### 9.3 JWT Payload

```json
{
  "id": "user_mongo_id",
  "role": "admin | citizen | officer",
  "iat": 1234567890,
  "exp": 1234567890
}
```

---

## 10. Complaint Lifecycle (State Machine)

```
  ┌───────┐    Officer/Admin     ┌─────────────┐    Officer       ┌──────────┐    Officer     ┌────────┐
  │  New   │ ──────────────────► │ In Progress  │ ──────────────► │ Resolved │ ─────────────► │ Closed │
  └───────┘    picks up          └─────────────┘    resolves      └──────────┘   closes       └────────┘
      │                                │                                │
      │         Admin verifies         │                                │
      └──────────────────────────────► │                                │
               (Verified)              │         Citizen gives          │
                                       │         feedback              │
                                       └─────────────────────���─────────┘
```

| Status        | Who Changes It     | Description                              |
| ------------- | ------------------ | ---------------------------------------- |
| **New**       | System (auto)      | Complaint just submitted by citizen      |
| **In Progress** | Officer/Admin    | Officer starts working on it             |
| **Verified**  | Admin              | Admin verifies complaint is legitimate   |
| **Resolved**  | Officer            | Officer resolves with remarks            |
| **Closed**    | Officer/Admin      | Final closure after resolution           |

---

## 11. Environment Variables

### `server/.env`

```env
PORT=5000
MONGO_URI=mongodb://admin:admin123@localhost:27017/gmccp?authSource=admin
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=no-reply@gmccp.gov.in

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 12. Development Phases & Timeline

### Phase 1: Project Setup & Infrastructure (Day 1-2) ✅ COMPLETED

- [x] Create project folder structure
- [x] Initialize `server/` with Express boilerplate (express, mongoose, cors, jwt, bcrypt, multer, etc.)
- [x] Initialize `client/` with Vite + React + Tailwind CSS (+ axios, react-router-dom, react-icons, react-hot-toast, recharts)
- [x] Setup `docker-compose.yml` for MongoDB
- [x] Start MongoDB container, verify connection
- [x] Create `.env` files with config
- [x] Setup `.gitignore` and initialize Git repo
- [x] Create DB connection utility (`config/db.js`)
- [x] Create all 7 Mongoose models (User, Complaint, Category, Department, Feedback, HelpSupport, Report)
- [x] Create middleware (authMiddleware, roleMiddleware, uploadMiddleware)
- [x] Create placeholder route files for all 8 route groups
- [x] Create AuthContext, ProtectedRoute, RoleRoute on frontend
- [x] Create Navbar, Footer, Sidebar, StatusBadge, PriorityBadge, Loader components
- [x] Create Home page (HeroSection, StatsSection, HowItWorks)
- [x] Create Login, Signup, Unauthorized, NotFound pages
- [x] Create all placeholder pages (citizen, officer, admin)
- [x] Create AdminLayout, OfficerLayout with sidebar
- [x] Setup complete React Router with all 25+ routes
- [x] Create Axios API service with JWT interceptor

### Phase 2: Backend – Models & Auth (Day 3-5) ✅ COMPLETED

- [x] All 7 Mongoose models already created in Phase 1
- [x] Implement auth controller: register, login, getMe, updateProfile
- [x] Implement auth routes with express-validator + rate limiting
- [x] JWT middleware and role middleware already created in Phase 1
- [x] Seed script created with: 1 admin, 3 officers, 2 citizens, 7 departments, 10 categories
- [x] Seed data populated successfully in Docker MongoDB

### Phase 3: Backend – Core APIs (Day 6-9) ✅ COMPLETED

- [x] Complaint controller: create (with image upload), list user's complaints, detail, track by ID
- [x] Multer configured for local file upload (5MB limit, image types only)
- [x] Auto-generated complaint IDs (`GMCCP-2025-XXXXX`) via Mongoose pre-save hook
- [x] Category controller: CRUD (public list, admin create/update/delete)
- [x] Department controller: CRUD (protected list, admin create/update/delete)
- [x] Admin controller: stats, all complaints with filters/search, assign officer, update status, manage users
- [x] Officer controller: assigned complaints, update status, resolve with remarks, set priority, close, stats
- [x] Feedback controller: citizen submit, public list, user's feedbacks, admin delete
- [x] Support controller: citizen create ticket, user's tickets, admin list all, admin respond
- [x] All 8 route files fully implemented with validation and role-based middleware

### Phase 4: Frontend – Layout, Auth & Public Pages (Day 10-12) ✅ COMPLETED

- [x] Navbar with role-based navigation + profile dropdown (built in Phase 1)
- [x] Footer with contact info (built in Phase 1)
- [x] Sidebar for admin/officer layouts (built in Phase 1)
- [x] Home page with real-time stats from `/api/public/stats`
- [x] Login page with form validation + role-based redirect
- [x] Signup page with validation
- [x] PublicFeedbacks page with average rating display
- [x] AuthContext, Axios interceptor, React Router (built in Phase 1)

### Phase 5: Frontend – Citizen Flow (Day 13-15) ✅ COMPLETED

- [x] CitizenDashboard with real complaint data, stats cards, status filter
- [x] SubmitComplaint with category dropdown, city selector, image upload + preview
- [x] ComplaintDetail with full info, image, officer/department, remarks
- [x] TrackComplaint with search by complaint ID + status timeline
- [x] Profile page with inline edit (name, phone, city, address)
- [x] Support page with create ticket + view responses
- [x] Feedback page with star rating + comment + history
- [x] ComplaintCard reusable component with status/priority badges

### Phase 6: Frontend – Department Officer Flow (Day 16-17) ✅ COMPLETED

- [x] OfficerDashboard with real stats from `/api/officer/stats`
- [x] OfficerComplaints list with status + priority filters
- [x] OfficerComplaintDetail with: update status, set priority, resolve with remarks, close
- [x] OfficerReports with status/priority breakdown
- [x] All officer pages connected to backend APIs

### Phase 7: Frontend – Admin Panel (Day 18-21) ✅ COMPLETED

- [x] AdminDashboard with 9 stat cards from `/api/admin/stats`
- [x] ManageUsers with search, role filter, edit role, activate/deactivate
- [x] ManageComplaints with search, status filter, status dropdown, assign modal (officer + department)
- [x] AdminComplaintDetail with status update + assign officer/department
- [x] ManageCategories with CRUD (create, edit, deactivate)
- [x] ManageDepartments with CRUD (create, edit, deactivate)
- [x] GenerateReports with complaints by status, city, category + summary
- [x] ManageSupport with respond to tickets + close
- [x] ManageFeedbacks with view + delete
- [x] All admin pages connected to backend APIs

### Phase 8: Polish, Testing & Documentation (Day 22-24) ✅ COMPLETED

- [x] Responsive design (Tailwind responsive classes throughout)
- [x] UI polish: card shadows, hover effects, transitions, loading spinners
- [x] Form validation on frontend (required fields, password match, email format)
- [x] Form validation on backend (express-validator)
- [x] Error handling with react-hot-toast notifications
- [x] Rate limiting on auth endpoints
- [x] README.md with setup instructions
- [x] .env.example files created
- [x] Seed script with demo data (admin, officers, citizens, categories, departments)

---

## 13. Key npm Packages

### Backend (`server/`)

| Package            | Purpose                    |
| ------------------ | -------------------------- |
| express            | Web framework              |
| mongoose           | MongoDB ODM                |
| dotenv             | Environment variables      |
| bcryptjs           | Password hashing           |
| jsonwebtoken       | JWT auth tokens            |
| cors               | Cross-origin requests      |
| multer             | File upload handling       |
| cloudinary         | Cloud image storage        |
| express-validator  | Input validation           |
| express-rate-limit | Rate limiting              |
| nodemailer         | Email sending              |
| nodemon (dev)      | Auto-restart on changes    |

### Frontend (`client/`)

| Package            | Purpose                    |
| ------------------ | -------------------------- |
| react              | UI library                 |
| react-dom          | React DOM rendering        |
| react-router-dom   | Client-side routing        |
| axios              | HTTP client                |
| tailwindcss        | Utility-first CSS          |
| react-icons        | Icon library               |
| react-hot-toast    | Toast notifications        |
| recharts           | Charts for dashboards      |
| react-select       | Enhanced dropdowns         |

---

## 14. How to Run the Project

### Prerequisites

- Node.js (v18+ LTS)
- Docker & Docker Compose
- Git

### Step-by-step

```bash
# 1. Clone the repository
git clone <repo-url>
cd gmccp

# 2. Start MongoDB via Docker
docker-compose up -d

# 3. Setup & run Backend
cd server
npm install
cp .env.example .env    # Edit with your values
npm run dev             # Runs on http://localhost:5000

# 4. Setup & run Frontend (new terminal)
cd client
npm install
npm run dev             # Runs on http://localhost:5173

# 5. Open browser → http://localhost:5173
```

---

## 15. Security Considerations

- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT-based stateless authentication
- ✅ Role-based access control (4 roles: admin, citizen, officer, visitor)
- ✅ Input validation on both frontend and backend (express-validator)
- ✅ CORS configured to allow only frontend origin
- ✅ File upload size limits via Multer (max 5MB)
- ✅ Environment variables for secrets (never committed)
- ✅ Rate limiting on auth endpoints (express-rate-limit)
- ✅ MongoDB injection prevention (Mongoose sanitization)

---

## 16. Future Enhancements (Optional)

- 🌐 Multi-language support (English, Hindi, Gujarati) using `react-i18next`
- 📧 Auto-email notifications to department on complaint assignment
- 📊 Advanced analytics dashboard with charts
- 🔔 Real-time notifications (Socket.io)
- 📱 PWA support for mobile
- 🐳 Full Docker setup (Dockerize frontend + backend + nginx + MongoDB)
- 🧪 Unit & integration tests (Jest + Supertest + React Testing Library)
- 📄 PDF export for complaint receipts and reports
- 🗺️ Map integration for complaint location

---

## 17. DFD Diagram References

The following DFD diagrams in `docs/` folder define the complete system architecture:

| Image File | Diagram | Description |
| ---------- | ------- | ----------- |
| `ebc49a59-fd69-4228-916d-3ef2f38c88f9.jpg` | **Context Diagram (Level 0)** | Shows all 4 actors (Admin, Citizen, Officer, Visitor) and their interactions with GMCCP |
| `a3764432-43ed-4f73-bac8-b32933f8cb45.jpg` | **Admin Level 1 DFD** | 9 processes: Registration, Login, Manage Users, Manage Complaints, Manage Categories, Manage Departments, Generate Reports, Manage Help/Support, Manage Feedbacks |
| `de404152-0c51-4088-a8c8-370b9286ad03.jpg` | **Citizen/User Level 1 DFD** | 9 processes: Registration, Login, Manage Profile, Add Complaint, Manage Categories, Complaint Status, Help/Support, Download Complaint, Give Feedback |
| `e941e804-0c91-4019-a2be-6ef384890ed9.jpg` | **Department Officer Level 1 DFD** | 7 processes: Registration, Login, View Complaints, Update Status, Resolve Complaint, Manage Priority, Generate Reports |

---

> **📌 This plan is ready for review.** Once approved, development will begin phase by phase starting with project setup, Docker-based MongoDB, and backend models/auth.
