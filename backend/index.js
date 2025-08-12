// Load environment variables FIRST, before any other imports
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const simulateRoutes = require('./routes/simulate');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for rate limiting (fixes the warning)
app.set('trust proxy', true);

// Security middleware with CSP allowing Firebase/Google auth
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "https://apis.google.com", "https://www.gstatic.com", "https://www.googletagmanager.com"],
      "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      "img-src": ["'self'", "data:", "https:"],
      "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
      "connect-src": [
        "'self'",
        "https://www.googleapis.com",
        "https://firestore.googleapis.com",
        "https://securetoken.googleapis.com",
        "https://identitytoolkit.googleapis.com",
        "https://apis.google.com",
        "https://*.googleapis.com"
      ],
      "frame-src": [
        "'self'",
        "https://accounts.google.com",
        "https://apis.google.com",
        "https://*.firebaseapp.com"
      ]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs (AI calls are expensive)
  message: {
    error: 'Too many simulation requests from this IP, please try again later.'
  }
});

// Apply rate limiting to API routes
app.use('/api/', limiter);

// CORS configuration (configurable via ALLOWED_ORIGINS, comma-separated)
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = allowedOriginsEnv
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    const isProd = process.env.NODE_ENV === 'production';
    const defaultDevOrigins = ['http://localhost:3000'];
    const defaultProdOrigins = ['https://your-vercel-domain.vercel.app'];
    const effectiveAllowed = allowedOrigins.length > 0
      ? allowedOrigins
      : (isProd ? defaultProdOrigins : defaultDevOrigins);

    if (effectiveAllowed.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/simulate', simulateRoutes);

// Serve frontend static files if present (deploying SPA and API on same App Service)
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  // SPA fallback for non-API routes
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

// 404 handler for unknown API routes only
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: 'The requested endpoint does not exist.'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production' 
    ? 'Something went wrong!' 
    : err.message;

  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Second You Backend running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💡 Health check: http://localhost:${PORT}/health`);
}); 