# 🌸 WorkNest Women

**Empowering women through flexible work opportunities**

A full-stack platform connecting women with remote and flexible job opportunities, featuring skill-based job matching, application tracking, and financial management.

---

## 🌟 Features

### For Job Seekers (Women)
- 🔍 **Smart Job Matching** - AI-powered recommendations based on your skills
- 📝 **Easy Applications** - Apply with one click and track status
- 💰 **Financial Dashboard** - Track earnings, expenses, and savings
- 🎯 **Skill Management** - Build and showcase your skill profile
- 📊 **Analytics** - Visualize your job search progress

### For Employers
- 📢 **Post Jobs** - Create detailed job listings
- 👥 **Manage Applications** - Review and respond to candidates
- 🎯 **Skill-Based Hiring** - Find candidates with specific skills
- 📈 **Dashboard** - Track hiring metrics

### Platform Features
- 🔐 **Secure Authentication** - JWT-based auth with bcrypt
- 🛡️ **Rate Limiting** - Protection against abuse
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Performance** - Optimized for speed
- 🌐 **Production Ready** - Deployed and scalable

---

## 🚀 Live Demo

**App**: [https://worknest-women.vercel.app](https://worknest-women.vercel.app)

**Demo Credentials**:
- Woman: `priya@demo.com` / `demo1234`
- Employer: `employer@demo.com` / `demo1234`
- Admin: `admin@worknest.com` / `demo1234`

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **Rate Limiting** - API protection

### Deployment
- **Vercel** - Frontend hosting (free)
- **Render** - Backend hosting (free)
- **MongoDB Atlas** - Database (free)

---

## 📦 Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- Git ([Download](https://git-scm.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/worknest-women.git
   cd worknest-women
   ```

2. **Run setup script**
   ```bash
   # Windows
   setup-production.bat
   
   # Mac/Linux
   chmod +x setup-production.sh
   ./setup-production.sh
   ```

3. **Configure environment**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI
   
   # Frontend
   cd ../frontend
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Open app**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

---

## 🌐 Production Deployment

Follow the comprehensive guide: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

**Quick Summary**:
1. Setup MongoDB Atlas (5 min)
2. Deploy backend to Render (10 min)
3. Deploy frontend to Vercel (5 min)
4. Configure environment variables
5. Test production app

**Total Time**: ~20 minutes  
**Total Cost**: $0/month (free tier)

---

## 📁 Project Structure

```
worknest/
├── backend/              # Node.js + Express API
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & error handling
│   └── seed/            # Demo data
├── frontend/            # React + Vite app
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Route pages
│       ├── context/     # Global state
│       └── services/    # API calls
└── DEPLOYMENT.md        # Production guide
```

---

## 🔐 Security

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens with 7-day expiry
- ✅ Protected routes with middleware
- ✅ Role-based access control
- ✅ Rate limiting (100 req/15min)
- ✅ Helmet.js security headers
- ✅ CORS configured
- ✅ Input validation
- ✅ XSS protection

---

## 📊 API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-api.onrender.com/api`

### Endpoints

#### Authentication
```
POST   /auth/register    - Register new user
POST   /auth/login       - Login user
GET    /auth/me          - Get current user
```

#### Jobs
```
GET    /jobs             - List all jobs (public)
GET    /jobs/:id         - Get job details
GET    /jobs/recommended - Get matched jobs (auth)
POST   /jobs             - Create job (employer/admin)
```

#### Applications
```
POST   /applications           - Apply for job
GET    /applications/my        - My applications
PUT    /applications/:id/status - Update status (employer)
```

#### Users
```
PUT    /users/profile    - Update profile
POST   /users/skills     - Add skills
GET    /users/dashboard  - Dashboard stats
```

#### Transactions
```
GET    /transactions         - List transactions
POST   /transactions         - Add transaction
GET    /transactions/summary - Financial summary
```

---

## 🧪 Testing

### Manual Testing
```bash
# Backend
cd backend
npm run dev
# Visit http://localhost:5000/api/health

# Frontend
cd frontend
npm run dev
# Visit http://localhost:5173
```

### API Testing with Postman
1. Import collection from `docs/postman_collection.json`
2. Set environment variables
3. Run tests

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built for women's economic empowerment
- Inspired by the need for flexible work opportunities
- Powered by open-source technologies

---

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/worknest-women/issues)
- **Email**: support@worknest.com
- **Docs**: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🗺️ Roadmap

- [ ] Email notifications
- [ ] SMS alerts
- [ ] Video interviews
- [ ] Payment integration
- [ ] Mobile app (React Native)
- [ ] AI-powered resume builder
- [ ] Skill assessment tests
- [ ] Employer verification
- [ ] Advanced analytics

---

**Made with ❤️ for women's empowerment**

*When women earn, families grow, and societies progress.* 🌸
