# 🚀 Quick Start Guide - Second You

Get the Second You life co-simulator running in 5 minutes!

## ⚡ Prerequisites

- Node.js 16+ installed
- Git
- Code editor (VS Code recommended)

## 🛠️ Setup Steps

### 1. Get Gemini API Key (2 minutes)

1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the generated key

### 2. Backend Setup (1 minute)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env
# OR on Mac/Linux: cp .env.example .env

# Edit .env file and add your Gemini API key:
# GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Frontend Setup (1 minute)

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install
```

### 4. Start the Application (1 minute)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Should show: "🚀 Second You Backend running on port 5000"
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Should open browser at http://localhost:3000
```

## 🎮 Test the Application

### Sample Test Data

Use this data for your first simulation:

**Your Profile:**
- Age: `28`
- Location: `San Francisco, CA`
- Profession: `Software Engineer at a tech startup`
- Traits: `Creative, ambitious, but sometimes anxious about big changes. Love technology but also enjoy nature and photography.`

**Alternate Path:**
```
What if I quit my corporate job to become a freelance travel photographer? I've been passionate about photography for years and dream of combining it with travel to document different cultures around the world.
```

### Expected Results

The AI should generate:
- ✅ **Year 1**: Initial transition challenges, building portfolio, first clients
- ✅ **Year 3**: Established business, travel experiences, skill development  
- ✅ **Year 10**: Successful career, published work, personal fulfillment
- ✅ **Future Message**: Wisdom from your future photographer self

## 🐛 Troubleshooting

### Backend Issues

**"GEMINI_API_KEY is required" error:**
- Ensure you've added your actual API key to the `.env` file
- No quotes needed around the key
- Restart the backend after adding the key

**Port 5000 already in use:**
```bash
# Kill the process on port 5000
npx kill-port 5000
# Or change PORT in .env file to 5001
```

### Frontend Issues

**"Failed to fetch" error:**
- Ensure backend is running on port 5000
- Check the proxy setting in `frontend/package.json`
- Clear browser cache and try again

**Module not found errors:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Ready for Production?

### Quick Deploy to Vercel (Frontend)

1. Push your code to GitHub
2. Connect GitHub to Vercel
3. Deploy with these settings:
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/build`

### Quick Deploy to Railway (Backend)

1. Connect GitHub to Railway  
2. Set environment variables in Railway dashboard
3. Deploy automatically!

## 🎯 Next Steps

- [ ] Customize the AI prompts in `backend/services/geminiClient.js`
- [ ] Modify the UI colors in `frontend/tailwind.config.js`
- [ ] Add your own branding in `frontend/src/components/Header.jsx`
- [ ] Set up Firebase for user data persistence
- [ ] Add analytics tracking

## 💡 Pro Tips

1. **API Key Security**: Never commit your `.env` file to Git
2. **Rate Limiting**: The app limits to 10 requests per 15 minutes to protect your API quota
3. **Customization**: All AI prompts are in `geminiClient.js` - modify them to change the simulation style
4. **Mobile**: The app is fully responsive and works great on mobile devices

## 🆘 Need Help?

- 📧 Check the main README.md for detailed documentation
- 🐛 Create an issue on GitHub if you find bugs
- 💬 Star the repo if you found it useful!

---

**🎉 Congratulations! You now have a working AI-powered life simulator.** 