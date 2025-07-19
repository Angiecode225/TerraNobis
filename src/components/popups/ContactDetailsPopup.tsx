import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  MessageCircle,
  Star,
  Clock,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  X,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  FileText
} from 'lucide-react';
import { ContactDetails } from '../../types';

interface ContactDetailsPopupProps {
  contact: ContactDetails;
  onClose: () => void;
  onMessage?: (contactId: string) => void;
  onCall?: (phone: string) => void;
  onEmail?: (email: string) => void;
}

const ContactDetailsPopup: React.FC<ContactDetailsPopupProps> = ({
  contact,
  onClose,
  onMessage,
  onCall,
  onEmail
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return Linkedin;
      case 'twitter': return Twitter;
      case 'facebook': return Facebook;
      case 'instagram': return Instagram;
      case 'youtube': return Youtube;
      default: return Globe;
    }
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'busy': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityLabel = (status: string) => {
    switch (status) {
      case 'online': return 'En ligne';
      case 'offline': return 'Hors ligne';
      case 'busy': return 'Occupé';
      default: return status;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${getAvailabilityColor(contact.availability.status)} flex items-center justify-center`}>
                <div className={`w-3 h-3 rounded-full ${
                  contact.availability.status === 'online' ? 'bg-green-500' :
                  contact.availability.status === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                }`} />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{contact.name}</h1>
              <p className="text-gray-600 mb-2">{contact.role}</p>
              {contact.company && (
                <p className="text-sm text-gray-500 mb-2">{contact.company}</p>
              )}
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {contact.location}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(contact.availability.status)}`}>
                  {getAvailabilityLabel(contact.availability.status)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onMessage?.(contact.id)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
            <button
              onClick={() => onCall?.(contact.contact.phone)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Phone className="h-5 w-5" />
            </button>
            <button
              onClick={() => onEmail?.(contact.contact.email)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Mail className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">À propos</h3>
            <p className="text-gray-700 leading-relaxed">{contact.description}</p>
          </div>

          {/* Specialties */}
          {contact.specialties.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Spécialités</h3>
              <div className="flex flex-wrap gap-2">
                {contact.specialties.map((specialty, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {contact.languages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Langues parlées</h3>
              <div className="flex flex-wrap gap-2">
                {contact.languages.map((language, index) => (
                  <span key={index} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verification */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Vérification</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className={`h-5 w-5 ${contact.verification.identityVerified ? 'text-green-500' : 'text-gray-400'}`} />
                  <div>
                    <h4 className="font-medium text-gray-900">Identité vérifiée</h4>
                    <p className="text-sm text-gray-600">Documents d'identité validés</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  contact.verification.identityVerified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {contact.verification.identityVerified ? 'Vérifié' : 'Non vérifié'}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Award className={`h-5 w-5 ${contact.verification.businessVerified ? 'text-green-500' : 'text-gray-400'}`} />
                  <div>
                    <h4 className="font-medium text-gray-900">Entreprise vérifiée</h4>
                    <p className="text-sm text-gray-600">Informations commerciales validées</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  contact.verification.businessVerified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {contact.verification.businessVerified ? 'Vérifié' : 'Non vérifié'}
                </span>
              </div>
            </div>
          </div>

          {/* Documents */}
          {contact.verification.documents.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Documents de vérification</h3>
              <div className="space-y-2">
                {contact.verification.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">{doc.type}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Voir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations de contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Téléphone</p>
                  <p className="font-medium text-gray-900">{contact.contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{contact.contact.email}</p>
                </div>
              </div>
              
              {contact.contact.whatsapp && (
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">WhatsApp</p>
                    <p className="font-medium text-gray-900">{contact.contact.whatsapp}</p>
                  </div>
                </div>
              )}
              
              {contact.contact.website && (
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Site web</p>
                    <a 
                      href={contact.contact.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      {contact.contact.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Statistiques</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Projets terminés</p>
                    <p className="font-medium text-gray-900">{contact.stats.projectsCompleted}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total investi</p>
                    <p className="font-medium text-gray-900">{contact.stats.totalInvestments.toLocaleString()} FCFA</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Note moyenne</p>
                    <div className="flex items-center">
                      {renderStars(contact.stats.rating)}
                      <span className="ml-1 font-medium text-gray-900">{contact.stats.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Temps de réponse</p>
                    <p className="font-medium text-gray-900">{contact.stats.responseTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Disponibilité</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Statut actuel</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(contact.availability.status)}`}>
                  {getAvailabilityLabel(contact.availability.status)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Prochaine disponibilité</span>
                <span className="text-sm font-medium text-gray-900">{contact.availability.nextAvailable}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Fuseau horaire</span>
                <span className="text-sm font-medium text-gray-900">{contact.availability.timezone}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          {contact.socialMedia.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Réseaux sociaux</h3>
              <div className="space-y-2">
                {contact.socialMedia.map((social, index) => {
                  const Icon = getSocialIcon(social.platform);
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Icon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{social.platform}</p>
                        <p className="text-sm text-gray-600">@{social.username}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => onMessage?.(contact.id)}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Envoyer un message</span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onCall?.(contact.contact.phone)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Appeler</span>
              </button>
              <button
                onClick={() => onEmail?.(contact.contact.email)}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-4 border-t border-gray-200">
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

export default ContactDetailsPopup; 