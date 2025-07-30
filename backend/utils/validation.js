/**
 * Validation utilities for the Second You backend
 */

/**
 * Validate simulation input data
 */
function validateSimulationInput(data) {
  const { age, location, profession, traits, alternatePath } = data;

  // Check required fields
  if (!age || !location || !profession || !traits || !alternatePath) {
    return 'All fields are required: age, location, profession, traits, alternatePath';
  }

  // Validate age
  const ageNum = parseInt(age);
  if (isNaN(ageNum) || ageNum < 13 || ageNum > 100) {
    return 'Age must be a number between 13 and 100';
  }

  // Validate string lengths
  if (location.trim().length < 2 || location.trim().length > 100) {
    return 'Location must be between 2 and 100 characters';
  }

  if (profession.trim().length < 5 || profession.trim().length > 200) {
    return 'Profession must be between 5 and 200 characters';
  }

  if (traits.trim().length < 10 || traits.trim().length > 500) {
    return 'Traits must be between 10 and 500 characters';
  }

  if (alternatePath.trim().length < 10 || alternatePath.trim().length > 1000) {
    return 'Alternate path must be between 10 and 1000 characters';
  }

  // Check for potentially harmful content
  const harmfulPatterns = [
    /(?:suicide|self-harm|kill|death|violence)/i,
    /(?:illegal|drugs|crime|fraud)/i,
    /(?:inappropriate|nsfw|sexual)/i
  ];

  const allText = `${location} ${profession} ${traits} ${alternatePath}`.toLowerCase();
  
  for (const pattern of harmfulPatterns) {
    if (pattern.test(allText)) {
      return 'Input contains inappropriate content. Please revise your submission.';
    }
  }

  // Validate data types
  if (typeof location !== 'string' || typeof profession !== 'string' || 
      typeof traits !== 'string' || typeof alternatePath !== 'string') {
    return 'All text fields must be strings';
  }

  return null; // No validation errors
}

/**
 * Sanitize input strings
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 1000); // Limit length
}

/**
 * Validate environment variables
 */
function validateEnvironment() {
  const required = ['GEMINI_API_KEY'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return true;
}

/**
 * Rate limiting key generator
 */
function generateRateLimitKey(req) {
  // Use IP address for rate limiting
  return req.ip || req.connection.remoteAddress || 'unknown';
}

module.exports = {
  validateSimulationInput,
  sanitizeString,
  validateEnvironment,
  generateRateLimitKey
}; 