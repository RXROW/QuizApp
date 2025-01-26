import React from 'react';
import { useQuizContext } from '../../context/QuizContext';

const Subjects = () => {
  const { handleSubjectSelect, loading } = useQuizContext();

  const subjects = [
    { id: 1, name: 'ai', label: 'Artificial Intelligence', icon: '🤖' },
    { id: 2, name: 'network', label: 'Network', icon: '🌐' }, 
    { id: 3, name: 'web', label: 'Web', icon: '🕸️' },  
    { id: 4, name: 'security', label: 'Security', icon: '🔒' },  
    { id: 5, name: 'swe', label: 'Software Engineering', icon: '💻' }  
  ];
  

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Select a Subject
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => handleSubjectSelect(subject)}
              disabled={loading}
              className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl 
                         transition-all duration-300 ease-in-out 
                         flex flex-col items-center space-y-4
                         hover:scale-105 hover:bg-blue-50
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                {subject.icon}
              </span>
              <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {subject.label}
              </span>
            </button>
          ))}
        </div>

        {loading && (
          <p className="text-center text-blue-600 mt-4">
            Loading questions...
          </p>
        )}
      </div>
    </div>
  );
};

export default Subjects;