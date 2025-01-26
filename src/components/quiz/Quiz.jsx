import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useQuizContext } from '../../context/QuizContext';
import Result from './Result';
import Button from './Button';
import Question from './Question';

const Quiz = () => {
  const { quizData, loading, error, handleBackToSubjects } = useQuizContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(''));
    }
  }, [quizData]);

  useEffect(() => {
    setUserAnswer(answers[currentQuestionIndex]);
  }, [currentQuestionIndex, answers]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl text-red-600 mb-4">{error}</div>
        <Button onClick={handleBackToSubjects} text="Back to Subjects"/>
      </div>
    );
  }

  if (!quizData || quizData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl mb-4">No questions available for this subject.</div>
        <Button onClick={handleBackToSubjects} text="Back to Subjects"/>
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  const handleCheckAnswer = () => {
    const isCorrect = userAnswer === currentQuestion.answer;
    setResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(score + 1);
    setShowAnswer(true);

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = userAnswer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setResult('');
      setShowAnswer(false);
    } else {
      if (window.confirm(`Quiz completed! Your score is ${score}/${quizData.length}. Would you like to restart?`)) {
        setCurrentQuestionIndex(0);
        setScore(0);
        setAnswers(new Array(quizData.length).fill(''));
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setResult('');
      setShowAnswer(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <Button text="Back to Subjects" onClick={handleBackToSubjects} className="text-blue-600 hover:text-blue-800"/>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">
            Question {currentQuestionIndex + 1} of {quizData.length}
          </h2>
          <div className="text-sm text-gray-600">
            Score: {score}/{quizData.length}
          </div>
        </div>

        {currentQuestion && (
          <Question
            question={currentQuestion?.question}
            choices={currentQuestion?.choices}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            showAnswer={showAnswer}
            correctAnswer={currentQuestion?.answer}
          />
        )}

        {result && <Result result={result} answer={currentQuestion.answer} showAnswer={showAnswer} />}

        <div className="flex justify-between mt-6">
          <Button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center"
            text="Previous"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {!showAnswer ? (
            <Button
              text="Check Answer"
              onClick={handleCheckAnswer}
              disabled={!userAnswer}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            />
          ) : (
            <Button onClick={handleNextQuestion} text="Next" className="flex items-center">
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
