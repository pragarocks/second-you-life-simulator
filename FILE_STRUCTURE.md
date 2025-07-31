# 📁 File Structure Overview

## 🚀 Start Here
- **`start-app.bat`** - Double-click to start both servers (Recommended)

## 📖 Documentation
- **`README.md`** - Complete project overview and features
- **`USER_GUIDE.md`** - How to use the app step-by-step
- **`QUICK_REFERENCE.md`** - Quick commands and tips
- **`CHANGELOG.md`** - What's new and improvements
- **`GIT_SETUP.md`** - How to deploy to GitHub/Vercel/Render

## 🏗️ Application
- **`frontend/`** - React app (runs on port 3000)
- **`backend/`** - Express API + AI integration (runs on port 5000)
- **`package.json`** - Root workspace configuration

## ⚙️ Configuration
- **`.gitignore`** - Files to ignore in Git
- **`vercel.json`** - Vercel deployment config
- **`render.yaml`** - Render deployment config  
- **`railway.json`** - Railway deployment config

## 📦 Generated
- **`node_modules/`** - Dependencies (auto-generated)
- **`package-lock.json`** - Dependency lock file (auto-generated)
- **`.git/`** - Git repository (auto-generated)

## 🎯 Quick Actions
```batch
# Start the app:
start-app.bat

# Install dependencies:
npm install

# Deploy to GitHub:
# See GIT_SETUP.md
``` 