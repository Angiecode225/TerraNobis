import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NotificationManager from './components/common/NotificationManager';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Navigation from './components/Navigation';
import Dashboard from './components/dashboard/Dashboard';
import SoilAnalysis from './components/soil/SoilAnalysis';
import ProjectList from './components/projects/ProjectList';
import InvestmentList from './components/investments/InvestmentList';
import Marketplace from './components/marketplace/Marketplace';
import Academy from './components/academy/Academy';
// import Messages from './components/messages/Messages';
import NetworkingHub from './components/networking/NetworkingHub';
import LandingPage from './components/public/LandingPage';
import PublicInvestments from './components/public/PublicInvestments';
import PublicMarketplace from './components/public/PublicMarketplace';
import PublicAcademy from './components/public/PublicAcademy';
import AIAssistant from './components/ai/AIAssistant';
import LoadingSpinner from './components/common/LoadingSpinner';

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Auth routes
  if (!user) {
    return (
      <>
        <Routes>
          <Route path="/" element={<LandingPage onNavigate={(page) => navigate(`/${page}`)} onLogin={() => navigate('/login')} />} />
          <Route path="/login" element={<LoginForm onToggleMode={() => setIsRegisterMode(true)} />} />
          <Route path="/register" element={<RegisterForm onToggleMode={() => setIsRegisterMode(false)} />} />
          <Route path="/public-investments" element={<PublicInvestments onLogin={() => navigate('/login')} />} />
          <Route path="/public-marketplace" element={<PublicMarketplace onLogin={() => navigate('/login')} />} />
          <Route path="/public-academy" element={<PublicAcademy onLogin={() => navigate('/login')} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* <AIAssistant isOpen={isAIOpen} onToggle={() => setIsAIOpen(!isAIOpen)} /> */}
      </>
    );
  }

  // Private (auth) routes
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={''} onPageChange={(page) => navigate(`/${page}`)} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/soil-analysis" element={<SoilAnalysis />} />
          <Route path="/my-projects" element={<ProjectList />} />
          <Route path="/investments" element={<InvestmentList />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/academy" element={<Academy />} />
          {/* <Route path="/messages" element={<Messages />} /> */}
          <Route path="/networking" element={<NetworkingHub />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        {/* <AIAssistant isOpen={isAIOpen} onToggle={() => setIsAIOpen(!isAIOpen)} /> */}
      </main>
      {/* <AIAssistant isOpen={isAIOpen} onToggle={() => setIsAIOpen(!isAIOpen)} /> */}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <NotificationManager>
        <AppRoutes />
      </NotificationManager>
    </AuthProvider>
  );
}

export default App;