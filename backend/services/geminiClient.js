const { GoogleGenAI } = require('@google/genai');

class GeminiClient {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (!this.apiKey) {
      console.error('❌ GEMINI_API_KEY environment variable is not set');
      throw new Error('GEMINI_API_KEY is required');
    }

    // Initialize the new Gemini client with explicit API key
    this.genAI = new GoogleGenAI({ apiKey: this.apiKey });
    console.log('✅ Gemini AI client initialized successfully');
  }

  /**
   * Generate a life simulation based on user input
   */
  async generateLifeSimulation(userData) {
    try {
      const prompt = this.buildPrompt(userData);
      console.log('🤖 Sending prompt to Gemini AI...');

      const response = await this.genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.8,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 4000,
        },
      });

      const text = response.text;

      if (!text) {
        throw new Error('Empty response from Gemini AI');
      }

      console.log('✅ Received response from Gemini AI');
      return this.parseSimulationResponse(text);

    } catch (error) {
      console.error('❌ Gemini AI Error:', error);
      
      if (error.message.includes('API_KEY')) {
        throw new Error('Invalid API_KEY configuration');
      }
      
      if (error.message.includes('quota')) {
        throw new Error('API quota exceeded');
      }

      throw new Error(`AI generation failed: ${error.message}`);
    }
  }

  /**
   * Build the prompt for life simulation
   */
  buildPrompt(userData) {
    const { user_age, user_location, user_profession, user_traits, user_alternate_path } = userData;

    return `You are a compassionate and imaginative life simulator, helping the user explore an alternate version of their life. They are reflecting on a life decision or considering a new one.

User Profile:
- Age: ${user_age}
- Current Location: ${user_location}
- Current Profession / Life Status: ${user_profession}
- Key Traits: ${user_traits}

Alternate Path Being Explored:
"${user_alternate_path}"

Generate a first-person narrative imagining what their life could look like if they took this alternate path. Structure your response with clear sections:

**YEAR_1:**
[What happens after 1 year? Include emotional texture: fears, growth, changes in relationships, mental health, fulfillment, surprises. Be honest, not overly idealistic. Write 2-3 paragraphs.]

**YEAR_3:**
[Where are they at year 3? Show progression, new challenges, deeper changes. Include career development, relationship evolution, personal growth. Write 2-3 paragraphs.]

**YEAR_10:**
[How has life changed at year 10? Show the long-term transformation, wisdom gained, legacy building. Include reflections on the journey. Write 2-3 paragraphs.]

**FUTURE_MESSAGE:**
[A single powerful message from that future self to the present self. One compelling sentence that captures the essence of this path. Format: "Here's what I'd tell you now: ..." Keep it under 50 words.]

Guidelines:
- Write in first person ("I" perspective)
- Be realistic and nuanced, not overly optimistic
- Include both challenges and rewards
- Show emotional and psychological development
- Consider practical aspects like finances, relationships, location
- Make it personal and relatable
- Keep each section focused and engaging

IMPORTANT: Use the exact format markers **YEAR_1:**, **YEAR_3:**, **YEAR_10:**, and **FUTURE_MESSAGE:** so the response can be properly parsed.`;
  }

  /**
   * Parse the simulation response into structured data
   */
  parseSimulationResponse(text) {
    try {
      const sections = {
        year1: '',
        year3: '',
        year10: '',
        futureMessage: ''
      };

      // Extract Year 1
      const year1Match = text.match(/\*\*YEAR_1:\*\*\s*([\s\S]*?)(?=\*\*YEAR_3:\*\*|$)/);
      if (year1Match) {
        sections.year1 = year1Match[1].trim();
      }

      // Extract Year 3
      const year3Match = text.match(/\*\*YEAR_3:\*\*\s*([\s\S]*?)(?=\*\*YEAR_10:\*\*|$)/);
      if (year3Match) {
        sections.year3 = year3Match[1].trim();
      }

      // Extract Year 10
      const year10Match = text.match(/\*\*YEAR_10:\*\*\s*([\s\S]*?)(?=\*\*FUTURE_MESSAGE:\*\*|$)/);
      if (year10Match) {
        sections.year10 = year10Match[1].trim();
      }

      // Extract Future Message
      const futureMessageMatch = text.match(/\*\*FUTURE_MESSAGE:\*\*\s*([\s\S]*?)$/);
      if (futureMessageMatch) {
        sections.futureMessage = futureMessageMatch[1].trim().replace(/^"|"$/g, '');
      }

      // Validate that all sections were found
      const missingSections = Object.entries(sections).filter(([key, value]) => !value).map(([key]) => key);
      if (missingSections.length > 0) {
        console.warn('⚠️ Missing sections in response:', missingSections);
        // If parsing fails, fall back to the raw text
        return {
          year1: text.substring(0, Math.floor(text.length / 3)),
          year3: text.substring(Math.floor(text.length / 3), Math.floor(2 * text.length / 3)),
          year10: text.substring(Math.floor(2 * text.length / 3)),
          futureMessage: 'Here\'s what I\'d tell you now: Trust your instincts and embrace the journey ahead.'
        };
      }

      return sections;

    } catch (error) {
      console.error('❌ Error parsing simulation response:', error);
      throw new Error('Failed to parse AI response');
    }
  }

  /**
   * Check if the Gemini service is available
   */
  async checkServiceHealth() {
    try {
      const testPrompt = "Respond with exactly: 'Service is healthy'";
      const result = await this.genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: testPrompt,
        config: {
          temperature: 0,
          maxOutputTokens: 10,
        },
      });

      const response = result.text;
      return response.includes('Service is healthy');
    } catch (error) {
      console.error('❌ Health check failed:', error);
      return false;
    }
  }
}

// Export the class, not an instance
module.exports = GeminiClient; 