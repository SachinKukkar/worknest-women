# 🗺️ Deployment Roadmap

```
┌─────────────────────────────────────────────────────────────┐
│                    START HERE                                │
│                  READ: START-HERE.md                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 1: PREPARE YOUR CODE                       │
│                                                              │
│  1. Run: setup-production.bat                               │
│  2. Run: check-env.bat                                      │
│  3. Test locally (optional)                                 │
│                                                              │
│  Time: 5 minutes                                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 2: PUSH TO GITHUB                          │
│                                                              │
│  git init                                                   │
│  git add .                                                  │
│  git commit -m "Production ready"                          │
│  git remote add origin <your-repo>                         │
│  git push -u origin main                                   │
│                                                              │
│  Time: 5 minutes                                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│           STEP 3: SETUP MONGODB ATLAS (FREE)                 │
│                                                              │
│  1. Go to: https://cloud.mongodb.com                        │
│  2. Create FREE M0 cluster                                  │
│  3. Create database user                                    │
│  4. Allow network access (0.0.0.0/0)                       │
│  5. Copy connection string                                  │
│                                                              │
│  Time: 5 minutes                                            │
│  Cost: $0/month                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│           STEP 4: DEPLOY BACKEND TO RENDER (FREE)            │
│                                                              │
│  1. Go to: https://render.com                               │
│  2. New Web Service → Connect GitHub                        │
│  3. Root Directory: backend                                 │
│  4. Add environment variables:                              │
│     - NODE_ENV=production                                   │
│     - MONGO_URI=<from step 3>                              │
│     - JWT_SECRET=<generate>                                │
│     - FRONTEND_URL=<will update later>                     │
│  5. Deploy                                                  │
│  6. Copy API URL                                            │
│                                                              │
│  Time: 5 minutes                                            │
│  Cost: $0/month                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 5: SEED DATABASE                           │
│                                                              │
│  1. In Render dashboard → Shell tab                         │
│  2. Run: npm run seed                                       │
│  3. Wait for success message                                │
│  4. Note demo credentials                                   │
│                                                              │
│  Time: 2 minutes                                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│          STEP 6: DEPLOY FRONTEND TO VERCEL (FREE)            │
│                                                              │
│  1. Go to: https://vercel.com                               │
│  2. New Project → Import from GitHub                        │
│  3. Root Directory: frontend                                │
│  4. Framework: Vite                                         │
│  5. Add environment variable:                               │
│     - VITE_API_URL=<your Render URL>/api                   │
│  6. Deploy                                                  │
│  7. Copy app URL                                            │
│                                                              │
│  Time: 3 minutes                                            │
│  Cost: $0/month                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 7: UPDATE BACKEND CORS                     │
│                                                              │
│  1. Go back to Render dashboard                             │
│  2. Update FRONTEND_URL with Vercel URL                     │
│  3. Save → Auto redeploys                                   │
│  4. Wait 2 minutes                                          │
│                                                              │
│  Time: 2 minutes                                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    🎉 YOU'RE LIVE! 🎉                       │
│                                                              │
│  ✅ Frontend: https://your-app.vercel.app                   │
│  ✅ Backend:  https://your-api.onrender.com                 │
│  ✅ Database: MongoDB Atlas                                  │
│                                                              │
│  Demo Login: priya@demo.com / demo1234                      │
│                                                              │
│  Total Time: ~20 minutes                                    │
│  Total Cost: $0/month                                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  NEXT STEPS                                  │
│                                                              │
│  □ Test all features                                        │
│  □ Share with users                                         │
│  □ Monitor logs                                             │
│  □ Collect feedback                                         │
│  □ Plan improvements                                        │
│                                                              │
│  See: PRODUCTION-CHECKLIST.md                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📚 Documentation Guide

| File | Purpose | When to Use |
|------|---------|-------------|
| **START-HERE.md** | Overview & summary | Read first |
| **QUICK-DEPLOY.md** | 20-min deployment | Deploy now |
| **DEPLOYMENT.md** | Detailed guide | Need details |
| **PRODUCTION-CHECKLIST.md** | Pre-launch checklist | Before launch |
| **README-PRODUCTION.md** | Project README | Share with others |
| **setup-production.bat** | Install dependencies | Initial setup |
| **check-env.bat** | Verify environment | Before deploy |

---

## 🎯 Quick Commands

### Setup
```bash
# Install all dependencies
setup-production.bat

# Check environment variables
check-env.bat
```

### Local Development
```bash
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd frontend
npm run dev
```

### Production
```bash
# Push to GitHub
git add .
git commit -m "Update"
git push

# Vercel & Render auto-deploy on push!
```

---

## 💡 Pro Tips

1. **Bookmark These URLs**
   - Render Dashboard: https://dashboard.render.com
   - Vercel Dashboard: https://vercel.com/dashboard
   - MongoDB Atlas: https://cloud.mongodb.com

2. **Monitor Your App**
   - Check Render logs daily
   - Monitor MongoDB storage
   - Track Vercel bandwidth

3. **Free Tier Limits**
   - Render: Service sleeps after 15 min (30-60s cold start)
   - MongoDB: 512 MB storage
   - Vercel: 100 GB bandwidth/month

4. **When to Upgrade**
   - Render: When cold starts affect UX ($7/month)
   - MongoDB: When storage > 400 MB ($9/month)
   - Vercel: When bandwidth > 80 GB ($20/month)

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| CORS error | Check FRONTEND_URL matches Vercel URL |
| Can't connect to API | Check VITE_API_URL matches Render URL |
| Database error | Verify MongoDB connection string |
| Service sleeping | Normal on free tier (wait 30-60s) |
| Build fails | Check logs in Render/Vercel dashboard |

---

**Ready to deploy? Start with: QUICK-DEPLOY.md** 🚀
