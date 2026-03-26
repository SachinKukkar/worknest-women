# 🚀 WorkNest Women - Production Deployment Guide

## ✅ Pre-Deployment Checklist

- [ ] Code tested locally
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Database seeded with initial data
- [ ] Git repository created and pushed to GitHub

---

## 📋 Deployment Steps (Free Tier)

### Step 1: Setup MongoDB Atlas (Database) - FREE

1. **Create Account**
   - Go to https://cloud.mongodb.com
   - Sign up with Google/GitHub or email
   - Verify your email

2. **Create Database**
   - Click "Build a Database"
   - Select **M0 FREE** tier
   - Choose region closest to you (e.g., AWS / us-east-1)
   - Cluster Name: `worknest-cluster`
   - Click "Create"

3. **Setup Database Access**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `worknest_admin`
   - Password: Click "Autogenerate Secure Password" → **SAVE THIS PASSWORD**
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Setup Network Access**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Drivers"
   - Copy the connection string:
   ```
   mongodb+srv://worknest_admin:<password>@worknest-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your saved password
   - Add database name: `mongodb+srv://worknest_admin:PASSWORD@worknest-cluster.xxxxx.mongodb.net/worknest?retryWrites=true&w=majority`
   - **SAVE THIS CONNECTION STRING**

---

### Step 2: Deploy Backend to Render - FREE

1. **Push Code to GitHub**
   ```bash
   cd c:\Users\SachinKukkar.AzureAD\Downloads\worknest-women\worknest
   git init
   git add .
   git commit -m "Initial commit - WorkNest Women"
   
   # Create repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/worknest-women.git
   git branch -M main
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub
   - Authorize Render to access your repositories

3. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your `worknest-women` repository
   - Configure:
     - **Name**: `worknest-api`
     - **Region**: Oregon (US West)
     - **Branch**: `main`
     - **Root Directory**: `backend`
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
     - **Plan**: Free

4. **Add Environment Variables**
   Click "Advanced" → Add Environment Variables:
   
   ```
   NODE_ENV = production
   MONGO_URI = mongodb+srv://worknest_admin:YOUR_PASSWORD@worknest-cluster.xxxxx.mongodb.net/worknest?retryWrites=true&w=majority
   JWT_SECRET = (click "Generate" to create random secret)
   PORT = 5000
   FRONTEND_URL = https://worknest-women.vercel.app
   ```
   
   **Note**: We'll update FRONTEND_URL after deploying frontend

5. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - Your API URL: `https://worknest-api.onrender.com`
   - Test: Visit `https://worknest-api.onrender.com/api/health`

6. **Seed Production Database**
   - In Render dashboard, go to your service
   - Click "Shell" tab
   - Run: `npm run seed`
   - You should see demo users created

---

### Step 3: Deploy Frontend to Vercel - FREE

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Authorize Vercel

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your `worknest-women` repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Add Environment Variable**
   - Under "Environment Variables":
   ```
   VITE_API_URL = https://worknest-api.onrender.com/api
   ```
   
   Replace with your actual Render URL from Step 2

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app URL: `https://worknest-women.vercel.app`

---

### Step 4: Update Backend CORS

1. **Update Render Environment**
   - Go back to Render dashboard
   - Select your `worknest-api` service
   - Go to "Environment"
   - Update `FRONTEND_URL`:
   ```
   FRONTEND_URL = https://worknest-women.vercel.app
   ```
   (Use your actual Vercel URL)
   
2. **Redeploy**
   - Click "Manual Deploy" → "Deploy latest commit"
   - Wait for deployment to complete

---

### Step 5: Test Production App

1. **Open Your App**
   - Visit your Vercel URL: `https://worknest-women.vercel.app`

2. **Test Login**
   - Click "Get Started"
   - Login with demo credentials:
     - Email: `priya@demo.com`
     - Password: `demo1234`

3. **Test Features**
   - Browse jobs
   - Apply for a job
   - Check applications
   - View financial dashboard
   - Update profile

---

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your domain (e.g., `worknest.com`)
3. Follow DNS configuration instructions

**Render:**
1. Go to Settings → Custom Domain
2. Add your API domain (e.g., `api.worknest.com`)
3. Update FRONTEND_URL in Render
4. Update VITE_API_URL in Vercel

### SSL Certificates
- Both Vercel and Render provide FREE automatic SSL
- Your app will be HTTPS by default

---

## 📊 Monitoring & Maintenance

### Render (Backend)
- **Logs**: Dashboard → Logs tab
- **Metrics**: Dashboard → Metrics tab
- **Free Tier Limits**:
  - 750 hours/month
  - Sleeps after 15 min inactivity
  - Cold start: 30-60 seconds

### Vercel (Frontend)
- **Analytics**: Dashboard → Analytics
- **Logs**: Dashboard → Deployments → View Function Logs
- **Free Tier Limits**:
  - 100 GB bandwidth/month
  - Unlimited deployments

### MongoDB Atlas
- **Monitoring**: Dashboard → Metrics
- **Free Tier Limits**:
  - 512 MB storage
  - Shared CPU
  - No backups (upgrade for backups)

---

## 🔐 Security Best Practices

### ✅ Already Implemented
- [x] Passwords hashed with bcrypt
- [x] JWT authentication
- [x] Rate limiting (100 req/15min)
- [x] Helmet.js security headers
- [x] CORS configured
- [x] Input validation
- [x] Error handling

### 🎯 Recommended Next Steps
1. **Setup MongoDB Backups**
   - Upgrade to M2 tier ($9/month) for automated backups
   
2. **Add Monitoring**
   - Setup Sentry for error tracking: https://sentry.io
   - Add Uptime monitoring: https://uptimerobot.com (free)

3. **Email Notifications**
   - Integrate SendGrid/Mailgun for:
     - Welcome emails
     - Application status updates
     - Password reset

4. **Analytics**
   - Add Google Analytics or Plausible
   - Track user behavior and conversions

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Render logs for errors
# Common issues:
- MONGO_URI incorrect → verify connection string
- Missing environment variables → check all vars are set
- Port binding → Render sets PORT automatically
```

### Frontend can't connect to backend
```bash
# Check browser console for CORS errors
# Fix:
1. Verify VITE_API_URL in Vercel matches Render URL
2. Verify FRONTEND_URL in Render matches Vercel URL
3. Redeploy both services
```

### Database connection fails
```bash
# Check MongoDB Atlas:
1. Network Access allows 0.0.0.0/0
2. Database user password is correct
3. Connection string includes database name
```

### Render service sleeping
```bash
# Free tier sleeps after 15 min inactivity
# Solutions:
1. Upgrade to paid tier ($7/month)
2. Use cron job to ping every 10 min: https://cron-job.org
3. Accept 30-60s cold start delay
```

---

## 💰 Cost Breakdown

| Service | Free Tier | Paid Upgrade |
|---------|-----------|--------------|
| MongoDB Atlas | 512 MB | M2: $9/month (2GB + backups) |
| Render | 750 hrs/month | Starter: $7/month (no sleep) |
| Vercel | 100 GB bandwidth | Pro: $20/month (analytics) |
| **Total** | **$0/month** | **$16-36/month** |

---

## 🎉 You're Live!

Your WorkNest Women platform is now production-ready and accessible to real users!

**Next Steps:**
1. Share your app URL with users
2. Collect feedback
3. Monitor usage and errors
4. Iterate and improve

**Support:**
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.mongodb.com

---

*Built with ❤️ for women's economic empowerment*
