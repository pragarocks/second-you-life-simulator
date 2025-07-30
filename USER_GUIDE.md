# 🎭 Second You - Life Co-Simulator User Guide

## 🚀 Quick Start

### **Option 1: One-Click Start (Recommended)**
1. Double-click `start-app.bat` in your project folder
2. Wait for both servers to start
3. Browser will open automatically to http://localhost:3000

### **Option 2: Manual Start**
```bash
# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend  
cd frontend
npm start
```

## 🎯 How to Use the Life Simulator

### **Step 1: Fill Out Your Profile**
- **Age**: Your current age (for realistic timeline projections)
- **Location**: City, Country (helps with cultural context)
- **Profession**: Be specific about your current role
- **Traits**: 3-5 personality characteristics that define you
- **Alternate Path**: The decision or change you want to explore

### **Step 2: Generate Your Simulation**
- Click "Explore This Path"
- Wait 10-30 seconds for AI to generate your simulation
- View your 1, 3, and 10-year projections

### **Step 3: Explore Results**
- **Timeline View**: See your journey year by year
- **Comparison View**: Compare current vs. alternate path
- **Download**: Save your simulation as a text file
- **Share**: Share results with friends

## 💡 Tips for Better Simulations

### **Be Specific in Your Inputs**
✅ **Good Example:**
```
Age: 28
Location: Mumbai, India
Profession: Senior Product Manager at a fintech startup, managing a team of 5
Traits: Analytical, risk-averse, family-oriented, ambitious, enjoys mentoring
Alternate Path: What if I quit my job to start a sustainable fashion brand?
```

❌ **Vague Example:**
```
Age: 25
Location: India
Profession: Engineer
Traits: Nice, smart
Alternate Path: I want to change jobs
```

### **Meaningful Alternate Paths to Explore**
- **Career Changes**: "What if I became a teacher instead of an engineer?"
- **Location Moves**: "What if I moved to a different country?"
- **Relationship Decisions**: "What if I focused on my career instead of starting a family now?"
- **Business Ventures**: "What if I started my own company?"
- **Lifestyle Changes**: "What if I became a digital nomad?"

## 🔧 Troubleshooting

### **Common Issues & Solutions**

**❌ "Module not found" errors**
- Solution: Make sure you're in the correct directory
- Run: `cd frontend` or `cd backend`

**❌ "Port already in use" errors**
- Solution: Stop existing servers with Ctrl+C
- Or kill the process: `netstat -ano | findstr :3000`

**❌ "API quota exceeded" errors**
- Solution: Wait 15 minutes or upgrade your Gemini API plan
- The app uses `gemini-2.5-flash` for better free tier limits

**❌ Backend not connecting**
- Check if backend is running: http://localhost:5000/health
- Restart backend: `cd backend && npm run dev`

### **Server Status Check**
```bash
# Check if ports are in use
netstat -ano | findstr :3000    # Frontend
netstat -ano | findstr :5000    # Backend

# Health check
curl http://localhost:5000/health
```

## 📊 Understanding Your Results

### **Timeline Structure**
- **1 Year Later**: Immediate changes and adjustments
- **3 Years Later**: Medium-term developments and growth
- **10 Years Later**: Long-term impact and life trajectory

### **What Each Section Covers**
- **Career Development**: Job changes, promotions, new skills
- **Personal Growth**: Emotional development, confidence, wisdom
- **Relationships**: Family, friends, romantic relationships
- **Financial Status**: Income, savings, investments
- **Lifestyle**: Daily routine, hobbies, living situation
- **Challenges & Wins**: Obstacles faced and achievements

### **Future Self's Message**
- Personal insights from your future self
- Advice based on the path taken
- Reflection on the decision's impact

## 🎨 Advanced Features

### **Comparison View**
- Side-by-side analysis of current vs. alternate path
- Key differences highlighted
- Pros and cons of each path

### **Download & Share**
- Save simulations for future reference
- Share with friends for discussion
- Track multiple simulations over time

## 🔮 Pro Tips

1. **Run Multiple Simulations**: Try different scenarios to see various outcomes
2. **Be Honest**: The more authentic your inputs, the better the simulation
3. **Consider Context**: Remember these are AI-generated possibilities, not predictions
4. **Use for Reflection**: Use results to think about your real-life decisions
5. **Share & Discuss**: Talk about results with friends or mentors

## 🛠️ Technical Details

### **Tech Stack**
- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **AI**: Google Gemini 2.5 Flash
- **Database**: Firebase (optional)

### **API Limits**
- 10 requests per 15 minutes per IP
- Uses Gemini's free tier (generous limits)

### **File Structure**
```
AI_Product/
├── frontend/          # React app
├── backend/           # Node.js server
├── start-app.bat      # Quick start script
└── USER_GUIDE.md      # This guide
```

## 🆘 Need Help?

### **Common Commands**
```bash
# Start servers
npm run dev            # Backend with auto-restart
npm start              # Frontend

# Stop servers
Ctrl + C               # In each terminal

# Check server status
http://localhost:5000/health    # Backend health
http://localhost:3000           # Frontend
```

### **If Something Breaks**
1. Stop all servers (Ctrl+C)
2. Restart backend: `cd backend && npm run dev`
3. Restart frontend: `cd frontend && npm start`
4. Clear browser cache if needed

---

**Happy Life Simulating! 🎭✨** 