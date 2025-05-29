import React from 'react';
import { Link } from 'react-router-dom';
import { FiActivity, FiUsers } from 'react-icons/fi';
import { IoSparklesOutline } from 'react-icons/io5';

interface HeaderHomePageProps {
  className?: string;
  onMenuClick?: () => void;
}

const HeaderHomePage: React.FC<HeaderHomePageProps> = ({
  className = '',
  onMenuClick
}) => {
  return (
    <header className={`flex items-center justify-between px-4 py-3 lg:px-6 ${className}`}>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
      </Link>

      {/* Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        <Link to="/features" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <FiActivity className="w-5 h-5" />
          <span>Features</span>
        </Link>
        <Link to="/community" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <FiUsers className="w-5 h-5" />
          <span>Community</span>
        </Link>
        <Link to="/showcase" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <IoSparklesOutline className="w-5 h-5" />
          <span>Showcase</span>
        </Link>
      </nav>

      {/* Auth buttons */}
      <div className="flex items-center gap-4">
        <Link to="/signin" className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <FiUsers className="w-5 h-5" />
          <span>Sign In</span>
        </Link>
        <Link 
          to="/signup" 
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          Get Started
        </Link>
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
        >
          <span className="sr-only">Menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default HeaderHomePage;
