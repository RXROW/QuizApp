import React, { useState } from 'react';
import { QuizProvider, useQuizContext } from './context/QuizContext';
import Quiz from './components/Quiz';
import ErrorBoundary from './components/ErrorBoundary';
import Subjects from './components/Subjects';

function App() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}

function QuizApp() {
  const { selectedSubject, handleSubjectSelect, handleBackToSubjects } = useQuizContext();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz App</h1>
          <p className="text-gray-600">Test your knowledge across various subjects</p>
        </header>

        <main>
          {!selectedSubject ? (
            <Subjects onSelectSubject={handleSubjectSelect} />
          ) : (
            <ErrorBoundary>
            <Quiz 
              subject={selectedSubject} 
              onBack={handleBackToSubjects} 
            />
          </ErrorBoundary>
          
          )}
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Quiz App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;