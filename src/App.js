import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './assets/styles/App.css';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import MovieDetail from './pages/MovieDetail';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MyList from './pages/MyList';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppContent() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/browse" /> : <Home />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/browse" /> : <LoginPage />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/browse" /> : <SignUpPage />} />
      <Route 
        path="/browse" 
        element={
          <ProtectedRoute>
            <Browse />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/movie/:id" 
        element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mylist" 
        element={
          <ProtectedRoute>
            <MyList />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;