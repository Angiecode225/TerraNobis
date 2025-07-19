import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatCard from '../common/StatCard';
import { useNotifications } from '../common/NotificationManager';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Target,
  Calendar,
  Award,
  AlertCircle,
  Plus,
  Search,
  Users,
  BarChart3
} from 'lucide-react';

const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showInfo } = useNotifications();

  const stats = {
    totalInvested: '250,000',
    activeInvestments: 12,
    totalReturns: '45,000',
    averageReturn: '18%'
  };

  const investments = [
    {
      id: 1,
      project: 'Culture de Mil Bio - Thiès',
      farmer: 'Aminata Diallo',
      amount: '50,000',
      expectedReturn: '20%',
      status: 'En cours',
      progress: 65,
      timeLeft: '3 mois'
    },
    {
      id: 2,
      project: 'Élevage Bovin - Fatick',
      farmer: 'Mamadou Sow',
      amount: '80,000',
      expectedReturn: '25%',
      status: 'Finalisé',
      progress: 100,
      timeLeft: 'Terminé'
    },
    {
      id: 3,
      project: 'Jardin Maraîcher - Kaolack',
      farmer: 'Fatou Ndiaye',
      amount: '30,000',
      expectedReturn: '15%',
      status: 'En cours',
      progress: 40,
      timeLeft: '5 mois'
    }
  ];

  const opportunities = [
    {
      id: 1,
      title: 'Riziculture Biologique',
      farmer: 'Ousmane Fall',
      location: 'Saint-Louis',
      target: '150,000',
      current: '85,000',
      expectedReturn: '22%',
      risk: 'Faible'
    },
    {
      id: 2,
      title: 'Apiculture Moderne',
      farmer: 'Aïssatou Ba',
      location: 'Tambacounda',
      target: '75,000',
      current: '45,000',
      expectedReturn: '28%',
      risk: 'Moyen'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Finalisé': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Faible': return 'text-green-600';
      case 'Moyen': return 'text-yellow-600';
      case 'Élevé': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Fonctions pour les actions rapides
  const handleFindProjects = () => {
    navigate('/investments');
    showSuccess('Recherche de projets', 'Redirection vers les projets d\'investissement !');
  };

  const handlePortfolioAnalysis = () => {
    showInfo('Analyse de portefeuille', 'Fonctionnalité en cours de développement...');
  };

  const handleNetworkWithFarmers = () => {
    navigate('/networking');
    showSuccess('Réseau', 'Redirection vers le hub de networking !');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'find-projects':
        handleFindProjects();
        break;
      case 'portfolio-analysis':
        handlePortfolioAnalysis();
        break;
      case 'network-farmers':
        handleNetworkWithFarmers();
        break;
      default:
        showInfo('Action', 'Action en cours de développement...');
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Bienvenue, {user?.name}!</h1>
        <p className="text-blue-100">
          Votre tableau de bord investisseur - Suivez vos investissements et découvrez de nouvelles opportunités
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total investi"
          value={`${stats.totalInvested} FCFA`}
          icon={DollarSign}
          change="+15% ce mois"
          changeType="increase"
        />
        <StatCard
          title="Investissements actifs"
          value={stats.activeInvestments.toString()}
          icon={TrendingUp}
          change="+2 ce mois"
          changeType="increase"
        />
        <StatCard
          title="Retours totaux"
          value={`${stats.totalReturns} FCFA`}
          icon={PieChart}
          change="+8% ce mois"
          changeType="increase"
        />
        <StatCard
          title="Rendement moyen"
          value={stats.averageReturn}
          icon={Target}
          change="+2% ce mois"
          changeType="increase"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Investments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mes Investissements</h2>
          <div className="space-y-4">
            {investments.map((investment) => (
              <div key={investment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{investment.project}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                    {investment.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Agriculteur: {investment.farmer}</span>
                    <span>{investment.amount} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Rendement: {investment.expectedReturn}</span>
                    <span>{investment.timeLeft}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${investment.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Opportunities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Opportunités d'Investissement</h2>
          <div className="space-y-4">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{opportunity.title}</h3>
                  <span className={`text-sm font-medium ${getRiskColor(opportunity.risk)}`}>
                    {opportunity.risk}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Par {opportunity.farmer}</span>
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Objectif: {opportunity.target} FCFA</span>
                    <span>Rendement: {opportunity.expectedReturn}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(parseInt(opportunity.current) / parseInt(opportunity.target)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {opportunity.current} / {opportunity.target} FCFA collectés
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance du Portefeuille</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Meilleur investissement</p>
            <p className="font-semibold text-gray-900">Élevage Bovin (+25%)</p>
          </div>
          <div className="text-center">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Prochaine échéance</p>
            <p className="font-semibold text-gray-900">Mil Bio (3 mois)</p>
          </div>
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Attention requise</p>
            <p className="font-semibold text-gray-900">Aucune</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Plus className="h-5 w-5 mr-2 text-blue-600" />
          Actions Rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => handleQuickAction('find-projects')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Search className="h-6 w-6" />
            <span className="font-semibold">Trouver des projets</span>
          </button>
          <button 
            onClick={() => handleQuickAction('portfolio-analysis')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <BarChart3 className="h-6 w-6" />
            <span className="font-semibold">Analyse portefeuille</span>
          </button>
          <button 
            onClick={() => handleQuickAction('network-farmers')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white px-6 py-4 rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Users className="h-6 w-6" />
            <span className="font-semibold">Réseau agriculteurs</span>
          </button>
        </div>
        
        {/* Actions supplémentaires */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-md font-medium text-gray-700 mb-3">Autres actions utiles :</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <button 
              onClick={() => navigate('/marketplace')}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <DollarSign className="h-4 w-4" />
              <span className="text-sm">Marketplace</span>
            </button>
            <button 
              onClick={() => navigate('/academy')}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Award className="h-4 w-4" />
              <span className="text-sm">Formation</span>
            </button>
            <button 
              onClick={() => navigate('/messages')}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Messages</span>
            </button>
            <button 
              onClick={() => navigate('/soil-analysis')}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">Diagnostic IA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;