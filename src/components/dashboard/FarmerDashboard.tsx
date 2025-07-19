import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatCard from '../common/StatCard';
import { useNotifications } from '../common/NotificationManager';
import { 
  Sprout, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Plus,
  Upload,
  Search
} from 'lucide-react';
import Popup from '../common/Popup';
import CreateProjectModal from '../projects/CreateProjectModal';

const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showInfo } = useNotifications();
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  // Mock data - in real app, this would come from API
  const stats = {
    activeProjects: 3,
    totalInvestment: '125,000',
    investors: 47,
    monthlyRevenue: '18,500'
  };

  const recentProjects = [
    {
      id: 1,
      name: 'Culture de Mil Bio',
      status: 'En cours',
      progress: 75,
      investors: 12,
      funding: '45,000 / 60,000'
    },
    {
      id: 2,
      name: 'Élevage de Poules Pondeuses',
      status: 'Finalisé',
      progress: 100,
      investors: 8,
      funding: '30,000 / 30,000'
    },
    {
      id: 3,
      name: 'Jardin Maraîcher',
      status: 'En attente',
      progress: 25,
      investors: 5,
      funding: '15,000 / 40,000'
    }
  ];

  const recentActivity = [
    { type: 'investment', message: 'Nouvel investissement de 5,000 FCFA dans votre projet Mil Bio', time: '2h' },
    { type: 'update', message: 'Mise à jour de projet demandée par vos investisseurs', time: '4h' },
    { type: 'sale', message: 'Vente de 50kg de mil à la marketplace', time: '1j' },
    { type: 'certification', message: 'Certification bio approuvée pour votre exploitation', time: '2j' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Finalisé': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'investment': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'update': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'sale': return <DollarSign className="h-4 w-4 text-blue-600" />;
      case 'certification': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Calendar className="h-4 w-4 text-gray-600" />;
    }
  };

  // Fonctions pour les actions rapides
  const handleCreateProject = () => {
    setShowCreateProject(true);
    showInfo('Création de projet', 'Ouvrir le formulaire de création de projet...');
  };

  const handleSellProducts = () => {
    navigate('/marketplace');
    showSuccess('Marketplace', 'Redirection vers la marketplace pour vendre vos produits !');
  };

  const handleDiagnosticIA = () => {
    navigate('/soil-analysis');
    showSuccess('Diagnostic IA', 'Redirection vers l\'analyse de sol avec IA !');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create-project':
        handleCreateProject();
        break;
      case 'sell-products':
        handleSellProducts();
        break;
      case 'diagnostic-ia':
        handleDiagnosticIA();
        break;
      default:
        showInfo('Action', 'Action en cours de développement...');
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Bienvenue, {user?.name}!</h1>
        <p className="text-green-100">
          Votre tableau de bord agriculteur - Gérez vos projets, suivez vos investissements et développez votre exploitation
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Projets actifs"
          value={stats.activeProjects.toString()}
          icon={Sprout}
          change="+1 ce mois"
          changeType="increase"
        />
        <StatCard
          title="Investissements totaux"
          value={`${stats.totalInvestment} FCFA`}
          icon={TrendingUp}
          change="+12% ce mois"
          changeType="increase"
        />
        <StatCard
          title="Investisseurs"
          value={stats.investors.toString()}
          icon={Users}
          change="+5 cette semaine"
          changeType="increase"
        />
        <StatCard
          title="Revenus mensuels"
          value={`${stats.monthlyRevenue} FCFA`}
          icon={DollarSign}
          change="+8% ce mois"
          changeType="increase"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mes Projets Récents</h2>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{project.investors} investisseurs</span>
                    <span>{project.funding} FCFA</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Plus className="h-5 w-5 mr-2 text-green-600" />
          Actions Rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => handleQuickAction('create-project')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Sprout className="h-6 w-6" />
            <span className="font-semibold">Créer un projet</span>
          </button>
          <button 
            onClick={() => handleQuickAction('sell-products')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <DollarSign className="h-6 w-6" />
            <span className="font-semibold">Vendre mes produits</span>
          </button>
          <button 
            onClick={() => handleQuickAction('diagnostic-ia')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white px-6 py-4 rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Search className="h-6 w-6" />
            <span className="font-semibold">Diagnostic IA</span>
          </button>
        </div>
        
        {/* Actions supplémentaires */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-md font-medium text-gray-700 mb-3">Autres actions utiles :</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <button 
              onClick={() => navigate('/my-projects')}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Mes projets</span>
            </button>
            <button 
              onClick={() => navigate('/academy')}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Formation</span>
            </button>
            <button 
              onClick={() => navigate('/networking')}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span className="text-sm">Réseau</span>
            </button>
            <button 
              onClick={() => navigate('/messages')}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Messages</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de création de projet */}
      <CreateProjectModal
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
        onSubmit={(projectData) => {
          console.log('Nouveau projet créé:', projectData);
          setShowCreateProject(false);
          showSuccess('Projet créé !', 'Votre nouveau projet a été créé avec succès !');
          // Optionnel : rediriger vers la liste des projets
          setTimeout(() => navigate('/my-projects'), 1000);
        }}
      />
    </div>
  );
};

export default FarmerDashboard;