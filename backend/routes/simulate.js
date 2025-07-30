const express = require('express');
const router = express.Router();
const GeminiClient = require('../services/geminiClient');
const { validateSimulationInput } = require('../utils/validation');

// Create the client instance after dotenv has loaded
const geminiClient = new GeminiClient();

// POST /api/simulate
router.post('/', async (req, res) => {
  try {
    // Validate input
    const validationError = validateSimulationInput(req.body);
    if (validationError) {
      return res.status(400).json({
        error: 'Validation Error',
        message: validationError
      });
    }

    const { age, location, profession, traits, alternatePath } = req.body;

    console.log('🎭 Starting life simulation for user:', {
      age,
      location,
      profession: profession.substring(0, 50) + '...',
      alternatePath: alternatePath.substring(0, 100) + '...'
    });

    // Generate simulation using Gemini AI
    const simulation = await geminiClient.generateLifeSimulation({
      user_age: age,
      user_location: location,
      user_profession: profession,
      user_traits: traits,
      user_alternate_path: alternatePath
    });

    console.log('✨ Simulation generated successfully');

    // Return simulation results
    res.status(200).json({
      success: true,
      simulation: simulation,
      metadata: {
        generated_at: new Date().toISOString(),
        user_input: {
          age,
          location,
          profession,
          traits,
          alternatePath
        }
      }
    });

  } catch (error) {
    console.error('❌ Simulation error:', error);

    // Handle specific error types
    if (error.message.includes('API_KEY')) {
      return res.status(500).json({
        error: 'Configuration Error',
        message: 'AI service is not properly configured. Please try again later.'
      });
    }

    if (error.message.includes('quota') || error.message.includes('limit')) {
      return res.status(429).json({
        error: 'Service Limit',
        message: 'AI service is temporarily unavailable due to high demand. Please try again in a few minutes.'
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Simulation Failed',
      message: 'Unable to generate your life simulation. Please try again.',
      ...(process.env.NODE_ENV !== 'production' && { details: error.message })
    });
  }
});

// GET /api/simulate/status - Check if AI service is available
router.get('/status', async (req, res) => {
  try {
    const isAvailable = await geminiClient.checkServiceHealth();
    
    res.status(200).json({
      service: 'AI Simulation',
      status: isAvailable ? 'available' : 'unavailable',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      service: 'AI Simulation',
      status: 'error',
      message: 'Unable to check service status',
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router; 