import React from 'react';
import { useAuth } from '../../context/UserContext';  
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/" className="hover:text-blue-200">
            QuizMaster
          </Link>
        </div>

        {/* Navbar Links */}
        <div className="space-x-6">
          <Link to="/" className="text-white hover:text-blue-200">Home</Link>
          <Link to="/leaderboard" className="text-white hover:text-blue-200">Leaderboard</Link>
          {user && <Link to="/profile" className="text-white hover:text-blue-200">Profile</Link>}
        </div>

        {/* Authentication Buttons */}
        <div className="space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/signup"
                className="text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="text-white bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 transition"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
