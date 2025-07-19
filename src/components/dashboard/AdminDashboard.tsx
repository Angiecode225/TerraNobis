import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatCard from '../common/StatCard';
import { useNotifications } from '../common/NotificationManager';
import { 
  Users, 
  Sprout, 
  TrendingUp, 
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Activity,
  Plus,
  Settings,
  BarChart3
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showInfo } = useNotifications();

  const stats = {
    totalUsers: 1247,
    activeProjects: 89,
    totalTransactions: '2,450,000',
    platformRevenue: '245,000'
  };

  const recentActivity = [
    { type: 'user', message: 'Nouvel utilisateur inscrit: Fatou Sall (Agriculteur)', time: '5min' },
    { type: 'project', message: 'Projet "Riziculture Bio" validé et publié', time: '15min' },
    { type: 'transaction', message: 'Investissement de 50,000 FCFA dans "Élevage Bovin"', time: '1h' },
    { type: 'alert', message: 'Signalement sur le produit "Tomates Fraîches"', time: '2h' },
    { type: 'system', message: 'Mise à jour du système d\'IA de diagnostic', time: '3h' }
  ];

  const pendingApprovals = [
    { id: 1, type: 'project', title: 'Apiculture Moderne - Tambacounda', farmer: 'Aïssatou Ba', date: '2024-01-20' },
    { id: 2, type: 'farmer', title: 'Vérification KYC - Ousmane Fall', farmer: 'Ousmane Fall', date: '2024-01-19' },
    { id: 3, type: 'product', title: 'Miel Naturel - Certification Bio', farmer: 'Aïssatou Ba', date: '2024-01-18' }
  ];

  const topPerformers = [
    { name: 'Aminata Diallo', role: 'Agriculteur', metric: '125,000 FCFA de ventes', location: 'Thiès' },
    { name: 'Mamadou Sow', role: 'Investisseur', metric: '85% de rendement moyen', location: 'Dakar' },
    { name: 'Fatou Ndiaye', role: 'Agriculteur', metric: '45 investisseurs actifs', location: 'Kaolack' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4 text-blue-600" />;
      case 'project': return <Sprout className="h-4 w-4 text-green-600" />;
      case 'transaction': return <DollarSign className="h-4 w-4 text-yellow-600" />;
      case 'alert': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'system': return <Activity className="h-4 w-4 text-purple-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getApprovalTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-green-100 text-green-800';
      case 'farmer': return 'bg-blue-100 text-blue-800';
      case 'product': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonctions pour les actions rapides
  const handleManageUsers = () => {
    showInfo('Gestion des utilisateurs', 'Fonctionnalité en cours de développement...');
  };

  const handleValidateProjects = () => {
    navigate('/investments');
    showSuccess('Validation de projets', 'Redirection vers la liste des projets à valider !');
  };

  const handleMarketplace = () => {
    navigate('/marketplace');
    showSuccess('Marketplace', 'Redirection vers la marketplace !');
  };

  const handleStatistics = () => {
    showInfo('Statistiques', 'Fonctionnalité en cours de développement...');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'manage-users':
        handleManageUsers();
        break;
      case 'validate-projects':
        handleValidateProjects();
        break;
      case 'marketplace':
        handleMarketplace();
        break;
      case 'statistics':
        handleStatistics();
        break;
      default:
        showInfo('Action', 'Action en cours de développement...');
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Tableau de bord Admin - {user?.name}</h1>
        <p className="text-indigo-100">
          Vue d'ensemble de la plateforme TerraNobis - Gérez les utilisateurs, projets et transactions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Utilisateurs totaux"
          value={stats.totalUsers.toString()}
          icon={Users}
          change="+12% ce mois"
          changeType="increase"
        />
        <StatCard
          title="Projets actifs"
          value={stats.activeProjects.toString()}
          icon={Sprout}
          change="+8 cette semaine"
          changeType="increase"
        />
        <StatCard
          title="Volume transactions"
          value={`${stats.totalTransactions} FCFA`}
          icon={TrendingUp}
          change="+25% ce mois"
          changeType="increase"
        />
        <StatCard
          title="Revenus plateforme"
          value={`${stats.platformRevenue} FCFA`}
          icon={DollarSign}
          change="+18% ce mois"
          changeType="increase"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
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

        {/* Pending Approvals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">En attente d'approbation</h2>
          <div className="space-y-4">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getApprovalTypeColor(item.type)}`}>
                    {item.type === 'project' ? 'Projet' : item.type === 'farmer' ? 'Agriculteur' : 'Produit'}
                  </span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3">Par {item.farmer}</p>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors">
                    <CheckCircle className="h-3 w-3" />
                    <span>Approuver</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Rejeter</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Meilleurs Performeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPerformers.map((performer, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {performer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{performer.name}</h3>
                  <p className="text-sm text-gray-600">{performer.role} • {performer.location}</p>
                </div>
              </div>
              <p className="text-sm text-indigo-600 font-medium">{performer.metric}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Plus className="h-5 w-5 mr-2 text-indigo-600" />
          Actions Rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => handleQuickAction('manage-users')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Users className="h-6 w-6" />
            <span className="font-semibold">Gérer utilisateurs</span>
          </button>
          <button 
            onClick={() => handleQuickAction('validate-projects')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Sprout className="h-6 w-6" />
            <span className="font-semibold">Valider projets</span>
          </button>
          <button 
            onClick={() => handleQuickAction('marketplace')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white px-6 py-4 rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="font-semibold">Marketplace</span>
          </button>
          <button 
            onClick={() => handleQuickAction('statistics')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-4 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <BarChart3 className="h-6 w-6" />
            <span className="font-semibold">Statistiques</span>
          </button>
        </div>
        
        {/* Actions supplémentaires */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-md font-medium text-gray-700 mb-3">Autres actions utiles :</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <button 
              onClick={() => navigate('/academy')}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Activity className="h-4 w-4" />
              <span className="text-sm">Académie</span>
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
            <button 
              onClick={() => navigate('/soil-analysis')}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span className="text-sm">Diagnostic IA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;