import React from 'react';
import {  useQuizContext } from '../../context/QuizContext';
import Quiz from './Quiz';
import ErrorBoundary from './ErrorBoundary';
import Subjects from './Subjects';

export function QuizApp() {
    const { selectedSubject, handleSubjectSelect, handleBackToSubjects } = useQuizContext();
  
    return (
      <div className="min-h-screen bg-gray-50 py-8 mt-20">
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
 
        </div>
      </div>
    );
  }
  