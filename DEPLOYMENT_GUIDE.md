# 🌐 Second You - Complete Deployment Guide

## 🚀 **Best Hosting Options for Your App**

### **🏆 Recommended: Vercel + Railway**
- **Frontend**: Vercel (Free tier, excellent React support)
- **Backend**: Railway (Free $5/month credit, simple Node.js deployment)
- **Database**: Firebase Firestore (Free tier, already configured)

### **⚡ Alternative: Netlify + Render**
- **Frontend**: Netlify (Free tier)  
- **Backend**: Render (Free tier with limitations)
- **Database**: Firebase Firestore

---

## 📋 **Pre-Deployment Checklist**

✅ Your Git repository is pushed to GitHub  
✅ `.env` files are gitignored (API keys not committed)  
✅ Environment variable templates exist (`env.example` files)  
✅ Your app works locally  

---

## 🚀 **Option 1: Vercel + Railway (Recommended)**

### **Step 1: Deploy Backend to Railway**

1. **Go to Railway**: https://railway.app/
2. **Sign up/Login** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select your repository**
5. **Choose `backend` folder** (if Railway asks)
6. **Add Environment Variables**:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key
   NODE_ENV=production
   PORT=3000
   ```
7. **Deploy** - Railway will automatically detect Node.js and deploy
8. **Copy your backend URL**: `https://your-app-name.up.railway.app`

### **Step 2: Deploy Frontend to Vercel**

1. **Go to Vercel**: https://vercel.com/
2. **Sign up/Login** with GitHub
3. **New Project** → **Import Git Repository**
4. **Select your repository**
5. **Configure Project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
6. **Add Environment Variables**:
   ```env
   REACT_APP_API_URL=https://your-railway-backend-url.up.railway.app
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```
7. **Deploy** - Vercel will build and deploy automatically
8. **Your app is live!** at `https://your-app-name.vercel.app`

---

## 🌟 **Option 2: Netlify + Render**

### **Step 1: Deploy Backend to Render**

1. **Go to Render**: https://render.com/
2. **Sign up/Login** with GitHub
3. **New Web Service** → **Connect Repository**
4. **Configure Service**:
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
5. **Add Environment Variables** (same as Railway)
6. **Deploy**
7. **Copy your backend URL**: `https://your-app-name.onrender.com`

### **Step 2: Deploy Frontend to Netlify**

1. **Go to Netlify**: https://netlify.com/
2. **Sign up/Login** with GitHub
3. **New site from Git** → **Choose your repository**
4. **Configure Build**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. **Add Environment Variables** (same as Vercel)
6. **Deploy**
7. **Your app is live!** at `https://your-app-name.netlify.app`

---

## 🔧 **Configure CORS for Production**

Update your backend's CORS configuration in `backend/index.js`:

```javascript
// Replace the CORS configuration with:
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-app-name.vercel.app',  // Add your Vercel URL
    'https://your-app-name.netlify.app'  // Or your Netlify URL
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

---

## 🔐 **Firebase Configuration for Production**

### **Update Firebase Auth Domains**

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project** → **Authentication** → **Settings**
3. **Authorized domains** → **Add domain**:
   - Add your Vercel/Netlify domain: `your-app-name.vercel.app`
4. **Save**

### **Update Firestore Security Rules**

Your rules are already production-ready! ✅

---

## 📱 **Custom Domain (Optional)**

### **For Vercel:**
1. **Vercel Dashboard** → **Your Project** → **Settings** → **Domains**
2. **Add your domain** (e.g., `secondyou.com`)
3. **Update DNS** with your domain provider

### **For Netlify:**
1. **Netlify Dashboard** → **Domain settings** → **Add custom domain**
2. **Update DNS** with your domain provider

---

## 🎯 **Quick Start (5 Minutes to Live App)**

1. **Push your code to GitHub** (if not already done)
2. **Deploy backend to Railway**:
   - Connect GitHub repo
   - Add `GEMINI_API_KEY` environment variable
   - Deploy
3. **Deploy frontend to Vercel**:
   - Connect GitHub repo  
   - Set root directory to `frontend`
   - Add all `REACT_APP_*` environment variables
   - Deploy
4. **Update Firebase authorized domains**
5. **Test your live app!**

---

## 💰 **Cost Breakdown**

### **Free Tier (Perfect for starting):**
- **Vercel**: Free (100GB bandwidth, unlimited builds)
- **Railway**: $5/month credit (enough for small apps)  
- **Firebase**: Free tier (50k reads/day, 20k writes/day)
- **Total**: ~$0-5/month

### **Scaling Up:**
- **Vercel Pro**: $20/month (better performance)
- **Railway**: Pay per usage (scales automatically)
- **Firebase**: Pay per usage (very affordable)

---

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **"API not found" errors**: Check CORS configuration
2. **Environment variables not working**: Restart deployment after adding them
3. **Firebase errors**: Verify authorized domains are added
4. **Build fails**: Check Node.js version compatibility

### **Debug Steps:**
1. Check deployment logs in Railway/Render dashboard
2. Test backend API directly: `https://your-backend-url/api/simulate/status`
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

