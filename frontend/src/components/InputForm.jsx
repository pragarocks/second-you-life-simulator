import React, { useState } from 'react';
import { User, MapPin, Briefcase, Heart, Lightbulb, Loader2 } from 'lucide-react';

const InputForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    age: '',
    location: '',
    profession: '',
    traits: '',
    alternatePath: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.age || formData.age < 13 || formData.age > 100) {
      newErrors.age = 'Please enter a valid age between 13 and 100';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.profession.trim()) {
      newErrors.profession = 'Current profession/status is required';
    }
    
    if (!formData.traits.trim()) {
      newErrors.traits = 'Please describe some of your key traits';
    }
    
    if (!formData.alternatePath.trim()) {
      newErrors.alternatePath = 'Please describe the alternate path you want to explore';
    }
    
    if (formData.alternatePath.trim().length < 10) {
      newErrors.alternatePath = 'Please provide more detail about your alternate path';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const examplePaths = [
    "What if I quit my corporate job to become a freelance photographer?",
    "What if I moved to a different country to start fresh?",
    "What if I went back to school to study medicine?",
    "What if I started my own tech company?",
    "What if I became a digital nomad and traveled while working?",
  ];

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Tell Us About Yourself
        </h2>
        <p className="text-slate-600">
          Share your current situation and the alternate path you're curious about
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Age */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
            <User className="h-4 w-4" />
            <span>Your Age</span>
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g., 28"
            className={`input-field ${errors.age ? 'border-red-500 focus:ring-red-500' : ''}`}
            min="13"
            max="100"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
            <MapPin className="h-4 w-4" />
            <span>Current Location</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., San Francisco, CA"
            className={`input-field ${errors.location ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Profession */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
            <Briefcase className="h-4 w-4" />
            <span>Current Profession/Life Status</span>
          </label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="e.g., Software Engineer at a tech startup"
            className={`input-field ${errors.profession ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession}</p>}
        </div>

        {/* Traits */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
            <Heart className="h-4 w-4" />
            <span>Key Personality Traits</span>
          </label>
          <textarea
            name="traits"
            value={formData.traits}
            onChange={handleChange}
            placeholder="e.g., Introverted, creative, ambitious but sometimes anxious about big changes..."
            rows="3"
            className={`textarea-field ${errors.traits ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.traits && <p className="text-red-500 text-sm mt-1">{errors.traits}</p>}
        </div>

        {/* Alternate Path */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
            <Lightbulb className="h-4 w-4" />
            <span>What Alternate Path Do You Want to Explore?</span>
          </label>
          <textarea
            name="alternatePath"
            value={formData.alternatePath}
            onChange={handleChange}
            placeholder="Describe the big decision or path you're curious about..."
            rows="4"
            className={`textarea-field ${errors.alternatePath ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.alternatePath && <p className="text-red-500 text-sm mt-1">{errors.alternatePath}</p>}
          
          {/* Example paths */}
          <div className="mt-3">
            <p className="text-sm text-slate-600 mb-2">Need inspiration? Try one of these:</p>
            <div className="flex flex-wrap gap-2">
              {examplePaths.slice(0, 3).map((path, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, alternatePath: path }))}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full transition-colors duration-200"
                >
                  {path.length > 50 ? `${path.substring(0, 47)}...` : path}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center space-x-2 text-lg py-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Simulating Your Future...</span>
            </>
          ) : (
            <>
              <Lightbulb className="h-5 w-5" />
              <span>Explore This Path</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-500">
        <p>✨ Your simulation will be generated using advanced AI and may take 30-60 seconds</p>
      </div>
    </div>
  );
};

export default InputForm; 