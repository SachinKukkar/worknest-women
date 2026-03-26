# 🌸 WorkNest Women — Complete Setup & Deployment Guide

---

## 📁 Project Structure

```
worknest/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── models/
│   │   ├── User.js
│   │   ├── Skill.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   └── Transaction.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   ├── transactionController.js
│   │   └── skillController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── jobs.js
│   │   ├── applications.js
│   │   ├── transactions.js
│   │   └── skills.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   └── seed/
│       └── seed.js
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── context/
        │   └── AuthContext.jsx
        ├── services/
        │   └── api.js
        ├── components/
        │   └── layout/
        │       └── Layout.jsx
        └── pages/
            ├── Landing.jsx
            ├── Login.jsx
            ├── Register.jsx
            ├── Dashboard.jsx
            ├── SkillSelection.jsx
            ├── Jobs.jsx
            ├── JobDetail.jsx
            ├── Applications.jsx
            ├── FinancialDashboard.jsx
            └── Profile.jsx
```

---

## 🚀 LOCAL SETUP (Step by Step)

### Prerequisites
- Node.js v18+ → https://nodejs.org
- MongoDB Community → https://www.mongodb.com/try/download/community
  OR use MongoDB Atlas (free cloud, recommended)

---

### Step 1 — Clone / create the project folder

```bash
# Place all files as shown in the structure above
# Then navigate to the project root:
cd worknest
```

---

### Step 2 — Backend Setup

```bash
cd backend

# Copy env file
cp .env.example .env
```

Edit `.env`:
```env
MONGO_URI=mongodb://localhost:27017/worknest
JWT_SECRET=worknest_super_secret_key_2024_change_in_prod
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

```bash
# Install dependencies
npm install

# Seed the database with demo data
npm run seed
```

You'll see:
```
✅ Connected to MongoDB
🗑️  Cleared old data
✅ Seeded 15 skills
✅ Created demo users
✅ Seeded 8 jobs
✅ Created demo applications
✅ Seeded transactions
🎉 Seed complete! Demo credentials:
   👩 Woman    → priya@demo.com     / demo1234
   🏢 Employer → employer@demo.com  / demo1234
   🔑 Admin    → admin@worknest.com / demo1234
```

```bash
# Start backend server
npm run dev
# → Server running on http://localhost:5000
```

---

### Step 3 — Frontend Setup

Open a new terminal:
```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
# → App running on http://localhost:5173
```

---

### Step 4 — Open the App

1. Go to http://localhost:5173
2. Click **"Get Started"**
3. Use demo login: **priya@demo.com / demo1234**

---

## 🎯 Demo Flow

```
1. Register (or login as priya@demo.com / demo1234)
      ↓
2. Select Skills (SkillSelection page)
      ↓
3. Browse Jobs → Apply with cover letter
      ↓
4. Check My Applications → see status
      ↓
5. View Financial Dashboard → charts with seed data
      ↓
6. Update Profile
```

---

## 🌐 API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/jobs | List all jobs (supports ?search=, ?type=, ?category=) |
| GET | /api/jobs/:id | Get job detail |
| GET | /api/jobs/recommended | Skill-matched jobs (auth required) |
| POST | /api/jobs | Create job (employer/admin only) |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/applications | Apply for a job |
| GET | /api/applications/my | My applications |
| PUT | /api/applications/:id/status | Update status (employer/admin) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | /api/users/profile | Update profile |
| POST | /api/users/skills | Add skills |
| GET | /api/users/dashboard | Dashboard stats |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/transactions | List transactions |
| POST | /api/transactions | Add transaction |
| GET | /api/transactions/summary | Financial summary + charts |

### Skills
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/skills | All skills |

---

## 🧪 Postman Testing

Import these requests into Postman:

**1. Register**
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@test.com",
  "password": "test123",
  "role": "woman"
}
```

