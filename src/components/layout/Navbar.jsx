import React, { useState } from 'react';
import { useAuth } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Home, Trophy, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLink = ({ to, children, icon: Icon }) => (
    <Link
      to={to}
      className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      {Icon && <Icon size={18} />}
      {children}
    </Link>
  );

  return (
    <nav className="  bg-blue-800  shadow-lg fixed top-0 w-full  z-20  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo section */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-white text-2xl font-bold hover:text-blue-200 transition-colors"
              aria-label="QuizMaster Home"
            >
              <span className="hidden sm:block">QuizMaster</span>
              <span className="block sm:hidden">QM</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/" icon={Home}>Home</NavLink>
            <NavLink to="/dashboard" icon={Trophy}>Leaderboard</NavLink>
            {user && <NavLink to="/profile" icon={User}>Profile</NavLink>}
            
            <div className="ml-4 flex items-center space-x-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-white">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label="Logout"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Main menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavLink to="/" icon={Home}>Home</NavLink>
          <NavLink to="/dashboard" icon={Trophy}>Leaderboard</NavLink>
          {user && <NavLink to="/profile" icon={User}>Profile</NavLink>}
          
          {user ? (
            <div className="pt-4 pb-3 border-t border-blue-700">
              <div className="px-4 text-white mb-2">Welcome, {user.name}</div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-blue-700 space-y-2">
              <Link
                to="/signup"
                className="block text-center text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block text-center text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;