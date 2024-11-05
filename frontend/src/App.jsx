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
import IssueApprovalPage from './pages/IssueApprovalPage';
import { IssueProvider } from './context/IssueContext';

const App = () => {
  console.log();
  return (
    <IssueProvider>
      <AuthProvider>
        <Router>
          <GlobalStyles />
          <Navbar />
          <Routes>
            <Route path='/' element={<WelcomePage />} />
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
                <PrivateRoute>
                  <IssueApprovalPage />
                </PrivateRoute>
              }
            />
            {/* Add other roles' dashboards as needed */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </IssueProvider>
  );
};

// Private route component to protect dashboard routes
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  console.log(user);
  return user ? children : <Navigate to='/login' replace />;
};

export default App;
