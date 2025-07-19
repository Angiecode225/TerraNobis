import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatCard from '../common/StatCard';
import { useNotifications } from '../common/NotificationManager';
import { 
  ShoppingCart, 
  Package, 
  Heart, 
  Star,
  Clock,
  Truck,
  CheckCircle,
  Plus,
  Search,
  Users
} from 'lucide-react';

const BuyerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showInfo } = useNotifications();

  const stats = {
    totalOrders: 24,
    totalSpent: '85,000',
    favoriteProducts: 12,
    averageRating: 4.8
  };

  const recentOrders = [
    {
      id: 1,
      products: 'Mil Bio (5kg), Arachides (2kg)',
      farmer: 'Aminata Diallo',
      total: '8,500',
      status: 'Livré',
      date: '2024-01-15'
    },
    {
      id: 2,
      products: 'Tomates (3kg), Oignons (2kg)',
      farmer: 'Mamadou Sow',
      total: '4,200',
      status: 'En transit',
      date: '2024-01-18'
    },
    {
      id: 3,
      products: 'Miel (1kg), Œufs (2 douzaines)',
      farmer: 'Fatou Ndiaye',
      total: '6,800',
      status: 'Confirmé',
      date: '2024-01-20'
    }
  ];

  const favoriteProducts = [
    {
      id: 1,
      name: 'Mil Bio',
      farmer: 'Aminata Diallo',
      price: '1,500',
      unit: 'kg',
      image: 'https://images.pexels.com/photos/4021761/pexels-photo-4021761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.9,
      inStock: true
    },
    {
      id: 2,
      name: 'Tomates Fraîches',
      farmer: 'Mamadou Sow',
      price: '800',
      unit: 'kg',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 4.7,
      inStock: true
    },
    {
      id: 3,
      name: 'Miel Naturel',
      farmer: 'Aïssatou Ba',
      price: '4,500',
      unit: 'pot',
      image: 'https://images.pexels.com/photos/1638475/pexels-photo-1638475.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      rating: 5.0,
      inStock: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livré': return 'bg-green-100 text-green-800';
      case 'En transit': return 'bg-blue-100 text-blue-800';
      case 'Confirmé': return 'bg-yellow-100 text-yellow-800';
      case 'Annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Livré': return <CheckCircle className="h-4 w-4" />;
      case 'En transit': return <Truck className="h-4 w-4" />;
      case 'Confirmé': return <Clock className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  // Fonctions pour les actions rapides
  const handleBrowseMarketplace = () => {
    navigate('/marketplace');
    showSuccess('Marketplace', 'Redirection vers la marketplace !');
  };

  const handleTrackOrders = () => {
    showInfo('Suivi des commandes', 'Fonctionnalité en cours de développement...');
  };

  const handleMyFavorites = () => {
    navigate('/marketplace');
    showSuccess('Favoris', 'Redirection vers vos produits favoris !');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'browse-marketplace':
        handleBrowseMarketplace();
        break;
      case 'track-orders':
        handleTrackOrders();
        break;
      case 'my-favorites':
        handleMyFavorites();
        break;
      default:
        showInfo('Action', 'Action en cours de développement...');
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Bienvenue, {user?.name}!</h1>
        <p className="text-purple-100">
          Votre tableau de bord acheteur - Découvrez des produits locaux et soutenez nos agriculteurs
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Commandes totales"
          value={stats.totalOrders.toString()}
          icon={ShoppingCart}
          change="+3 ce mois"
          changeType="increase"
        />
        <StatCard
          title="Total dépensé"
          value={`${stats.totalSpent} FCFA`}
          icon={Package}
          change="+12% ce mois"
          changeType="increase"
        />
        <StatCard
          title="Produits favoris"
          value={stats.favoriteProducts.toString()}
          icon={Heart}
          change="+2 cette semaine"
          changeType="increase"
        />
        <StatCard
          title="Note moyenne"
          value={stats.averageRating.toString()}
          icon={Star}
          change="Excellent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Commandes Récentes</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{order.date}</span>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">{order.products}</p>
                  <p className="text-sm text-gray-600">Par {order.farmer}</p>
                  <p className="text-sm font-medium text-gray-900">{order.total} FCFA</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Produits Favoris</h2>
          <div className="space-y-4">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">Par {product.farmer}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm font-medium text-gray-900">
                      {product.price} FCFA/{product.unit}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'En stock' : 'Épuisé'}
                  </span>
                  <button className="p-1 text-red-500 hover:text-red-600">
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Plus className="h-5 w-5 mr-2 text-purple-600" />
          Actions Rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => handleQuickAction('browse-marketplace')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white px-6 py-4 rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="font-semibold">Parcourir la marketplace</span>
          </button>
          <button 
            onClick={() => handleQuickAction('track-orders')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Package className="h-6 w-6" />
            <span className="font-semibold">Suivre mes commandes</span>
          </button>
          <button 
            onClick={() => handleQuickAction('my-favorites')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Heart className="h-6 w-6" />
            <span className="font-semibold">Mes favoris</span>
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
              <Star className="h-4 w-4" />
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
              <CheckCircle className="h-4 w-4" />
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

export default BuyerDashboard;