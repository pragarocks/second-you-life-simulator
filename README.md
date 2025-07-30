# Second You - Life Co-Simulator

> Explore alternate life paths through AI-powered simulations

**Second You** is a full-stack web application that helps users simulate alternate life paths based on critical decisions they've made or are considering. Using advanced AI (Gemini 1.5 Pro), the system generates realistic 1, 3, and 10-year future timelines based on the user's current life situation and alternate choices.

![Second You Preview](https://via.placeholder.com/800x400?text=Second+You+Preview)

## 🌟 Features

### Core Functionality
- **AI-Powered Simulations**: Uses Google's Gemini 1.5 Pro to generate realistic life scenarios
- **Multi-Timeline View**: See how your life unfolds at 1, 3, and 10-year marks
- **Comparison Mode**: Compare your current path vs. alternate path side-by-side
- **Personalized Results**: Tailored simulations based on your age, location, profession, and personality traits
- **Future Self Message**: Receive wisdom from your future self

### User Experience
- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Smooth Animations**: Engaging transitions and micro-interactions
- **Download & Share**: Export your simulation results
- **Mobile Responsive**: Works seamlessly on all devices

### Technical Features
- **Fast Performance**: Optimized React frontend with lazy loading
- **Secure Backend**: Rate limiting, input validation, and security headers
- **Scalable Architecture**: Designed for high traffic with proper caching
- **Error Handling**: Graceful error handling with user-friendly messages

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Google Gemini 1.5 Pro** - AI language model
- **Firebase** - Database and authentication (optional)
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

### Deployment
- **Vercel** - Frontend hosting
- **Railway/Render** - Backend hosting
- **Environment Variables** - Secure configuration management

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js 16+** installed
- **npm or yarn** package manager
- **Google AI Studio API key** (for Gemini 1.5 Pro)
- **Firebase project** (optional, for data persistence)
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/second-you.git
cd second-you
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
PORT=5000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your backend `.env` file

### 5. Run the Application

**Start Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional
NODE_ENV=development
PORT=5000
FIREBASE_PROJECT_ID=your_firebase_project
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
```

#### Frontend
The frontend uses the backend proxy configuration in `package.json`. For production, update the API endpoints in your frontend code.

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/build`
4. Deploy!

### Backend (Railway)

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Railway will automatically detect the Node.js app
4. Update CORS origins in your backend to include your frontend domain

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
4. Add environment variables in Render dashboard

## 📁 Project Structure

```
second-you/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── InputForm.jsx
│   │   │   ├── TimelineView.jsx
│   │   │   └── ComparisonView.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   └── Results.jsx
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── package.json
│   └── tailwind.config.js   # Tailwind configuration
├── backend/                 # Node.js backend application
│   ├── routes/              # Express routes
│   │   └── simulate.js      # Simulation endpoints
│   ├── services/            # Business logic
│   │   ├── geminiClient.js  # AI integration
│   │   └── firebaseAdmin.js # Firebase integration
│   ├── utils/               # Utilities
│   │   └── validation.js    # Input validation
│   ├── index.js             # Express server
│   └── package.json
├── README.md                # This file
└── vercel.json              # Vercel deployment config
```

## 🎯 Usage

1. **Fill in your details**: Age, location, profession, and personality traits
2. **Describe your alternate path**: What decision are you curious about?
3. **Generate simulation**: AI creates your 1, 3, and 10-year timeline
4. **Explore results**: View timeline or comparison mode
5. **Download/Share**: Save your results for later reflection

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini** for providing the AI capabilities
- **Tailwind CSS** for the beautiful styling system
- **Lucide** for the icon library
- **Vercel** for seamless frontend deployment
- **Railway** for backend hosting

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@secondyou.app
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/second-you/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/second-you/discussions)

## 🔮 Roadmap

- [ ] User authentication and profiles
- [ ] Simulation history and favorites
- [ ] Advanced AI models (Claude 3 Opus)
- [ ] Vector database for semantic search
- [ ] Social sharing features
- [ ] Mobile app (React Native)
- [ ] Advanced visualization options

---

**Made with ❤️ by the Second You Team** 