**2. Login**
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "priya@demo.com",
  "password": "demo1234"
}
→ Copy the token from response
```

**3. Get Jobs (public)**
```
GET http://localhost:5000/api/jobs
GET http://localhost:5000/api/jobs?type=remote
GET http://localhost:5000/api/jobs?search=design
```

**4. Apply for Job (requires token)**
```
POST http://localhost:5000/api/applications
Headers: Authorization: Bearer <your_token>
Body (JSON):
{
  "jobId": "<job_id_from_jobs_list>",
  "coverLetter": "I am interested in this role..."
}
```

**5. Financial Summary (requires token)**
```
GET http://localhost:5000/api/transactions/summary
Headers: Authorization: Bearer <your_token>
```

---

## ☁️ DEPLOYMENT GUIDE

### 🗄️ Step 1 — MongoDB Atlas (Database)

1. Go to https://cloud.mongodb.com
2. Create free account → "Build a Database" → Free M0 tier
3. Set username + password (save these!)
4. Under "Network Access" → Add IP → "Allow Access from Anywhere" (0.0.0.0/0)
5. Under "Database" → Connect → "Drivers" → Copy connection string:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/worknest?retryWrites=true&w=majority
   ```
6. Run seed against Atlas:
   ```bash
   # In backend/.env, set:
   MONGO_URI=mongodb+srv://...
   # Then:
   npm run seed
   ```

---

### ⚙️ Step 2 — Backend on Render

1. Push your code to GitHub
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo, select the `backend` folder as root
4. Settings:
   - **Name**: worknest-api
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
5. Under **Environment Variables**, add:
   ```
   MONGO_URI = mongodb+srv://...
   JWT_SECRET = your_random_secret_32chars
   PORT = 5000
   FRONTEND_URL = https://your-frontend.vercel.app
   NODE_ENV = production
   ```
6. Click **Create Web Service**
7. Copy your API URL: `https://worknest-api.onrender.com`

---

### 🎨 Step 3 — Frontend on Vercel

1. Go to https://vercel.com → New Project
2. Import your GitHub repo, set Root Directory to `frontend`
3. Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Dir**: `dist`
4. Under **Environment Variables**, add:
   ```
   VITE_API_URL = https://worknest-api.onrender.com/api
   ```
5. Click **Deploy**
6. Copy your URL: `https://worknest-women.vercel.app`

---

### Step 4 — Update CORS

In Render dashboard, update `FRONTEND_URL` to your Vercel URL.
Redeploy the backend.

---

## 🔐 Security Checklist

- [x] Passwords hashed with bcrypt (10 rounds)
- [x] JWT with 7-day expiry
- [x] Protected routes with middleware
- [x] Role-based access control (woman/employer/admin)
- [x] Error messages don't expose internals
- [x] CORS configured for specific origin
- [ ] In production: use strong 32-char JWT_SECRET
- [ ] In production: restrict MongoDB Atlas IP to Render's IPs

---

## 💡 Job Recommendation Logic

Located in `backend/controllers/jobController.js → getRecommendedJobs`:

```js
// Fetches user's selected skills
// Finds jobs where job.skills overlap with user.skills
// Returns top 6 most recent matches
```

To improve: add scoring based on skill demand, pay range, and application history.

---

## 🧩 Role-Based Access

| Feature | Woman | Employer | Admin |
|---------|-------|----------|-------|
| Browse jobs | ✅ | ✅ | ✅ |
| Apply for jobs | ✅ | ❌ | ✅ |
| Post jobs | ❌ | ✅ | ✅ |
| Update app status | ❌ | ✅ | ✅ |
| Financial dashboard | ✅ | ✅ | ✅ |
| Create skills | ❌ | ❌ | ✅ |

---

## 📦 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| State | React Context |
| HTTP | Axios |
| Router | React Router v6 |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Deployment | Vercel (FE) + Render (BE) + Atlas (DB) |

---

## 🆘 Troubleshooting

**MongoDB connection fails**
```bash
# Make sure MongoDB is running locally:
mongod --dbpath /data/db
# Or check Atlas connection string is correct
```

**CORS error in browser**
```bash
# Make sure FRONTEND_URL in backend .env matches exactly:
FRONTEND_URL=http://localhost:5173  # for local
FRONTEND_URL=https://your-app.vercel.app  # for prod
```

**Token errors / 401 responses**
```bash
# Clear localStorage in browser:
localStorage.clear()
# Then log in again
```

**Seed fails**
```bash
# Make sure backend .env exists with correct MONGO_URI
# Then:
cd backend && node seed/seed.js
```

---

*WorkNest Women — When women earn, families grow, and societies progress. 🌸*
