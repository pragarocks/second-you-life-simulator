import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

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

          {!isHome && (
            <Link
              to="/"
              className="flex items-center space-x-2 text-slate-600 hover:text-primary-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 