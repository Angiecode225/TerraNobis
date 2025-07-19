import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../common/NotificationManager';
import { Project, ProjectDetails } from '../../types';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Plus,
  Filter,
  Search,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import Popup from '../common/Popup';
import ProjectDetailsPopup from '../popups/ProjectDetailsPopup';
import CreateProjectModal from './CreateProjectModal';

const ProjectList: React.FC = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  // State dynamique pour les projets
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Culture de Mil Bio - Thiès',
      description: 'Projet de culture de mil biologique sur 5 hectares avec techniques ancestrales et modernes combinées.',
      farmerId: 'farmer1',
      farmerName: 'Aminata Diallo',
      location: 'Thiès, Sénégal',
      culture: 'Mil',
      targetAmount: 60000,
      currentAmount: 45000,
      duration: 8,
      expectedReturn: 20,
      status: 'active',
      images: [
        'https://images.pexels.com/photos/4021761/pexels-photo-4021761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
        'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
      ],
      investors: [
        { id: 'inv1', name: 'Mamadou Sow', amount: 25000, percentage: 41.7, investedAt: '2024-01-10' },
        { id: 'inv2', name: 'Fatou Ndiaye', amount: 20000, percentage: 33.3, investedAt: '2024-01-15' }
      ],
      updates: [
        {
          id: 'up1',
          title: 'Préparation du terrain terminée',
          description: 'Le terrain a été préparé selon les techniques ancestrales avec labour profond.',
          images: ['https://images.pexels.com/photos/4021761/pexels-photo-4021761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'],
          createdAt: '2024-01-20'
        }
      ],
      createdAt: '2024-01-05'
    },
    {
      id: '2',
      title: 'Élevage de Poules Pondeuses - Fatick',
      description: 'Développement d\'un élevage moderne de poules pondeuses avec 500 poules et vente d\'œufs bio.',
      farmerId: 'farmer2',
      farmerName: 'Mamadou Sow',
      location: 'Fatick, Sénégal',
      culture: 'Élevage',
      targetAmount: 80000,
      currentAmount: 80000,
      duration: 12,
      expectedReturn: 25,
      status: 'completed',
      images: [
        'https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
      ],
      investors: [
        { id: 'inv3', name: 'Aïssatou Ba', amount: 50000, percentage: 62.5, investedAt: '2023-12-01' },
        { id: 'inv4', name: 'Ousmane Fall', amount: 30000, percentage: 37.5, investedAt: '2023-12-05' }
      ],
      updates: [],
      createdAt: '2023-11-15'
    },
    {
      id: '3',
      title: 'Jardin Maraîcher Biologique - Kaolack',
      description: 'Création d\'un jardin maraîcher de 2 hectares avec production de légumes bio pour la vente locale.',
      farmerId: 'farmer3',
      farmerName: 'Fatou Ndiaye',
      location: 'Kaolack, Sénégal',
      culture: 'Maraîchage',
      targetAmount: 40000,
      currentAmount: 15000,
      duration: 6,
      expectedReturn: 18,
      status: 'active',
      images: [
        'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
      ],
      investors: [
        { id: 'inv5', name: 'Cheikh Diop', amount: 15000, percentage: 37.5, investedAt: '2024-01-18' }
      ],
      updates: [],
      createdAt: '2024-01-12'
    }
  ]);

  // Charger les projets depuis localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('terranobis_projects');
    if (saved) setProjects(JSON.parse(saved));
  }, []);
  // Sauvegarder les projets à chaque modification
  useEffect(() => {
    localStorage.setItem('terranobis_projects', JSON.stringify(projects));
  }, [projects]);

  // Remplacer mockProjects par projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || project.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'En cours';
      case 'completed': return 'Terminé';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const handleViewDetails = (project: Project) => {
    // Convertir le projet en ProjectDetails avec des données complémentaires
    const projectDetails: ProjectDetails = {
      ...project,
      farmerAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      farmerBio: 'Agriculteur expérimenté avec 15 ans d\'expérience dans l\'agriculture biologique et durable.',
      financialPlan: {
        budgetBreakdown: [
          { category: 'Semences et plants', amount: 15000, percentage: 25 },
          { category: 'Équipements', amount: 20000, percentage: 33.3 },
          { category: 'Irrigation', amount: 12000, percentage: 20 },
          { category: 'Main d\'œuvre', amount: 8000, percentage: 13.3 },
          { category: 'Marketing', amount: 5000, percentage: 8.4 }
        ],
        revenueProjections: [
          { month: 'Mois 1', projectedRevenue: 0 },
          { month: 'Mois 2', projectedRevenue: 0 },
          { month: 'Mois 3', projectedRevenue: 5000 },
          { month: 'Mois 4', projectedRevenue: 8000 },
          { month: 'Mois 5', projectedRevenue: 12000 },
          { month: 'Mois 6', projectedRevenue: 15000 },
          { month: 'Mois 7', projectedRevenue: 18000 },
          { month: 'Mois 8', projectedRevenue: 25000 }
        ]
      },
      technicalDetails: {
        soilType: 'Argilo-limoneux',
        irrigationSystem: 'Goutte-à-goutte',
        farmingTechniques: ['Agriculture biologique', 'Rotation des cultures', 'Association de cultures'],
        equipment: ['Tracteur', 'Système d\'irrigation', 'Outils manuels'],
        certifications: ['Certification Bio', 'HACCP', 'ISO 22000']
      },
      marketAnalysis: {
        targetMarket: 'Marché local et export',
        competition: 'Modérée',
        pricingStrategy: 'Prix premium pour produits bio',
        distributionChannels: ['Marchés locaux', 'Supermarchés', 'Export']
      },
      risks: [
        {
          risk: 'Sécheresse',
          probability: 'medium',
          impact: 'high',
          mitigation: 'Système d\'irrigation de secours et variétés résistantes'
        },
        {
          risk: 'Fluctuation des prix',
          probability: 'high',
          impact: 'medium',
          mitigation: 'Contrats d\'achat à terme et diversification'
        },
        {
          risk: 'Maladies des plantes',
          probability: 'low',
          impact: 'medium',
          mitigation: 'Surveillance régulière et traitements préventifs'
        }
      ],
      documents: []
    };
    
    setSelectedProject(projectDetails);
    setShowDetailsPopup(true);
  };

  const handleInvest = (projectId: string) => {
    // Logique d'investissement
    console.log('Investir dans le projet:', projectId);
    showSuccess(
      'Investissement enregistré',
      'Votre demande d\'investissement a été enregistrée avec succès. Vous recevrez une confirmation par email.'
    );
    setShowDetailsPopup(false);
  };

  const handleContact = (farmerId: string) => {
    // Logique de contact
    console.log('Contacter l\'agriculteur:', farmerId);
    showSuccess(
      'Contact initié',
      'Un message a été envoyé à l\'agriculteur. Vous recevrez une réponse dans les plus brefs délais.'
    );
  };

  // Édition de projet
  const [editProject, setEditProject] = useState<Project | null>(null);
  const handleEditProject = (project: Project) => {
    setEditProject(project);
    setShowCreateModal(true);
  };
  // Suppression de projet
  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    showSuccess('Projet supprimé', 'Le projet a été supprimé.');
  };
  // Soumission édition/ajout
  const handleCreateOrEditProject = (projectData: any) => {
    if (editProject) {
      setProjects(prev => prev.map(p => p.id === editProject.id ? { ...p, ...projectData } : p));
      showSuccess('Projet modifié', 'Le projet a été modifié.');
      setEditProject(null);
    } else {
      const newProject: Project = {
        id: `project-${Date.now()}`,
        title: projectData.title,
        description: projectData.description,
        location: projectData.location,
        culture: projectData.cropType,
        targetAmount: projectData.investmentAmount,
        currentAmount: 0,
        duration: projectData.duration,
        expectedReturn: projectData.expectedReturn,
        status: 'pending',
        farmerId: user?.id || 'farmer-new',
        farmerName: projectData.farmerName || user?.name || 'Agriculteur',
        images: [
          'https://images.pexels.com/photos/4021761/pexels-photo-4021761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
        ],
        investors: [],
        updates: [],
        createdAt: new Date().toISOString()
      };
      setProjects(prev => [newProject, ...prev]);
      showSuccess('Projet ajouté', 'Votre projet a été ajouté à la liste !');
    }
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Mes Projets Agricoles
            </h1>
            <p className="text-green-100">
              Gérez vos projets agricoles, suivez leurs performances et attirez des investisseurs
            </p>
          </div>
          {user?.role === 'farmer' && (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nouveau projet</span>
            </button>
          )}
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">En cours</option>
              <option value="completed">Terminés</option>
              <option value="pending">En attente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Project Image */}
            <div className="h-48 bg-gray-200 relative">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                  {getStatusLabel(project.status)}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {project.culture}
                </span>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

              {/* Farmer & Location */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  {project.farmerName}
                </div>
                <div className="flex items-center text-sm text-gray-600">
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
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(project.currentAmount / project.targetAmount) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>{project.currentAmount.toLocaleString()} FCFA</span>
                  <span>{project.targetAmount.toLocaleString()} FCFA</span>
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium text-gray-900">{project.expectedReturn}%</span>
                  </div>
                  <div className="text-xs text-gray-500">Rendement</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm font-medium text-gray-900">{project.duration}m</span>
                  </div>
                  <div className="text-xs text-gray-500">Durée</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Users className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="text-sm font-medium text-gray-900">{project.investors.length}</span>
                  </div>
                  <div className="text-xs text-gray-500">Investisseurs</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-2">
                <button onClick={() => handleViewDetails(project)} className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center"><Eye className="h-4 w-4 mr-1" /> Voir</button>
                <button onClick={() => handleEditProject(project)} className="flex-1 bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium flex items-center justify-center"><Edit className="h-4 w-4 mr-1" /> Modifier</button>
                <button onClick={() => handleDeleteProject(project.id)} className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center justify-center"><Trash2 className="h-4 w-4 mr-1" /> Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun projet trouvé</h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou vos filtres.
          </p>
        </div>
      )}

      {/* Project Details Popup */}
      <Popup
        isOpen={showDetailsPopup}
        onClose={() => setShowDetailsPopup(false)}
        size="xl"
      >
        {selectedProject && (
          <ProjectDetailsPopup
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onInvest={handleInvest}
            onContact={handleContact}
          />
        )}
      </Popup>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => { setShowCreateModal(false); setEditProject(null); }}
        onSubmit={handleCreateOrEditProject}
        initialData={editProject}
      />
    </div>
  );
};

export default ProjectList;