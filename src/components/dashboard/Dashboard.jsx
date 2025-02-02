import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  BookOpen, Trophy, Clock, Users,
  BrainCircuit, BarChart3, Medal,
  
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link  } from 'react-router-dom';
 

const Dashboard = () => {
  const stats = {
    totalQuizzes: 24,
    totalSubjects: 4,
    completedQuizzes: 18,
    averageScore: 85,
  
    participants: 156,
    activeQuizzes: 6
  };
 
  const performanceData = [
    { month: 'Jan', score: 75 },
    { month: 'Feb', score: 82 },
    { month: 'Mar', score: 78 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 90 },
    { month: 'Jun', score: 88 }
  ];

  // Sample data for recent quizzes
  const recentQuizzes = [
    { id: 1, title: "JavaScript Basics", participants: 45, avgScore: 82 },
    { id: 2, title: "React Fundamentals", participants: 38, avgScore: 78 },
    { id: 3, title: "Python Programming", participants: 52, avgScore: 85 }
  ];

  // Sample data for top performers
  const topPerformers = [
    { id: 1, name: "Alex Johnson", score: 98, quizzesTaken: 15 },
    { id: 2, name: "Sarah Smith", score: 96, quizzesTaken: 12 },
    { id: 3, name: "Mike Brown", score: 95, quizzesTaken: 14 }
  ];

  return (
    <div className="   max-w-7xl mx-auto py-6  space-y-6 mt-20">
      {/* Header */}
      <div className="flex justify-between    items-center">
        <h1 className="text-3xl  font-bold">Quiz Dashboard</h1>
        <div className=" flex items-center gap-4">
        <Link to="/dashboard/create-subject" className=" bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
  Create New Subject
</Link>
<Link to="/dashboard/create-quiz" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
  Create New Quiz
</Link>
        </div>
      
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <CardTitle>Total Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalQuizzes}</p>
            <p className="text-gray-600">Created quizzes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <CardTitle>Total Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalSubjects}</p>
            <p className="text-gray-600">Created subjects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <CardTitle>Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.averageScore}%</p>
            <p className="text-gray-600">Across all quizzes</p>
          </CardContent>
        </Card>

        <Card>
          <Link to="/dashboard/users">
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <Users className="w-6 h-6 text-purple-600" />
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.participants}</p>
            <p className="text-gray-600">Total Users</p>
          </CardContent>
          </Link>

        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <BrainCircuit className="w-6 h-6 text-red-600" />
            <CardTitle>Active Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.activeQuizzes}</p>
            <p className="text-gray-600">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            <CardTitle>Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {Math.round((stats.completedQuizzes / stats.totalQuizzes) * 100)}%
            </p>
            <p className="text-gray-600">Quiz completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Quizzes and Top Performers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Quizzes */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuizzes.map(quiz => (
                <div key={quiz.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{quiz.title}</h3>
                    <p className="text-sm text-gray-600">{quiz.participants} participants</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">{quiz.avgScore}%</p>
                    <p className="text-sm text-gray-600">Avg. Score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={performer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Medal className={`w-5 h-5 ${
                      index === 0 ? 'text-yellow-500' :
                      index === 1 ? 'text-gray-400' :
                      'text-bronze-500'
                    }`} />
                    <div>
                      <h3 className="font-medium">{performer.name}</h3>
                      <p className="text-sm text-gray-600">{performer.quizzesTaken} quizzes taken</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">{performer.score}%</p>
                    <p className="text-sm text-gray-600">Avg. Score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;