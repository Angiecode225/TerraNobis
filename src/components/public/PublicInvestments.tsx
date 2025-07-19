import React, { useState } from 'react';
import { PublicInvestmentsProps } from '../../types';
import { 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  ArrowRight,
  Filter,
  Search,
  Leaf,
  Award,
  Clock
} from 'lucide-react';

const PublicInvestments: React.FC<PublicInvestmentsProps> = ({ onLogin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = [
    {
      id: '1',
      title: 'Culture de Mil Bio - Thiès',
      farmer: 'Aminata Diallo',
      location: 'Thiès, Sénégal',
      culture: 'Mil Biologique',
      targetAmount: 60000,
      currentAmount: 45000,
      investors: 23,
      expectedReturn: 22,
      duration: 8,
      riskLevel: 'Faible',
      image: 'https://images.pexels.com/photos/4021761/pexels-photo-4021761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Projet de culture de mil biologique sur 5 hectares utilisant des techniques ancestrales optimisées par IA.',
      highlights: ['Certification Bio', 'Techniques Ancestrales', 'IA Optimisée'],
      aiScore: 92
    },
    {
      id: '2',
      title: 'Élevage de Poules Pondeuses - Fatick',
      farmer: 'Mamadou Sow',
      location: 'Fatick, Sénégal',
      culture: 'Élevage Avicole',
      targetAmount: 80000,
      currentAmount: 65000,
      investors: 31,
      expectedReturn: 28,
      duration: 12,
      riskLevel: 'Moyen',
      image: 'https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Développement d\'un élevage moderne de 500 poules pondeuses avec vente d\'œufs bio sur le marché local.',
      highlights: ['Marché Local Garanti', 'Élevage Moderne', 'Rentabilité Élevée'],
      aiScore: 88
    },
    {
      id: '3',
      title: 'Jardin Maraîcher Urbain - Dakar',
      farmer: 'Fatou Ndiaye',
      location: 'Dakar, Sénégal',
      culture: 'Maraîchage',
      targetAmount: 45000,
      currentAmount: 28000,
      investors: 18,
      expectedReturn: 25,
      duration: 6,
      riskLevel: 'Faible',
      image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Création d\'un jardin maraîcher urbain de 1 hectare avec système d\'irrigation intelligent.',
      highlights: ['Agriculture Urbaine', 'Irrigation Intelligente', 'Proximité Marché'],
      aiScore: 95
    },
    {
      id: '4',
      title: 'Riziculture Biologique - Saint-Louis',
      farmer: 'Ousmane Fall',
      location: 'Saint-Louis, Sénégal',
      culture: 'Riz Bio',
      targetAmount: 120000,
      currentAmount: 85000,
      investors: 42,
      expectedReturn: 20,
      duration: 10,
      riskLevel: 'Moyen',
      image: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Production de riz biologique sur 8 hectares dans la vallée du fleuve Sénégal.',
      highlights: ['Vallée du Fleuve', 'Export Potentiel', 'Subventions Gouvernementales'],
      aiScore: 85
    },
    {
      id: '5',
      title: 'Apiculture Moderne - Tambacounda',
      farmer: 'Aïssatou Ba',
      location: 'Tambacounda, Sénégal',
      culture: 'Apiculture',
      targetAmount: 35000,
      currentAmount: 12000,
      investors: 8,
      expectedReturn: 35,
      duration: 18,
      riskLevel: 'Élevé',
      image: 'https://images.pexels.com/photos/1638475/pexels-photo-1638475.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Développement d\'un rucher moderne avec 50 ruches et production de miel bio.',
      highlights: ['Miel Bio Premium', 'Marché Export', 'Forte Demande'],
      aiScore: 78
    },
    {
      id: '6',
      title: 'Culture d\'Arachides - Kaolack',
      farmer: 'Cheikh Diop',
      location: 'Kaolack, Sénégal',
      culture: 'Arachide',
      targetAmount: 70000,
      currentAmount: 52000,
      investors: 29,
      expectedReturn: 18,
      duration: 7,
      riskLevel: 'Faible',
      image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Culture d\'arachides sur 6 hectares avec techniques modernes et contrats d\'achat garantis.',
      highlights: ['Contrats Garantis', 'Bassin Arachidier', 'Techniques Modernes'],
      aiScore: 90
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'high-return' && project.expectedReturn >= 25) ||
                         (selectedFilter === 'low-risk' && project.riskLevel === 'Faible') ||
                         (selectedFilter === 'bio' && project.highlights.some(h => h.includes('Bio')));
    
    return matchesSearch && matchesFilter;
  });

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Investissements Agricoles
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Découvrez des projets agricoles rentables analysés par notre IA. 
              Investissez dans l'agriculture locale et soutenez la souveraineté alimentaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onLogin}
                className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Commencer à investir
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">156</div>
              <div className="text-gray-600">Projets financés</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">23.5%</div>
              <div className="text-gray-600">Rendement moyen</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">2,847</div>
              <div className="text-gray-600">Investisseurs actifs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600">98%</div>
              <div className="text-gray-600">Taux de réussite</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
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
                  <option value="all">Tous les projets</option>
                  <option value="high-return">Rendement élevé (25%+)</option>
                  <option value="low-risk">Risque faible</option>
                  <option value="bio">Agriculture biologique</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Project Image */}
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(project.riskLevel)}`}>
                    Risque {project.riskLevel}
                  </span>
                  <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <TrendingUp className={`h-3 w-3 mr-1 ${getAIScoreColor(project.aiScore)}`} />
                    <span className={getAIScoreColor(project.aiScore)}>IA: {project.aiScore}%</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {project.culture}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.highlights.slice(0, 2).map((highlight, index) => (
                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Farmer & Location */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {project.farmer}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Financement</span>
                    <span className="text-sm font-medium text-gray-900">
                      {((project.currentAmount / project.targetAmount) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(project.currentAmount / project.targetAmount) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{project.currentAmount.toLocaleString()} FCFA</span>
                    <span>{project.targetAmount.toLocaleString()} FCFA</span>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium text-gray-900">{project.expectedReturn}%</span>
                    </div>
                    <div className="text-xs text-gray-500">Rendement</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-sm font-medium text-gray-900">{project.duration}m</span>
                    </div>
                    <div className="text-xs text-gray-500">Durée</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center">
                      <Users className="h-4 w-4 text-purple-600 mr-1" />
                      <span className="text-sm font-medium text-gray-900">{project.investors}</span>
                    </div>
                    <div className="text-xs text-gray-500">Investisseurs</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={onLogin}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    Investir maintenant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à investir dans l'agriculture ?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Rejoignez des milliers d'investisseurs qui soutiennent l'agriculture locale 
            et génèrent des revenus durables.
          </p>
          <button 
            onClick={onLogin}
            className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-lg"
          >
            Créer mon compte investisseur
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicInvestments;