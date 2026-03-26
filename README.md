<div align="center">

# 🌸 WorkNest Women

### *Empowering Women Through Flexible Work Opportunities*

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://wn-women.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://mongodb.com)

**A full-stack platform connecting women with remote and flexible job opportunities**

[🚀 Live Demo](https://wn-women.vercel.app) • [📖 Documentation](#-quick-start) • [🐛 Report Bug](https://github.com/yourusername/worknest/issues)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 👩 For Job Seekers
- 🎯 **Smart Job Matching** - AI-powered recommendations
- 📝 **One-Click Applications** - Apply instantly
- 💰 **Financial Dashboard** - Track earnings & expenses
- 📊 **Visual Analytics** - Beautiful charts & insights
- 🎓 **Skill Management** - Build your profile

</td>
<td width="50%">

### 🏢 For Employers
- 📢 **Post Jobs** - Create detailed listings
- 👥 **Manage Applications** - Review candidates
- 🎯 **Skill-Based Hiring** - Find perfect matches
- 📈 **Dashboard Analytics** - Track metrics
- ⚡ **Quick Responses** - Instant notifications

</td>
</tr>
</table>

---

## 🎬 Quick Start

### 🔥 Try It Now (No Setup Required)

Visit **[wn-women.vercel.app](https://wn-women.vercel.app)** and login with:

```
👩 Woman:    priya@demo.com / demo1234
🏢 Employer: employer@demo.com / demo1234
🔑 Admin:    admin@worknest.com / demo1234
```

### 💻 Local Development

<details>
<summary><b>📋 Prerequisites</b></summary>

- [Node.js 18+](https://nodejs.org) installed
- [MongoDB](https://www.mongodb.com/try/download/community) running locally (or use [Atlas](https://cloud.mongodb.com))
- Git installed

</details>

<details open>
<summary><b>⚡ Installation (5 minutes)</b></summary>

#### 1️⃣ Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/worknest-women.git
cd worknest-women

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 2️⃣ Configure Environment

**Backend** (`backend/.env`):
```env
MONGO_URI=mongodb://localhost:27017/worknest
JWT_SECRET=your_super_secret_key_change_in_production
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

#### 3️⃣ Seed Database

```bash
cd backend
npm run seed
```

You'll see demo users created! ✅

#### 4️⃣ Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### 5️⃣ Open App

Visit **http://localhost:5173** and login with demo credentials! 🎉

</details>

---

## 🚀 Production Deployment

<details>
<summary><b>☁️ Deploy to Production (FREE - 20 minutes)</b></summary>

### 📦 What You'll Need

- [GitHub](https://github.com) account
- [MongoDB Atlas](https://cloud.mongodb.com) account (FREE)
- [Render](https://render.com) account (FREE)
- [Vercel](https://vercel.com) account (FREE)

### 🗄️ Step 1: Setup MongoDB Atlas (5 min)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create **FREE M0 cluster**
3. Create database user & password
4. Network Access → **Allow from Anywhere** (0.0.0.0/0)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/worknest
   ```

### ⚙️ Step 2: Deploy Backend to Render (5 min)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect GitHub repo
4. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables:
   ```
   MONGO_URI=<your_mongodb_atlas_connection_string>
   JWT_SECRET=<generate_random_32_char_string>
   PORT=5000
   FRONTEND_URL=https://your-app.vercel.app
   NODE_ENV=production
   ```
6. Deploy & copy your API URL

### 🎨 Step 3: Deploy Frontend to Vercel (5 min)

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import GitHub repo
3. Settings:
   - **Root Directory**: `frontend`
   - **Framework**: Vite
4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-render-api-url.onrender.com/api
   ```
5. Deploy & copy your app URL

### 🌱 Step 4: Seed Production Database (2 min)

**Option 1: PowerShell**
```powershell
Invoke-WebRequest -Uri "https://your-api.onrender.com/api/seed/init" -Method POST
```

**Option 2: Browser**
- Use the included `seed-database.html` file
- Or visit [reqbin.com](https://reqbin.com) and POST to `/api/seed/init`

### ✅ Step 5: Update CORS (2 min)

1. Go back to Render dashboard
2. Update `FRONTEND_URL` with your Vercel URL
3. Redeploy

### 🎉 Done!

Your app is live at your Vercel URL! 🚀

</details>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2-8884D8?style=for-the-badge)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/Atlas-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

## 📁 Project Structure

```
worknest/
├── 📂 backend/              # Node.js + Express API
│   ├── 📂 controllers/      # Business logic
│   ├── 📂 models/          # MongoDB schemas
│   ├── 📂 routes/          # API endpoints
│   ├── 📂 middleware/      # Auth & validation
│   ├── 📂 seed/            # Demo data
│   └── 📄 server.js        # Entry point
│
├── 📂 frontend/            # React + Vite app
│   ├── 📂 src/
│   │   ├── 📂 components/  # Reusable UI
│   │   ├── 📂 pages/       # Route pages
│   │   ├── 📂 context/     # Global state
│   │   ├── 📂 services/    # API calls
│   │   └── 📄 App.jsx      # Main component
│   └── 📄 index.html       # Entry HTML
│
├── 📄 README.md            # You are here!
├── 📄 LICENSE              # MIT License
└── 📄 .gitignore           # Git ignore rules
```

---

## 🔐 Security Features

<table>
<tr>
<td>

✅ **Password Security**
- Bcrypt hashing (10 rounds)
- Salted passwords

✅ **Authentication**
- JWT tokens (7-day expiry)
- Secure HTTP-only cookies

✅ **Authorization**
- Role-based access control
- Protected API routes

</td>
<td>

✅ **API Protection**
- Rate limiting (100 req/15min)
- Helmet.js security headers
- CORS configuration

✅ **Data Validation**
- Input sanitization
- XSS protection
- SQL injection prevention

</td>
</tr>
</table>

---

## 📊 API Endpoints

<details>
<summary><b>🔓 Authentication</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login user |
| `GET` | `/api/auth/me` | Get current user |

</details>

<details>
<summary><b>💼 Jobs</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/jobs` | List all jobs |
| `GET` | `/api/jobs/:id` | Get job details |
| `GET` | `/api/jobs/recommended` | Get matched jobs |
| `POST` | `/api/jobs` | Create job (employer) |

</details>

<details>
<summary><b>📝 Applications</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/applications` | Apply for job |
| `GET` | `/api/applications/my` | My applications |
| `PUT` | `/api/applications/:id/status` | Update status |

</details>

<details>
<summary><b>👤 Users</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `/api/users/profile` | Update profile |
| `POST` | `/api/users/skills` | Add skills |
| `GET` | `/api/users/dashboard` | Dashboard stats |

</details>

<details>
<summary><b>💰 Transactions</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/transactions` | List transactions |
| `POST` | `/api/transactions` | Add transaction |
| `GET` | `/api/transactions/summary` | Financial summary |

</details>

---

## 🎯 User Roles & Permissions

| Feature | 👩 Woman | 🏢 Employer | 🔑 Admin |
|---------|:--------:|:-----------:|:--------:|
| Browse Jobs | ✅ | ✅ | ✅ |
| Apply for Jobs | ✅ | ❌ | ✅ |
| Post Jobs | ❌ | ✅ | ✅ |
| Manage Applications | ❌ | ✅ | ✅ |
| Financial Dashboard | ✅ | ✅ | ✅ |
| Create Skills | ❌ | ❌ | ✅ |

---

## 🐛 Troubleshooting

<details>
<summary><b>❌ MongoDB Connection Failed</b></summary>

**Solution:**
```bash
# Check if MongoDB is running
mongod --dbpath /data/db

# Or verify Atlas connection string
# Make sure password doesn't contain special characters
```

</details>

<details>
<summary><b>❌ CORS Error in Browser</b></summary>

**Solution:**
- Check `FRONTEND_URL` in backend `.env` matches your frontend URL exactly
- No trailing slash!
- Restart backend server after changes

</details>

<details>
<summary><b>❌ 401 Unauthorized</b></summary>

**Solution:**
```javascript
// Clear browser storage
localStorage.clear()
// Then login again
```

</details>

<details>
<summary><b>❌ Port Already in Use</b></summary>

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

</details>

---

## 🗺️ Roadmap

- [ ] 📧 Email notifications (SendGrid/Mailgun)
- [ ] 💳 Payment integration (Stripe/Razorpay)
- [ ] 📱 Mobile app (React Native)
- [ ] 🎥 Video interviews
- [ ] 🤖 AI resume builder
- [ ] 📊 Advanced analytics
- [ ] 🔔 SMS alerts
- [ ] 🌍 Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 💖 Acknowledgments

- Built with ❤️ for women's economic empowerment
- Inspired by the need for flexible work opportunities
- Powered by amazing open-source technologies

---

<div align="center">

### 🌸 *When women earn, families grow, and societies progress* 🌸

**Made with 💜 by the WorkNest Team**

[⬆ Back to Top](#-worknest-women)

</div>
