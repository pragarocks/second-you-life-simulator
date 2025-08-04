import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Edit3, 
  Save, 
  X,
  Settings,
  BarChart3,
  Clock,
  Heart,
  Archive,
  Award,
  Camera,
  Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import simulationService from '../services/simulationService';

const Profile = () => {
  const { user, userProfile, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalSimulations: 0,
    favoriteSimulations: 0,
    recentActivity: null
  });

  const loadUserStats = useCallback(async () => {
    if (!user) return;
    
    try {
      const simulations = await simulationService.getUserSimulations(user.uid, 100);
      const favorites = simulations.filter(sim => sim.isFavorite);
      const recent = simulations.length > 0 ? simulations[0] : null;
      
      setStats({
        totalSimulations: simulations.length,
        favoriteSimulations: favorites.length,
        recentActivity: recent
      });
    } catch (error) {
      console.error('Error loading user stats:', error);
      // Set default stats if Firebase fails
      setStats({
        totalSimulations: 0,
        favoriteSimulations: 0,
        recentActivity: null
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    if (userProfile) {
      setEditedProfile({
        displayName: userProfile.displayName || '',
        email: userProfile.email || '',
        bio: userProfile.bio || '',
        location: userProfile.location || '',
        occupation: userProfile.occupation || ''
      });
    }
    
    loadUserStats();
  }, [user, userProfile, navigate, loadUserStats]);

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await updateUserProfile({
        displayName: editedProfile.displayName,
        bio: editedProfile.bio,
        location: editedProfile.location,
        occupation: editedProfile.occupation,
        updatedAt: new Date().toISOString()
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedProfile({
      displayName: userProfile.displayName || '',
      email: userProfile.email || '',
      bio: userProfile.bio || '',
      location: userProfile.location || '',
      occupation: userProfile.occupation || ''
    });
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone and will delete all your simulations.')) {
      if (window.confirm('This is permanent! Type "DELETE" to confirm.')) {
        // In a real app, you'd implement account deletion here
        alert('Account deletion would be implemented here. For demo purposes, just logging out.');
        logout();
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user || !userProfile) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-slate-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Your Profile
        </h1>
        <p className="text-slate-600">
          Manage your account and view your simulation journey
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">
                Personal Information
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="flex items-center space-x-2 btn-primary text-sm"
                  >
                    <Save className="h-4 w-4" />
                    <span>{loading ? 'Saving...' : 'Save'}</span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center space-x-2 text-slate-600 hover:text-slate-800"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  {userProfile.photoURL ? (
                    <img
                      src={userProfile.photoURL}
                      alt="Profile"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary-600" />
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 bg-primary-500 text-white p-1 rounded-full hover:bg-primary-600 transition-colors">
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800">
                    {userProfile.displayName || 'User'}
                  </h3>
                  <p className="text-slate-600">
                    Member since {formatDate(userProfile.createdAt)}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Display Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.displayName}
                      onChange={(e) => setEditedProfile(prev => ({
                        ...prev,
                        displayName: e.target.value
                      }))}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-slate-800">{userProfile.displayName || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <p className="text-slate-600 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {userProfile.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile(prev => ({
                        ...prev,
                        location: e.target.value
                      }))}
                      placeholder="City, Country"
                      className="input-field"
                    />
                  ) : (
                    <p className="text-slate-800">{userProfile.location || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Occupation
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.occupation}
                      onChange={(e) => setEditedProfile(prev => ({
                        ...prev,
                        occupation: e.target.value
                      }))}
                      placeholder="Your profession"
                      className="input-field"
                    />
                  ) : (
                    <p className="text-slate-800">{userProfile.occupation || 'Not set'}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      bio: e.target.value
                    }))}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className="textarea-field"
                  />
                ) : (
                  <p className="text-slate-800">{userProfile.bio || 'No bio yet'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="card">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Account Settings
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-slate-800">Account Type</h3>
                  <p className="text-sm text-slate-600">Free account with basic features</p>
                </div>
                <button className="btn-primary text-sm">
                  Upgrade
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <h3 className="font-medium text-red-800">Danger Zone</h3>
                  <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="card">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Your Journey
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Archive className="h-5 w-5 text-primary-500" />
                  <span className="text-slate-700">Total Simulations</span>
                </div>
                <span className="font-semibold text-slate-800">
                  {stats.totalSimulations}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-slate-700">Favorites</span>
                </div>
                <span className="font-semibold text-slate-800">
                  {stats.favoriteSimulations}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span className="text-slate-700">Explorer Level</span>
                </div>
                <span className="font-semibold text-slate-800">
                  {stats.totalSimulations < 5 ? 'Beginner' : 
                   stats.totalSimulations < 15 ? 'Explorer' : 
                   stats.totalSimulations < 30 ? 'Adventurer' : 'Master'}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {stats.recentActivity && (
            <div className="card">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Recent Activity
              </h2>
              
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    {formatDate(stats.recentActivity.createdAt)}
                  </span>
                </div>
                <h3 className="font-medium text-slate-800 text-sm line-clamp-2">
                  {stats.recentActivity.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {stats.recentActivity.description}
                </p>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Quick Actions
            </h2>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/history')}
                className="w-full flex items-center space-x-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-left"
              >
                <BarChart3 className="h-5 w-5 text-primary-500" />
                <span className="text-slate-700">View All Simulations</span>
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center space-x-3 p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors text-left"
              >
                <Settings className="h-5 w-5 text-primary-500" />
                <span className="text-slate-700">Create New Simulation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 