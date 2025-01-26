import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-5 mt-12">
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
