import { useState, useCallback, useEffect } from "react";

export const useQuizData = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

 

  const fetchQuestionsBySubject = useCallback(async (subject) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://quiz-app-gold-alpha-34.vercel.app/api/v1/questions?subj=${subject}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.data && Array.isArray(data.data.questions)) {
        setQuizData(data.data.questions);
        setSelectedSubject(subject);
      } else {
        throw new Error("Invalid data format received");
      }

    } catch (err) {
      console.error('Error fetching quiz data:', err);
      setError("Failed to load quiz questions. Please try again later.");
      setQuizData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetQuiz = useCallback(() => {
    setQuizData(null);
    setSelectedSubject(null);
    setError(null);
  }, []);

  return {
    quizData,
    loading,
    error,
    subjects,
    selectedSubject,
    fetchQuestionsBySubject,
    resetQuiz
  };
};