import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <div className="text-white text-2xl font-bold">
          <a href="/" className="hover:text-blue-200">
            QuizMaster
          </a>
        </div>
        
        {/* Navbar Links */}
        <div className="space-x-6">
          <a href="/" className="text-white hover:text-blue-200">
            Home
          </a>
          
          <a href="/leaderboard" className="text-white hover:text-blue-200">
            Leaderboard
          </a>
          <a href="/profile" className="text-white hover:text-blue-200">
            Profile
          </a>
        </div>

        {/* Authentication Buttons (Sign Up / Log In) */}
        <div className="space-x-4">
          <a
            href="/signup"
            className="text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="text-white bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Log In
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
