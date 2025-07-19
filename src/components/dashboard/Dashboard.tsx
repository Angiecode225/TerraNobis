import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import FarmerDashboard from './FarmerDashboard';
import InvestorDashboard from './InvestorDashboard';
import BuyerDashboard from './BuyerDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'farmer':
      return <FarmerDashboard />;
    case 'investor':
      return <InvestorDashboard />;
    case 'buyer':
      return <BuyerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <FarmerDashboard />;
  }
};

export default Dashboard;