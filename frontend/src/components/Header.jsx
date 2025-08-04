import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowLeft, User, LogOut, History } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, userProfile, logout } = useAuth();

  return (
    <header className="bg-white shadow-md border-b border-slate-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Second You
              </h1>
              <p className="text-sm text-slate-600">Life Co-Simulator</p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {!isHome && (
              <Link
                to="/"
                className="flex items-center space-x-2 text-slate-600 hover:text-primary-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            )}
            
            {/* Authentication Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-slate-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {userProfile?.photoURL ? (
                    <img 
                      src={userProfile.photoURL} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-600" />
                    </div>
                  )}
                  <span className="hidden sm:block">{userProfile?.displayName || 'User'}</span>
                </button>
                
                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/history"
                      className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <History className="h-4 w-4" />
                      <span>Simulation History</span>
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-slate-700 hover:bg-slate-50 text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-colors duration-200"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Header; 