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



  const handleSimulation = async (formData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/simulate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Simulation failed');
      }

      const simulationData = await response.json();
      
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
          console.error('This might be due to missing Firebase configuration.');
          console.log('💡 To enable saving: Set up Firebase and add config to frontend/.env');
          // Continue anyway - don't block the user experience
        }
      } else {
        console.log('💡 User not signed in - simulation not saved to history');
      }
      
      // Navigate to results page with dual-path simulation data
      navigate('/results', { 
        state: { 
          alternatePath: simulationData.simulation.alternatePath,
          currentPath: simulationData.simulation.currentPath,
          metadata: simulationData.simulation.metadata,
          originalData: formData,
          savedSimulation: savedSimulation // Include saved simulation info
        } 
      });
    } catch (error) {
      console.error('Error during simulation:', error);
      
      if (error.message.includes('fetch')) {
        alert('⚠️ Connection Error: Please make sure the backend server is running on http://localhost:5000\n\nTry: npm run start:clean');
      } else {
        alert('Something went wrong. Please try again.');
      }
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