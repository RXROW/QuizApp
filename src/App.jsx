import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import { QuizApp } from "./components/quiz/QuizApp";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider, { useAuth } from "./context/UserContext";
import Profile from "./components/profile/Profile";
import Dashboard from "./components/dashboard/Dashboard";
import CreateQuiz from "./components/dashboard/CreateQuiz/CreateNewQuiz";
import CreateNewSubject from "./components/dashboard/CreateSubject/CreateNewSubject";
import Users from "./components/dashboard/users/Users";
import ForgetPassword from "./components/auth/ForgetPassword";
import ProtectedRoute from "./ProtectedRoute";
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
            <Route path="/forget-password" element={<ForgetPassword />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/dashboard/create-quiz"
              element={<ProtectedRoute element={<CreateQuiz />} />}
            />
            <Route
              path="/dashboard/create-subject"
              element={<ProtectedRoute element={<CreateNewSubject />} />}
            />
            <Route
              path="/dashboard/users"
              element={<ProtectedRoute element={<Users />} />}
            />
          </Routes>
          <Footer />
        </QuizProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
