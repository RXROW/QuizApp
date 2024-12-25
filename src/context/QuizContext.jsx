import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext(undefined);

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  
  return context;
};

export const QuizProvider = ({ children }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubjectSelect = async (subject) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://quiz-app-gold-alpha-34.vercel.app/api/v1/questions?subj=${subject.name}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();

      if (data && data.data && Array.isArray(data.data.questions)) {
        setQuizData(data.data.questions);
        setSelectedSubject(subject);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setQuizData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setQuizData(null);
    setError(null);
  };

  const value = {
    selectedSubject,
    quizData,
    loading,
    error,
    handleSubjectSelect,
    handleBackToSubjects,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;