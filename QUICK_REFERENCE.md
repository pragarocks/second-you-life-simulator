# 🚀 Quick Reference Card

## ⚡ Start the App
```bash
# Option 1: One-click (Recommended)
Double-click: start-app.bat

# Option 2: Manual
Terminal 1: cd backend && npm run dev
Terminal 2: cd frontend && npm start
```

## 🌐 URLs
- **Frontend**: http://localhost:3000
- **Backend Health**: http://localhost:5000/health

## 🛑 Stop Servers
- Press `Ctrl + C` in each terminal window

## 🔧 Common Commands
```bash
# Check if ports are in use
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Restart servers
cd backend && npm run dev
cd frontend && npm start
```

## 💡 Best Input Examples
```
Age: 28
Location: Bangalore, India
Profession: Senior Software Engineer at a fintech startup
Traits: Analytical, ambitious, family-oriented, risk-averse, enjoys learning
Alternate Path: What if I quit my job to start my own AI consulting business?
```

## 🎯 Good Alternate Paths
- "What if I moved to a different country?"
- "What if I changed careers to become a teacher?"
- "What if I started my own business?"
- "What if I focused on family instead of career advancement?"
- "What if I became a digital nomad?"

## ⚠️ Troubleshooting
- **Port in use**: Stop servers with Ctrl+C, then restart
- **Module not found**: Make sure you're in correct directory
- **API quota exceeded**: Wait 15 minutes or upgrade plan
- **Backend not connecting**: Check http://localhost:5000/health

## 📱 Features
- ✅ Generate 1, 3, 10-year simulations
- ✅ Timeline & Comparison views
- ✅ Download results as text file
- ✅ Share with friends
- ✅ Future self messages 