---

## 🎉 **You're Live!**

Once deployed, your **Second You** app will be accessible worldwide at:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-app-name.up.railway.app`

### **Share Your Creation:**
- Social media links
- Portfolio showcase
- GitHub repository
- Personal website

**Congratulations! You've successfully deployed a full-stack AI application to the internet!** 🚀✨ 

# 🚀 Azure Deployment Guide (Hybrid, Non-Breaking)

This guide deploys the existing app to Azure without changing auth/data (Firebase stays). Backend → Azure App Service, Frontend → Azure Storage Static Website.

## Prereqs
- Azure subscription
- Azure CLI installed: https://aka.ms/azure-cli
- Node 18 locally
- Keys ready: `GEMINI_API_KEY` (required), Firebase vars (optional)

## One-Command Script
Use `deploy-azure.ps1` from project root:

```powershell
# Example
./deploy-azure.ps1 `
  -ResourceGroup secondyou-rg `
  -Location eastus `
  -ApiAppName secondyouapi12345 `
  -StorageAccountName secondyoustaticweb12345 `
  -GeminiApiKey <your_gemini_key> `
  -AllowedOrigins https://<your-frontend-host>.z13.web.core.windows.net
```

Outputs:
- API URL: `https://<ApiAppName>.azurewebsites.net`
- Frontend URL: printed at the end

Tip: If CORS blocks, add the printed frontend URL to `-AllowedOrigins` and re-run.

## Manual Steps (Alternative)

### 1) Backend → Azure App Service
- Create Web App (Linux, Node 18 LTS)
- Deploy `backend/` via VS Code Azure App Service extension or `az webapp up`
- App Settings:
  - `NODE_ENV=production`
  - `GEMINI_API_KEY=<key>`
  - Optional Firebase: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (with \n)
- Health check path: `/health`
- Verify: `https://<api>.azurewebsites.net/health`

### 2) Frontend → Azure Storage Static Website
- Create StorageV2 account
- Enable Static Website (index.html / 404.html)
- In `frontend/`:
  - Create `.env.production` with `REACT_APP_API_URL=https://<api>.azurewebsites.net`
  - `npm install && npm run build`
- Upload `frontend/build` to `$web`
- Note the static site URL

### 3) CORS
- Backend CORS now reads `ALLOWED_ORIGINS` (comma-separated)
- Set it to your frontend origin (e.g., `https://<your-frontend-host>.z13.web.core.windows.net`)

## Single App Service (No Storage/Static Web Apps)
If your subscription can’t create Storage or a second Web App, host frontend and API together:

1) Build frontend locally
```bash
cd frontend
REACT_APP_API_URL=https://<your-app>.azurewebsites.net npm run build
```

2) Copy build into backend/public
- Create folder `backend/public`
- Copy ALL files from `frontend/build/*` into `backend/public/`

3) Deploy only the backend folder to App Service
- VS Code → Azure panel → App Services → Right‑click your app → Deploy to Web App… → select `AI_Product/backend`

4) Browse your site
- Frontend and API are now at the same origin: `https://<your-app>.azurewebsites.net`
- API remains under `/api/*`

CORS
- When UI and API share the same origin, you can clear `ALLOWED_ORIGINS` or leave it as-is; it won’t block same-origin requests.

## Azure-Native Option (Later)
- Auth: Azure AD B2C + MSAL in React
- Data: Azure Cosmos DB (Mongo/SQL) via backend routes

For the coding week, the above hybrid approach is fastest and stable. 