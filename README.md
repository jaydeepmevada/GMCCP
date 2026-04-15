# GMCCP - Gujarat Municipal Corporation Complaint Portal

GMCCP ek MERN stack based web application hai jiska kaam citizens ko municipal complaints submit karne, unko track karne, aur officers/admin ko un complaints ko manage karne ki facility dena hai.

Is project me 3 main roles hain:

- `citizen` - complaint submit karta hai, status track karta hai, feedback aur support ticket bhej sakta hai
- `officer` - assigned complaints dekhkar unka status, priority aur resolution manage karta hai
- `admin` - poore system ke users, complaints, departments, categories, reports, support aur feedback ko control karta hai

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcryptjs
- **File Upload:** Multer + optional Cloudinary

## Quick Start

### Prerequisites

- Node.js v18+
- MongoDB Atlas database

### 1. Start Backend

```bash
cd server
npm install
npm run dev
```

### 2. Start Frontend

```bash
cd client
npm install
npm run dev
```

### 3. Open Browser

`http://localhost:5173`

## Project Ka Main Idea

Ye project ek complaint management portal hai jahan:

1. User signup/login karta hai
2. Citizen complaint submit karta hai
3. Complaint category ke basis par department se link hoti hai
4. System available officer ko auto-assign kar sakta hai
5. Officer complaint process karta hai
6. Admin complaints, users, reports aur support ko manage karta hai

Simple flow:

`Frontend Form -> API Call -> Express Route -> Controller -> MongoDB -> Response -> UI Update`

## Root Folder Explanation

### `package.json`

Ye root workspace file hai. Isme `client` aur `server` dono workspaces ke roop me define kiye gaye hain. Root level build command frontend build ke liye use hoti hai.

### `vercel.json`

Vercel deployment configuration hai. Frontend build aur backend API rewrite/serve karne me help karta hai.

### `api/[...path].js`

Ye Vercel serverless bridge file hai. Iska kaam Express backend ko Vercel ke serverless function ke through chalana hai. Ye DB connection ensure karta hai aur phir request ko `server/app.js` ko pass karta hai.

### `docs/`

Documentation aur reference assets ke liye folder hai.

## Project Structure

```text
gmccp/
|- client/              # React frontend
|- server/              # Express backend
|- api/                 # Vercel serverless bridge
|- docs/                # Docs and reference assets
\- README.md
```

## Backend Ka Full Explanation

Backend `server/` folder ke andar hai. Iska kaam API banana, auth handle karna, DB me data store karna, aur business logic execute karna hai.

## Backend Entry Files

### `server/index.js`

Ye backend ka starting point hai.

Is file me:

- `.env` variables load hote hain
- MongoDB se connection hota hai
- Express app import hota hai
- server specific port par listen karta hai

Matlab ye actual app ko start karta hai.

### `server/app.js`

Ye main Express app configuration file hai.

Isme:

- `express.json()` aur `express.urlencoded()` body parsing ke liye use hua hai
- CORS configure kiya gaya hai
- `/uploads` static folder serve hota hai
- saare route modules mount kiye gaye hain
- `/api/health` health check diya gaya hai
- `/api/public/stats` home page ke liye public stats deta hai
- 404 aur global error handler defined hai

Ye backend ka central router aur middleware hub hai.

## Backend Config

### `server/config/db.js`

Ye MongoDB connection file hai.

Is file ka kaam:

- `MONGO_URI` se DB connect karna
- duplicate connection ko avoid karna
- connection ke baad default master data bootstrap karna

Yani app chalne par departments/categories/admin automatically ensure kiye ja sakte hain.

### `server/config/cloudinary.js`

Ye check karta hai ki Cloudinary environment variables available hain ya nahi.

- Agar config available hai to image Cloudinary par upload hogi
- Warna local disk upload fallback use hoga

## Backend Models

Models database ki structure define karte hain.

### `server/models/User.js`

User model me ye fields hain:

- `name`
- `email`
- `password`
- `phone`
- `role`
- `department`
- `profileImage`
- `address`
- `city`
- `isActive`

