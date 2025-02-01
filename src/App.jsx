import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { QuizApp } from './components/quiz/QuizApp';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from './context/UserContext';
import Profile from './components/profile/Profile';

function App() {
  return (
    <Router>
      <UserProvider> 
        <QuizProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<QuizApp />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
          <Footer />
        </QuizProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
