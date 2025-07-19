import React from 'react';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  FileText,
  Shield,
  Target,
  BarChart3,
  Download,
  Share2,
  Star,
  Clock,
  Award,
  Leaf,
  Building,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import { ProjectDetails } from '../../types';

interface ProjectDetailsPopupProps {
  project: ProjectDetails;
  onClose: () => void;
  onInvest?: (projectId: string) => void;
  onContact?: (farmerId: string) => void;
}

const ProjectDetailsPopup: React.FC<ProjectDetailsPopupProps> = ({
  project,
  onClose,
  onInvest,
  onContact
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
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

  const getRiskColor = (probability: string, impact: string) => {
    if (probability === 'high' && impact === 'high') return 'bg-red-100 text-red-800';
    if (probability === 'high' || impact === 'high') return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {getStatusLabel(project.status)}
              </span>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {project.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                {project.duration} mois
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {project.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${project.title} - Image ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Objectif</p>
              <p className="text-lg font-bold text-gray-900">{project.targetAmount.toLocaleString()} FCFA</p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Collecté</p>
              <p className="text-lg font-bold text-gray-900">{project.currentAmount.toLocaleString()} FCFA</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rendement</p>
              <p className="text-lg font-bold text-gray-900">{project.expectedReturn}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Investisseurs</p>
              <p className="text-lg font-bold text-gray-900">{project.investors.length}</p>
            </div>
            <Users className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progression du financement</span>
          <span className="text-sm text-gray-600">
            {Math.round((project.currentAmount / project.targetAmount) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(project.currentAmount / project.targetAmount) * 100}%` }}
          />
        </div>
      </div>

      {/* Farmer Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">À propos de l'agriculteur</h3>
        <div className="flex items-start space-x-4">
          <img
            src={project.farmerAvatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
            alt={project.farmerName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{project.farmerName}</h4>
            <p className="text-sm text-gray-600 mb-2">{project.farmerBio}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => onContact?.(project.farmerId)}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Phone className="h-4 w-4" />
                <span>Contacter</span>
              </button>
              <button
                onClick={() => onContact?.(project.farmerId)}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Plan */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Plan financier
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h4 className="font-medium text-gray-900">Répartition du budget</h4>
          </div>
          <div className="divide-y divide-gray-200">
            {project.financialPlan.budgetBreakdown.map((item, index) => (
              <div key={index} className="px-4 py-3 flex justify-between items-center">
                <span className="text-sm text-gray-700">{item.category}</span>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{item.amount.toLocaleString()} FCFA</div>
                  <div className="text-xs text-gray-500">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Leaf className="h-5 w-5 mr-2" />
          Détails techniques
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-700">Type de sol :</span>
              <p className="text-sm text-gray-900">{project.technicalDetails.soilType}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Système d'irrigation :</span>
              <p className="text-sm text-gray-900">{project.technicalDetails.irrigationSystem}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Techniques agricoles :</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.technicalDetails.farmingTechniques.map((technique, index) => (
                  <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {technique}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-700">Équipements :</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.technicalDetails.equipment.map((equipment, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {equipment}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Certifications :</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.technicalDetails.certifications.map((cert, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Analysis */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Building className="h-5 w-5 mr-2" />
          Analyse de marché
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-700">Marché cible :</span>
              <p className="text-sm text-gray-900">{project.marketAnalysis.targetMarket}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Concurrence :</span>
              <p className="text-sm text-gray-900">{project.marketAnalysis.competition}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-700">Stratégie de prix :</span>
              <p className="text-sm text-gray-900">{project.marketAnalysis.pricingStrategy}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Canaux de distribution :</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.marketAnalysis.distributionChannels.map((channel, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Analysis */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Analyse des risques
        </h3>
        <div className="space-y-3">
          {project.risks.map((risk, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{risk.risk}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.probability, risk.impact)}`}>
                  {risk.probability} probabilité, {risk.impact} impact
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Atténuation : {risk.mitigation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      {project.updates.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Mises à jour récentes
          </h3>
          <div className="space-y-4">
            {project.updates.slice(0, 3).map((update) => (
              <div key={update.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{update.title}</h4>
                  <span className="text-xs text-gray-500">{update.createdAt}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{update.description}</p>
                {update.images.length > 0 && (
                  <div className="flex space-x-2">
                    {update.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Update ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-4 border-t border-gray-200">
        {onInvest && (
          <button
            onClick={() => onInvest(project.id)}
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Investir maintenant
          </button>
        )}
        <button
          onClick={onClose}
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailsPopup; 