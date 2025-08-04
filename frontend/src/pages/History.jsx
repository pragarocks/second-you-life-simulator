import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  Trash2, 
  Calendar, 
  Tag,
  Archive,
  Star,
  Clock,
  User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import simulationService from '../services/simulationService';

const History = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  
  const [simulations, setSimulations] = useState([]);
  const [filteredSimulations, setFilteredSimulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'favorites'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'favorites'

  const loadSimulations = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userSimulations = await simulationService.getUserSimulations(user.uid, 50);
      setSimulations(userSimulations);
    } catch (error) {
      console.error('Error loading simulations:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const filterAndSortSimulations = useCallback(() => {
    let filtered = [...simulations];

    // Apply filter
    if (filterType === 'favorites') {
      filtered = filtered.filter(sim => sim.isFavorite);
    }

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(sim => 
        sim.title.toLowerCase().includes(searchLower) ||
        sim.description.toLowerCase().includes(searchLower) ||
        sim.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        sim.originalData.profession.toLowerCase().includes(searchLower) ||
        sim.originalData.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'favorites':
          if (a.isFavorite && !b.isFavorite) return -1;
          if (!a.isFavorite && b.isFavorite) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredSimulations(filtered);
  }, [simulations, searchTerm, filterType, sortBy]);

  useEffect(() => {
    if (user) {
      loadSimulations();
    } else {
      navigate('/');
    }
  }, [user, navigate, loadSimulations]);

  useEffect(() => {
    filterAndSortSimulations();
  }, [filterAndSortSimulations]);

  const handleToggleFavorite = async (simulationId) => {
    try {
      const newFavoriteStatus = await simulationService.toggleFavorite(simulationId);
      
      // Update local state
      setSimulations(prev => 
        prev.map(sim => 
          sim.id === simulationId 
            ? { ...sim, isFavorite: newFavoriteStatus }
            : sim
        )
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleDeleteSimulation = async (simulationId) => {
    if (window.confirm('Are you sure you want to delete this simulation? This action cannot be undone.')) {
      try {
        await simulationService.deleteSimulation(simulationId);
        setSimulations(prev => prev.filter(sim => sim.id !== simulationId));
      } catch (error) {
        console.error('Error deleting simulation:', error);
      }
    }
  };

  const handleViewSimulation = (simulation) => {
    navigate('/results', {
      state: {
        alternatePath: simulation.alternatePath,
        currentPath: simulation.currentPath,
        metadata: simulation.metadata,
        originalData: simulation.originalData,
        savedSimulation: simulation,
        isFromHistory: true
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Your Life Simulation History
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Explore your journey of "what-if" scenarios and revisit the different life paths you've considered.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <Archive className="h-8 w-8 text-primary-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-slate-800">{simulations.length}</h3>
          <p className="text-slate-600">Total Simulations</p>
        </div>
        <div className="card text-center">
          <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-slate-800">
            {simulations.filter(sim => sim.isFavorite).length}
          </h3>
          <p className="text-slate-600">Favorites</p>
        </div>
        <div className="card text-center">
          <User className="h-8 w-8 text-secondary-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-slate-800">
            {userProfile?.displayName || 'User'}
          </h3>
          <p className="text-slate-600">Explorer</p>
        </div>
      </div>

      {/* Controls */}
      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search simulations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Simulations</option>
              <option value="favorites">Favorites Only</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="favorites">Favorites First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your simulations...</p>
        </div>
      ) : filteredSimulations.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            {searchTerm || filterType !== 'all' ? 'No matching simulations' : 'No simulations yet'}
          </h3>
          <p className="text-slate-600 mb-6">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Start exploring your alternate life paths!'
            }
          </p>
          {!searchTerm && filterType === 'all' && (
            <Link
              to="/"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Create Your First Simulation</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredSimulations.map((simulation) => (
            <div key={simulation.id} className="card group hover:shadow-lg transition-shadow duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">
                    {simulation.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                    {simulation.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" />
                    {formatDate(simulation.createdAt)}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleToggleFavorite(simulation.id)}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      simulation.isFavorite
                        ? 'text-red-500 hover:bg-red-50'
                        : 'text-slate-400 hover:text-red-500 hover:bg-slate-50'
                    }`}
                  >
                    <Heart 
                      className={`h-4 w-4 ${simulation.isFavorite ? 'fill-current' : ''}`} 
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteSimulation(simulation.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-50 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              {simulation.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {simulation.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-600"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {simulation.tags.length > 3 && (
                    <span className="text-xs text-slate-500">
                      +{simulation.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Preview */}
              <div className="text-sm text-slate-600 mb-4">
                <p className="line-clamp-3">
                  <strong>Scenario:</strong> {simulation.originalData.profession} in {simulation.originalData.location}, 
                  considering: {simulation.originalData.alternatePath}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  Age {simulation.originalData.age} • {simulation.originalData.location}
                </div>
                <button
                  onClick={() => handleViewSimulation(simulation)}
                  className="btn-primary text-sm"
                >
                  View Simulation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History; 