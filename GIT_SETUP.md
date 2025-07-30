# 🚀 Git Setup & Deployment Guide

## 📋 Pre-Git Checklist

### **1. Environment Variables**
- ✅ Your `.env` file is in `.gitignore` (already done)
- ✅ Copy `backend/env.example` to `backend/.env` and add your API key
- ✅ Never commit your actual API keys

### **2. Test Your App**
- ✅ Frontend runs on http://localhost:3000
- ✅ Backend runs on http://localhost:5000
- ✅ API calls work correctly

## 🔧 Git Setup Steps

### **Step 1: Initialize Git Repository**
```bash
# Navigate to your project root
cd C:\Users\909494\OneDrive - Cognizant\Desktop\VibeCoding\AI_Product

# Initialize Git
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: Second You Life Simulator"
```

### **Step 2: Create GitHub Repository**
1. Go to [GitHub.com](https://github.com)
2. Click "New Repository"
3. Name: `second-you-life-simulator`
4. Description: `AI-powered life path simulation app`
5. Make it **Public** (for free hosting)
6. **Don't** initialize with README (you already have one)

### **Step 3: Connect to GitHub**
```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/second-you-life-simulator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Deployment Options

### **Option 1: Vercel (Frontend) + Render (Backend) - Recommended**

#### **Frontend on Vercel:**
1. Go to [Vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Import your repository
4. Configure build settings:
   - **Framework Preset**: Create React App
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/build`
   - **Install Command**: `npm run install:all`

#### **Backend on Render:**
1. Go to [Render.com](https://render.com)
2. Connect your GitHub account
3. Create new Web Service
4. Select your repository
5. Configure:
   - **Name**: `second-you-backend`
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Add Environment Variable**: `GEMINI_API_KEY` (your actual key)

### **Option 2: Railway (Both Frontend & Backend)**

1. Go to [Railway.app](https://railway.app)
2. Connect GitHub account
3. Deploy from repository
4. Add environment variables in Railway dashboard

### **Option 3: Netlify (Frontend) + Railway (Backend)**

Similar to Vercel setup but using Netlify for frontend.

## 🔑 Environment Variables Setup

### **For Production Deployment:**

#### **Vercel (Frontend):**
```bash
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

#### **Render/Railway (Backend):**
```bash
GEMINI_API_KEY=your_actual_gemini_api_key
NODE_ENV=production
PORT=10000
```

## 📝 Update API URLs for Production

### **Step 1: Update Frontend API Configuration**
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
search_replace