Special points:

- password save hone se pehle hash hota hai
- `matchPassword()` method login ke time password compare karta hai
- role values: `citizen`, `admin`, `officer`

### `server/models/Complaint.js`

Complaint model is project ka core model hai.

Important fields:

- `complaintId`
- `user`
- `title`
- `description`
- `category`
- `city`
- `state`
- `address`
- `imageUrl`
- `status`
- `priority`
- `assignedTo`
- `department`
- `remarks`
- `resolvedAt`

Special point:

- save hone se pehle complaint ID auto-generate hoti hai, jaise `GMCCP-2026-00001`

### `server/models/Category.js`

Complaint categories store karta hai, jaise:

- Water Supply Issue
- Road Damage
- Garbage Collection

Har category optionally kisi department se linked hoti hai.

### `server/models/Department.js`

Department ka data store karta hai:

- name
- description
- contactEmail
- contactPerson
- isActive

### `server/models/Feedback.js`

User ki rating aur comment store karta hai. Complaint ke saath link bhi ho sakta hai.

### `server/models/HelpSupport.js`

Citizen support tickets aur admin responses ke liye hai.

Fields:

- subject
- message
- response
- status

### `server/models/Report.js`

Admin generated reports store karta hai. Report type aur computed data yahi save hota hai.

## Backend Middleware

### `server/middleware/authMiddleware.js`

Ye JWT token verify karta hai.

Kaam:

- Authorization header se token lena
- token verify karna
- user fetch karke `req.user` me attach karna
- inactive user ko block karna

### `server/middleware/roleMiddleware.js`

Role-based authorization handle karta hai.

Example:

- sirf admin route
- sirf officer route
- sirf citizen route

### `server/middleware/uploadMiddleware.js`

Complaint image upload handle karta hai.

Kaam:

- multer setup
- image type validation
- max file size check
- Cloudinary ya local storage select karna

## Backend Routes

Routes ka kaam URL ko controller functions se connect karna hai.

### `server/routes/authRoutes.js`

Endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/auth/profile`

Yahan validation aur rate-limiting bhi lagi hui hai.

### `server/routes/complaintRoutes.js`

Endpoints:

- `POST /api/complaints`
- `GET /api/complaints`
- `GET /api/complaints/track/:complaintId`
- `GET /api/complaints/:id`

Citizen complaint submit aur track yahi se karta hai.

Note:

- complaint submit citizen-only protected route hai
- tracking ke liye frontend par public page available hai, lekin backend tracking endpoint currently protected hai

### `server/routes/adminRoutes.js`

Admin-only operations:

- stats
- complaints list
- assign complaint
- change status
- users list/update
- reports generate/list

### `server/routes/officerRoutes.js`

Officer-only operations:

- assigned complaints list
- complaint detail
- status change
- resolve complaint
- priority set
- close complaint
- stats

### `server/routes/categoryRoutes.js`

Category CRUD/deactivate handle karti hai.

### `server/routes/departmentRoutes.js`

Department CRUD/deactivate handle karti hai.

### `server/routes/feedbackRoutes.js`

Feedback submit, own feedback fetch, public feedback list aur admin delete handle karti hai.

### `server/routes/supportRoutes.js`

Citizen support ticket create karta hai, admin response deta hai.

## Backend Controllers

Controllers me actual business logic likha hua hai.

### `server/controllers/authController.js`

Is file ka kaam:

- register user
- login user
- JWT token generate karna
- logged-in user detail dena
- profile update karna

Important note:

Public registration mostly citizen ke liye hai, lekin current logic me `officer` role bhi allow ho raha hai agar body me diya jaye. Ye ek business-rule concern ho sakta hai.

### `server/controllers/complaintController.js`

Ye complaint system ka main logic handle karta hai.

Functions:

- `createComplaint`
- `getMyComplaints`
- `getComplaintById`
- `trackComplaint`

`createComplaint` me important flow:

1. request validate hoti hai
2. image upload hoti hai
3. category ke through department nikala jata hai
4. same department ka active officer find hota hai
5. complaint create hoti hai
6. agar officer mil jaye to complaint auto-assign ho jati hai aur status `In Progress` ho jata hai

### `server/controllers/adminController.js`

Admin ke saare powerful operations yahan hain.

Main functions:

- `getStats`
- `getAllComplaints`
- `getComplaintById`
- `assignComplaint`
- `updateComplaintStatus`
- `getAllUsers`
- `updateUser`
- `deactivateUser`
- `generateReport`
- `getReports`

Is controller se admin:

- complaints search/filter kar sakta hai
- officer/department assign kar sakta hai
- status manually change kar sakta hai
- users ko activate/deactivate kar sakta hai
- reports generate kar sakta hai

### `server/controllers/officerController.js`

Officer side business logic yahan likha hai.

Main functions:

- `getAssignedComplaints`
- `getComplaintDetail`
- `updateStatus`
- `resolveComplaint`
- `setPriority`
- `closeComplaint`
- `getOfficerStats`

Officer sirf wahi complaints dekh sakta hai jo usko assign hui hain.

### `server/controllers/categoryController.js`

Category list, create, update aur soft-delete jaisa behavior handle karta hai. Delete actual DB delete nahi karta, `isActive = false` karta hai.

### `server/controllers/departmentController.js`

Department create/update/deactivate ka logic handle karta hai.

### `server/controllers/feedbackController.js`

Feedback create, fetch aur delete ka logic handle karta hai.

### `server/controllers/supportController.js`

Support tickets create, fetch aur admin response handle karta hai.

## Default Data / Seed Logic

### `server/utils/bootstrapMasterData.js`

App start hote hi default:

- departments
- categories
- ek admin user

ensure karta hai.

### `server/seed.js`

Ye manual seed script hai jo sample data insert karti hai:

- multiple admin users
- multiple officers
- sample citizens
- departments
- categories

Testing/demo ke liye useful hai.

## Frontend Ka Full Explanation

Frontend `client/` folder ke andar hai. Iska kaam UI banana, routes manage karna, forms handle karna, aur backend se API calls karke data show karna hai.

## Frontend Entry Files

### `client/src/main.jsx`

React app ko DOM me mount karta hai.

### `client/src/App.jsx`

Ye frontend ki main routing file hai.

Isme:

- public routes define hain
- citizen routes define hain
- officer routes define hain
- admin routes define hain
- navbar/footer globally lage hue hain
- toast notifications ka setup hai

Yahi app ka route map hai.

## Frontend API Layer

### `client/src/services/api.js`

Ye centralized axios instance hai.

Kaam:

- base URL set karna
- token automatically header me attach karna
- production/local API config handle karna
- 401 error par local storage clear karke login page par bhejna

Iska matlab frontend me direct `fetch` jagah-jagah use nahi hua, ek common API service use hui hai.

## Auth Context

### `client/src/context/AuthContext.jsx`

Ye authentication state manage karta hai.

Functions:

- `login`
- `register`
- `logout`
- `updateProfile`

State:

- `user`
- `token`
- `loading`

Derived flags:

- `isAuthenticated`
- `isAdmin`
- `isOfficer`
- `isCitizen`

Ye poore frontend me user ki info share karta hai.

## Route Protection

### `client/src/components/auth/ProtectedRoute.jsx`

Agar user login nahi hai to protected page access nahi karne deta aur `/login` par redirect karta hai.

### `client/src/components/auth/RoleRoute.jsx`

Specific role ke bina page access nahi hota. Example:

- admin route me officer nahi ja sakta
- officer route me citizen nahi ja sakta

## Layout Components

### `client/src/layouts/AdminLayout.jsx`

Admin panel ke liye sidebar + content layout.

### `client/src/layouts/OfficerLayout.jsx`

Officer panel ke liye sidebar + content layout.

## Common UI Components

### `client/src/components/common/Navbar.jsx`

Top navigation bar hai.

Features:

- public links
- authenticated dashboard link
- citizen-specific actions
- profile dropdown
- mobile menu
- logout action

### `client/src/components/common/Sidebar.jsx`

Admin aur officer ke liye side navigation provide karta hai.

### `client/src/components/common/StatusBadge.jsx`

Complaint status ko colored badge me dikhata hai.

### `client/src/components/common/PriorityBadge.jsx`

Priority ko colored badge me dikhata hai.

### `client/src/components/common/Loader.jsx`

Loading UI ke liye.

### `client/src/components/common/Footer.jsx`

Site footer.

### `client/src/components/complaints/ComplaintCard.jsx`

Citizen dashboard me complaint summary card show karta hai.

## Public Pages

### `client/src/pages/public/Home.jsx`

Landing page hai.

Is page me:

- hero section
- public stats
- how it works
- feature cards
- CTA section

Ye app ka marketing/information page hai.

### `client/src/pages/public/Login.jsx`

Login form page.

Flow:

1. email/password leta hai
2. AuthContext ka `login()` call karta hai
3. role ke basis par redirect karta hai:
   - admin -> `/admin`
   - officer -> `/officer`
   - citizen -> `/dashboard`

### `client/src/pages/public/Signup.jsx`

Citizen registration form hai.

Ye:

- form validation karta hai
- password confirm check karta hai
- register API hit karta hai
- success par citizen dashboard bhej deta hai

### `client/src/pages/public/PublicFeedbacks.jsx`

Public feedback list show karta hai.

### `client/src/pages/public/Unauthorized.jsx`

Unauthorized access page.

### `client/src/pages/public/NotFound.jsx`

404 page.

## Citizen Pages

### `client/src/pages/citizen/CitizenDashboard.jsx`

Citizen ki complaints fetch karta hai aur dashboard style me show karta hai.

Features:

- welcome section
- stats cards
- status filter
- complaint cards list
- new complaint button

### `client/src/pages/citizen/SubmitComplaint.jsx`

Complaint submission form hai.

Fields:

- title
- category
- description
- city
- state
- address
- image

Flow:

1. categories backend se fetch hoti hain
2. user form fill karta hai
3. `FormData` ke through multipart request backend ko bheji jati hai
4. success par complaint ID toast me show hoti hai

### `client/src/pages/citizen/ComplaintDetail.jsx`

Citizen ki specific complaint ki detail show karta hai:

- complaint ID
- title
- status
- priority
- description
- image
- category
- location
- assigned officer
- department
- remarks

### `client/src/pages/citizen/TrackComplaint.jsx`

Complaint ID dal kar status timeline dekhne ka page hai.

Important note:

- ye route frontend par public dikh raha hai
- lekin backend ka `/api/complaints/track/:complaintId` endpoint token-protected hai
- isliye current code ke hisaab se tracking effectively logged-in user ke through hoti hai

Yahan complaint ka status order dikhaya gaya hai:

- New
- In Progress
- Verified
- Resolved
- Closed

### `client/src/pages/citizen/Profile.jsx`

Citizen apna:

- name
- phone
- city
- address

update kar sakta hai.

### `client/src/pages/citizen/Support.jsx`

Citizen support tickets create aur view kar sakta hai.

### `client/src/pages/citizen/Feedback.jsx`

Citizen star rating aur comment ke through feedback de sakta hai. Apne purane feedbacks bhi dekh sakta hai.

## Officer Pages

### `client/src/pages/officer/OfficerDashboard.jsx`

Officer ko assigned complaints ka dashboard stats milta hai:

- total
- in progress
- resolved
- closed

### `client/src/pages/officer/OfficerComplaints.jsx`

Officer assigned complaints ko table format me dekhta hai.

Features:

- status filter
- priority filter
- complaint detail link

### `client/src/pages/officer/OfficerComplaintDetail.jsx`

Officer single complaint par:

- detail dekh sakta hai
- status update kar sakta hai
- priority change kar sakta hai
- remarks ke saath resolve kar sakta hai
- close kar sakta hai

### `client/src/pages/officer/OfficerReports.jsx`

Officer side reporting/summary screen ke liye hai.

## Admin Pages

### `client/src/pages/admin/AdminDashboard.jsx`

System overview cards dikhata hai:

- total complaints
- new complaints
- in progress
- resolved
- closed
- citizens
- officers
- categories
- departments

### `client/src/pages/admin/ManageUsers.jsx`

Admin users manage karta hai.

Kaam:

- search by name/email
- role filter
- role update
- active/inactive toggle

### `client/src/pages/admin/ManageComplaints.jsx`

Admin complaints manage karta hai.

Features:

- search
- status filter
- complaint list
- status change
- assign officer
- assign department
- pagination

### `client/src/pages/admin/AdminComplaintDetail.jsx`

Admin complaint ki complete detail dekhta hai.

### `client/src/pages/admin/ManageCategories.jsx`

Category create/update/deactivate.

### `client/src/pages/admin/ManageDepartments.jsx`

Department create/update/deactivate.

### `client/src/pages/admin/GenerateReports.jsx`

Admin different types ke reports generate kar sakta hai:

- complaints
- department
- status
- city
- priority

### `client/src/pages/admin/ManageSupport.jsx`

All support tickets dekhne aur respond karne ke liye.

### `client/src/pages/admin/ManageFeedbacks.jsx`

All feedbacks dekhne aur delete karne ke liye.

## Home Page Components

`client/src/components/home/` folder me landing page ke reusable sections hain:

- `HeroSection.jsx`
- `StatsSection.jsx`
- `HowItWorks.jsx`
- `Illustrations.jsx`

Ye project ke public homepage ko visually rich banate hain.

## Complaint Lifecycle Samajhne Ka Easy Tarika

Complaint ka end-to-end flow:

1. Citizen `SubmitComplaint` page se form bhejta hai
2. Frontend request `/api/complaints` ko bhejta hai
3. Backend `complaintRoutes.js` route hit karta hai
4. `authMiddleware` token verify karta hai
5. `complaintController.createComplaint()` run hota hai
6. category se department nikala jata hai
7. available officer auto-assign ho sakta hai
8. complaint MongoDB me save hoti hai
9. citizen dashboard par complaint visible ho jati hai
10. officer usko update/resolve karta hai
11. admin poora complaint lifecycle monitor kar sakta hai

## Authentication Flow

1. User login/register karta hai
2. Backend JWT token return karta hai
3. Frontend token ko `localStorage` me save karta hai
4. Har next API request me token `Authorization: Bearer <token>` header me jata hai
5. Backend token verify karke `req.user` banata hai
6. Role middleware route access decide karta hai

## Deployment Notes

### Full Stack on Vercel

- Repo root me `vercel.json` diya gaya hai
- Vercel frontend build karta hai
- backend `api/[...path].js` ke through serve hota hai
- same-origin deployment ho to `VITE_API_URL` empty rakha ja sakta hai
- `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL` set karna hota hai
- image uploads ke liye Cloudinary keys set karni hoti hain

### Atlas Notes

- local MongoDB URI ki jagah Atlas URI use karein
- database user aur network access allow karein
- health check: `https://your-vercel-domain/api/health`

## Important Summary

Short me:

- `client/` UI aur user interaction handle karta hai
- `server/` API, auth, DB aur business logic handle karta hai
- `User`, `Complaint`, `Category`, `Department` core models hain
- `AuthContext` frontend auth state manage karta hai
- `complaintController` complaint workflow ka heart hai
- `adminController` poore portal ka control panel logic hai
- `officerController` field-level complaint processing handle karta hai

## Agar Aap Is Project Ko Padhna Chahte Ho To Best Order

Recommended reading order:

1. `README.md`
2. `server/index.js`
3. `server/app.js`
4. `server/models/`
5. `server/routes/`
6. `server/controllers/`
7. `client/src/App.jsx`
8. `client/src/context/AuthContext.jsx`
9. `client/src/services/api.js`
10. `client/src/pages/`

Is order me padhoge to project jaldi samajh aa jayega.
