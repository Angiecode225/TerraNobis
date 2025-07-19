import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../common/NotificationManager';
import { 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  Plus,
  Filter,
  Search,
  Eye,
  BarChart3,
  Target,
  Clock,
  Award,
  AlertCircle
} from 'lucide-react';
import Popup from '../common/Popup';
import ProjectDetailsPopup from '../popups/ProjectDetailsPopup';

interface Investment {
  id: string;
  projectTitle: string;
  farmerName: string;
  location: string;
  culture: string;
  investedAmount: number;
  totalProjectAmount: number;
  expectedReturn: number;
  duration: number;
  status: 'active' | 'completed' | 'pending' | 'cancelled';
  progress: number;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
  updates: string[];
  riskLevel: 'Faible' | 'Moyen' | 'Élevé';
  aiScore: number;
}

const InvestmentList: React.FC = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  // Mock investments data
  const mockInvestments: Investment[] = [
    {
      id: '1',
      projectTitle: 'Culture de Mil Bio - Thiès',
      farmerName: 'Aminata Diallo',
      location: 'Thiès, Sénégal',
      culture: 'Mil Biologique',
      investedAmount: 25000,
      totalProjectAmount: 60000,
      expectedReturn: 22,
      duration: 8,
      status: 'active',
      progress: 75,
      startDate: '2024-01-10',
      endDate: '2024-09-10',
      image: 'https://images.pexels.com/photos/4021761/pexels-photo-4021761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Projet de culture de mil biologique sur 5 hectares utilisant des techniques ancestrales optimisées par IA.',
      updates: [
        'Plantation terminée avec succès',
        'Première irrigation effectuée',
        'Croissance des plants conforme aux prévisions'
      ],
      riskLevel: 'Faible',
      aiScore: 92
    },
    {
      id: '2',
      projectTitle: 'Élevage de Poules Pondeuses - Fatick',
      farmerName: 'Mamadou Sow',
      location: 'Fatick, Sénégal',
      culture: 'Élevage Avicole',
      investedAmount: 30000,
      totalProjectAmount: 80000,
      expectedReturn: 28,
      duration: 12,
      status: 'active',
      progress: 60,
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      image: 'https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Développement d\'un élevage moderne de 500 poules pondeuses avec vente d\'œufs bio sur le marché local.',
      updates: [
        'Construction du poulailler terminée',
        'Arrivée des premières poules',
        'Production d\'œufs en cours'
      ],
      riskLevel: 'Moyen',
      aiScore: 88
    },
    {
      id: '3',
      projectTitle: 'Jardin Maraîcher - Kaolack',
      farmerName: 'Fatou Ndiaye',
      location: 'Kaolack, Sénégal',
      culture: 'Légumes Divers',
      investedAmount: 15000,
      totalProjectAmount: 40000,
      expectedReturn: 18,
      duration: 6,
      status: 'completed',
      progress: 100,
      startDate: '2023-07-01',
      endDate: '2024-01-01',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Création d\'un jardin maraîcher bio de 2 hectares avec rotation des cultures et irrigation moderne.',
      updates: [
        'Projet terminé avec succès',
        'Rendement supérieur aux prévisions',
        'Remboursement effectué'
      ],
      riskLevel: 'Faible',
      aiScore: 85
    }
  ];

  const filteredInvestments = mockInvestments.filter(investment => {
    const matchesSearch = investment.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && investment.status === 'active') ||
                         (selectedFilter === 'completed' && investment.status === 'completed') ||
                         (selectedFilter === 'high-return' && investment.expectedReturn >= 25);
    
    return matchesSearch && matchesFilter;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'En cours';
      case 'completed': return 'Terminé';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Faible': return 'text-green-600 bg-green-100';
      case 'Moyen': return 'text-yellow-600 bg-yellow-100';
      case 'Élevé': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleViewDetails = (investment: Investment) => {
    setSelectedInvestment(investment);
    setShowDetailsPopup(true);
  };

  const totalInvested = mockInvestments.reduce((sum, inv) => sum + inv.investedAmount, 0);
  const totalExpectedReturn = mockInvestments.reduce((sum, inv) => sum + (inv.investedAmount * inv.expectedReturn / 100), 0);
  const activeInvestments = mockInvestments.filter(inv => inv.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Mes Investissements</h1>
            <p className="text-blue-100">
              Suivez vos investissements agricoles et leurs performances
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{totalInvested.toLocaleString()} FCFA</div>
            <div className="text-blue-100">Total investi</div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Investissements actifs</p>
              <p className="text-2xl font-semibold text-gray-900">{activeInvestments}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rendement attendu</p>
              <p className="text-2xl font-semibold text-gray-900">{totalExpectedReturn.toLocaleString()} FCFA</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rendement moyen</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockInvestments.length > 0 
                  ? (mockInvestments.reduce((sum, inv) => sum + inv.expectedReturn, 0) / mockInvestments.length).toFixed(1)
                  : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet, agriculteur ou lieu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tous les investissements</option>
                <option value="active">En cours</option>
                <option value="completed">Terminés</option>
                <option value="high-return">Rendement élevé (25%+)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Investments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvestments.map((investment) => (
          <div key={investment.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Investment Image */}
            <div className="h-48 bg-gray-200 relative">
              <img
                src={investment.image}
                alt={investment.projectTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(investment.riskLevel)}`}>
                  Risque {investment.riskLevel}
                </span>
                <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <TrendingUp className={`h-3 w-3 mr-1 ${getAIScoreColor(investment.aiScore)}`} />
                  <span className={getAIScoreColor(investment.aiScore)}>IA: {investment.aiScore}%</span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                  {getStatusLabel(investment.status)}
                </span>
              </div>
            </div>

            {/* Investment Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{investment.projectTitle}</h3>
              <p className="text-gray-600 text-sm mb-4">{investment.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Agriculteur:</span>
                  <span className="font-medium text-gray-900">{investment.farmerName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Localisation:</span>
                  <span className="font-medium text-gray-900">{investment.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Investi:</span>
                  <span className="font-medium text-gray-900">{investment.investedAmount.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rendement attendu:</span>
                  <span className="font-medium text-green-600">{investment.expectedReturn}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progression</span>
                  <span className="font-medium text-gray-900">{investment.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${investment.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleViewDetails(investment)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Voir détails
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Suivre
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredInvestments.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun investissement trouvé</h3>
          <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
        </div>
      )}

      {/* Investment Details Popup */}
      <Popup
        isOpen={showDetailsPopup}
        onClose={() => setShowDetailsPopup(false)}
        size="xl"
      >
        {selectedInvestment && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Détails de l'investissement</h2>
              <button
                onClick={() => setShowDetailsPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Fermer</span>
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Info */}
              <div>
                <img
                  src={selectedInvestment.image}
                  alt={selectedInvestment.projectTitle}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedInvestment.projectTitle}</h3>
                <p className="text-gray-600 mb-4">{selectedInvestment.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agriculteur:</span>
                    <span className="font-medium">{selectedInvestment.farmerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Localisation:</span>
                    <span className="font-medium">{selectedInvestment.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Culture:</span>
                    <span className="font-medium">{selectedInvestment.culture}</span>
                  </div>
                </div>
              </div>

              {/* Investment Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Détails financiers</h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Montant investi:</span>
                      <span className="font-semibold text-gray-900">{selectedInvestment.investedAmount.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Rendement attendu:</span>
                      <span className="font-semibold text-green-600">{selectedInvestment.expectedReturn}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gains attendus:</span>
                      <span className="font-semibold text-green-600">
                        {(selectedInvestment.investedAmount * selectedInvestment.expectedReturn / 100).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Date de début:</span>
                      <span className="font-medium">{new Date(selectedInvestment.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Date de fin:</span>
                      <span className="font-medium">{new Date(selectedInvestment.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durée:</span>
                      <span className="font-medium">{selectedInvestment.duration} mois</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Mises à jour récentes</h5>
                    <ul className="space-y-1">
                      {selectedInvestment.updates.map((update, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-500 mr-2 mt-1">•</span>
                          {update}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default InvestmentList; 