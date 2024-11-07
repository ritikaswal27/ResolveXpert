// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import IssueApprovalPage from './pages/IssueApprovalPage';
import { IssueProvider } from './context/IssueContext';
import GetAllUsersPage from './pages/UsersPage';

const App = () => {
  return (
    <IssueProvider>
      <AuthProvider>
        <Router>
          <GlobalStyles />
          <ConditionalNavbar />
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path='/approvals'
              element={
                <PrivateRouteForRole role='manager'>
                  <IssueApprovalPage />
                </PrivateRouteForRole>
              }
            />
            <Route
              path='/users'
              element={
                <PrivateRouteForRole role='manager'>
                  <GetAllUsersPage />
                </PrivateRouteForRole>
              }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </IssueProvider>
  );
};

// Component to conditionally render Navbar
const ConditionalNavbar = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/login'];

  return !hideNavbarPaths.includes(location.pathname) ? <Navbar /> : null;
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to='/login' replace />;
};

const PrivateRouteForRole = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user && user.role === role ? (
    children
  ) : (
    <Navigate to='/login' replace />
  );
};

export default App;
