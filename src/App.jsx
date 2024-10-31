// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WelcomePage } from './pages';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyles />
        <Navbar />
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/employee-dashboard'
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          {/* Add other roles' dashboards as needed */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Private route component to protect dashboard routes
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to='/login' replace />;
};

export default App;
