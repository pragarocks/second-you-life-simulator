import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import { Brain, Clock, Users, Lightbulb } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import simulationService from '../services/simulationService';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useAuth();

  // Track free runs in localStorage
  const getFreeRunsUsed = () => {
    const v = localStorage.getItem('free_runs_used');
    return v ? parseInt(v, 10) : 0;
  };

  const incFreeRunsUsed = () => {
    localStorage.setItem('free_runs_used', String(getFreeRunsUsed() + 1));
  };

  const getUserGeminiKey = () => localStorage.getItem('user_gemini_api_key') || '';
  const setUserGeminiKey = (key) => localStorage.setItem('user_gemini_api_key', key);

  const ensureUserKeyIfNeeded = async () => {
    // Allow first 3 runs without key
    if (getFreeRunsUsed() < 3) return '';

    // After 3 runs, require sign-in and user key
    if (!user) {
      alert('Please sign in to continue after 3 free simulations.');
      throw new Error('signin-required');
    }

    let key = getUserGeminiKey();
    if (!key) {
      const url = 'https://makersuite.google.com/app/apikey';
      const input = window.prompt(
        `Enter your Google Gemini API key (get it free at ${url})`,
        ''
      );
      if (!input) throw new Error('user-key-required');
      setUserGeminiKey(input.trim());
      key = input.trim();
    }
    return key;
  };

  const handleSimulation = async (formData) => {
    setIsLoading(true);
    
    try {
      const apiKey = await ensureUserKeyIfNeeded();

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/simulate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-gemini-key': apiKey } : {}),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('A Gemini API key is required. Please provide your key to continue.');
          localStorage.removeItem('user_gemini_api_key');
        }
        throw new Error('Simulation failed');
      }

      const simulationData = await response.json();
      if (getFreeRunsUsed() < 3) incFreeRunsUsed();
      
      // Save simulation if user is logged in
      let savedSimulation = null;
      if (user) {
        try {
          savedSimulation = await simulationService.saveSimulation(
            user.uid,
            simulationData.simulation,
            formData
          );
          console.log('✅ Simulation saved successfully:', savedSimulation.id);
        } catch (error) {
          console.error('❌ Failed to save simulation:', error);
        }
      }
      
      navigate('/results', { 
        state: { 
          alternatePath: simulationData.simulation.alternatePath,
          currentPath: simulationData.simulation.currentPath,
          metadata: simulationData.simulation.metadata,
          originalData: formData,
          savedSimulation: savedSimulation
        } 
      });
    } catch (error) {
      console.error('Error during simulation:', error);
      if (error.message === 'signin-required') return;
      if (error.message === 'user-key-required') return;
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6">
          Explore Your Other Lives
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          What if you made that big decision differently? Use AI to simulate alternate life paths 
          and discover the possibilities that await in your parallel futures.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card text-center">
            <Brain className="h-8 w-8 text-primary-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 mb-2">AI-Powered</h3>
            <p className="text-sm text-slate-600">Advanced AI creates realistic life scenarios</p>
          </div>
          <div className="card text-center">
            <Clock className="h-8 w-8 text-secondary-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 mb-2">Multi-Timeline</h3>
            <p className="text-sm text-slate-600">See 1, 3, and 10-year projections</p>
          </div>
          <div className="card text-center">
            <Users className="h-8 w-8 text-accent-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 mb-2">Holistic View</h3>
            <p className="text-sm text-slate-600">Covers relationships, career, and growth</p>
          </div>
          <div className="card text-center">
            <Lightbulb className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 mb-2">Insightful</h3>
            <p className="text-sm text-slate-600">Gain clarity on life decisions</p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="animate-slide-up">
        <InputForm onSubmit={handleSimulation} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home; 