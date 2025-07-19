import React, { useState } from 'react';
import { Entrepreneur, BulkBuyer, IndividualBuyer, ContactDetails } from '../../types';
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  MessageCircle,
  Phone,
  Mail,
  Building,
  Package,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react';
import Popup from '../common/Popup';
import ContactDetailsPopup from '../popups/ContactDetailsPopup';

const NetworkingHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('entrepreneurs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<ContactDetails | null>(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  // Mock data for entrepreneurs
  const entrepreneurs: Entrepreneur[] = [
    {
      id: '1',
      name: 'Fatou Ndiaye',
      company: 'Fresh Foods Sénégal',
      type: 'Restaurant/Traiteur',
      location: 'Dakar, Sénégal',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      description: 'Chaîne de restaurants spécialisée dans la cuisine locale avec des produits frais et bio.',
      needs: ['Légumes bio', 'Fruits frais', 'Épices locales'],
      volume: 'Gros (500kg/semaine)',
      budget: '2M FCFA/mois',
      rating: 4.8,
      verified: true,
      contact: {
        phone: '+221 77 123 45 67',
        email: 'fatou@freshfoods.sn'
      }
    },
    {
      id: '2',
      name: 'Mamadou Diallo',
      company: 'Bio Market Plus',
      type: 'Supermarché Bio',
      location: 'Thiès, Sénégal',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      description: 'Supermarché spécialisé dans les produits biologiques et locaux.',
      needs: ['Céréales bio', 'Miel naturel', 'Produits transformés'],
      volume: 'Gros (1T/mois)',
      budget: '5M FCFA/mois',
      rating: 4.9,
      verified: true,
      contact: {
        phone: '+221 76 987 65 43',
        email: 'mamadou@biomarketplus.sn'
      }
    },
    {
      id: '3',
      name: 'Aïssatou Ba',
      company: 'Catering Excellence',
      type: 'Service Traiteur',
      location: 'Saint-Louis, Sénégal',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      description: 'Service de traiteur pour événements avec focus sur les produits locaux.',
      needs: ['Viande fraîche', 'Légumes variés', 'Produits laitiers'],
      volume: 'Moyen (200kg/semaine)',
      budget: '1.5M FCFA/mois',
      rating: 4.6,
      verified: false,
      contact: {
        phone: '+221 78 456 78 90',
        email: 'aissatou@catering-excellence.sn'
      }
    }
  ];

  // Mock data for bulk buyers
  const bulkBuyers: BulkBuyer[] = [
    {
      id: '1',
      name: 'Ousmane Fall',
      type: 'Grossiste',
      location: 'Marché Sandaga, Dakar',
      avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w-150&h=150&dpr=1',
      description: 'Grossiste en produits agricoles avec 20 ans d\'expérience sur le marché de Sandaga.',
      needs: ['Oignons', 'Pommes de terre', 'Tomates'],
      volume: 'Très gros (5T/semaine)',
      budget: '10M FCFA/mois',
      rating: 4.7,
      verified: true,
      contact: {
        phone: '+221 77 234 56 78',
        email: 'ousmane.fall@sandaga.sn'
      }
    },
    {
      id: '2',
      name: 'Mariama Sow',
      type: 'Coopérative',
      location: 'Kaolack, Sénégal',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      description: 'Coopérative de femmes transformatrices de produits agricoles.',
      needs: ['Arachides', 'Mil', 'Sésame'],
      volume: 'Gros (2T/mois)',
      budget: '3M FCFA/mois',
      rating: 4.5,
      verified: true,
      contact: {
        phone: '+221 76 345 67 89',
        email: 'mariama@coop-kaolack.sn'
      }
    }
  ];

  // Mock data for individual buyers
  const individualBuyers: IndividualBuyer[] = [
    {
      id: '1',
      name: 'Cheikh Diop',
      type: 'Particulier',
      location: 'Almadies, Dakar',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      description: 'Famille nombreuse recherchant des produits bio et locaux pour consommation régulière.',
      needs: ['Légumes bio', 'Fruits de saison', 'Œufs frais'],
      volume: 'Détail (50kg/mois)',
      budget: '200K FCFA/mois',
      rating: 4.8,
      verified: true,
      contact: {
        phone: '+221 77 567 89 01',
        email: 'cheikh.diop@gmail.com'
      }
    },
    {
      id: '2',
      name: 'Khadija Sall',
      type: 'Particulier',
      location: 'Plateau, Dakar',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      description: 'Nutritionniste recherchant des produits de qualité pour ses clients.',
      needs: ['Superaliments', 'Plantes médicinales', 'Produits sans pesticides'],
      volume: 'Détail (30kg/mois)',
      budget: '150K FCFA/mois',
      rating: 4.9,
      verified: true,
      contact: {
        phone: '+221 78 678 90 12',
        email: 'khadija.nutritionniste@gmail.com'
      }
    }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'entrepreneurs': return entrepreneurs;
      case 'bulk-buyers': return bulkBuyers;
      case 'individual-buyers': return individualBuyers;
      default: return entrepreneurs;
    }
  };

  const filteredData = getCurrentData().filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.needs.some(need => need.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'verified' && item.verified) ||
                         (selectedFilter === 'high-volume' && item.volume.includes('Gros')) ||
                         (selectedFilter === 'local' && item.location.includes('Dakar'));
    
    return matchesSearch && matchesFilter;
  });

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

  const getVolumeColor = (volume: string) => {
    if (volume.includes('Très gros')) return 'bg-red-100 text-red-800';
    if (volume.includes('Gros')) return 'bg-orange-100 text-orange-800';
    if (volume.includes('Moyen')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const handleViewDetails = (item: Entrepreneur | BulkBuyer | IndividualBuyer) => {
    // Convertir l'élément en ContactDetails avec des données complémentaires
    const contactDetails: ContactDetails = {
      id: item.id,
      name: item.name,
      avatar: item.avatar,
      role: 'company' in item ? item.company : item.type,
      company: 'company' in item ? item.company : undefined,
      location: item.location,
      description: item.description,
      contact: {
        phone: item.contact.phone,
        email: item.contact.email,
        whatsapp: item.contact.phone,
        website: 'company' in item ? `${item.company.toLowerCase().replace(/\s+/g, '')}.sn` : undefined
      },
      socialMedia: [
        {
          platform: 'LinkedIn',
          url: `https://linkedin.com/in/${item.name.toLowerCase().replace(/\s+/g, '')}`,
          username: item.name
        },
        {
          platform: 'Facebook',
          url: `https://facebook.com/${item.name.toLowerCase().replace(/\s+/g, '')}`,
          username: item.name
        }
      ],
      stats: {
        projectsCompleted: Math.floor(Math.random() * 50) + 10,
        totalInvestments: Math.floor(Math.random() * 10000000) + 1000000,
        rating: item.rating,
        responseTime: '2-4 heures'
      },
      availability: {
        status: 'online',
        nextAvailable: 'Aujourd\'hui',
        timezone: 'GMT+0'
      },
      specialties: item.needs,
      languages: ['Français', 'Wolof', 'Anglais'],
      verification: {
        identityVerified: item.verified,
        businessVerified: item.verified,
        documents: [
          {
            id: '1',
            name: 'Carte d\'identité',
            type: 'pdf',
            url: '/documents/id.pdf',
            size: 2500000,
            uploadedAt: '2024-01-15',
            uploadedBy: item.id,
            tags: ['identité', 'vérification']
          },
          {
            id: '2',
            name: 'Registre de commerce',
            type: 'pdf',
            url: '/documents/business.pdf',
            size: 1800000,
            uploadedAt: '2024-01-10',
            uploadedBy: item.id,
            tags: ['commerce', 'entreprise']
          }
        ]
      }
    };
    
    setSelectedContact(contactDetails);
    setShowDetailsPopup(true);
  };

  const handleMessage = (contactId: string) => {
    // Logique d'envoi de message
    console.log('Envoyer un message à:', contactId);
    setShowDetailsPopup(false);
  };

  const handleCall = (phone: string) => {
    // Logique d'appel
    console.log('Appeler:', phone);
  };

  const handleEmail = (email: string) => {
    // Logique d'email
    console.log('Envoyer un email à:', email);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Hub de Mise en Relation</h1>
        <p className="text-blue-100">
          Connectez-vous avec des entrepreneurs, grossistes et particuliers pour développer votre réseau commercial
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('entrepreneurs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'entrepreneurs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Entrepreneurs</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {entrepreneurs.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('bulk-buyers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bulk-buyers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Acheteurs en Gros</span>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  {bulkBuyers.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('individual-buyers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'individual-buyers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Particuliers</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {individualBuyers.length}
                </span>
              </div>
            </button>
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, entreprise ou besoins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tous les profils</option>
                <option value="verified">Vérifiés uniquement</option>
                <option value="high-volume">Gros volumes</option>
                <option value="local">Région de Dakar</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredData.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    {item.verified && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  {activeTab === 'entrepreneurs' && (
                    <p className="text-sm text-gray-600">{(item as any).company}</p>
                  )}
                  <p className="text-sm text-blue-600 font-medium">{item.type}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(item.rating)}
                </div>
                <span className="text-sm text-gray-600">{item.rating}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4">{item.description}</p>

            {/* Location */}
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              {item.location}
            </div>

            {/* Needs */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Besoins :</h4>
              <div className="flex flex-wrap gap-2">
                {item.needs.map((need, index) => (
                  <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {need}
                  </span>
                ))}
              </div>
            </div>

            {/* Volume and Budget */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm text-gray-600">Volume :</span>
                <div className={`inline-block ml-2 px-2 py-1 rounded-full text-xs font-medium ${getVolumeColor(item.volume)}`}>
                  {item.volume}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Budget :</span>
                <span className="ml-2 text-sm font-medium text-gray-900">{item.budget}</span>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Contacter</span>
              </button>
              <button 
                onClick={() => handleViewDetails(item)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Détails
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Phone className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Users className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun profil trouvé</h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou vos filtres.
          </p>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Développez votre réseau commercial</h2>
        <p className="text-green-100 mb-6">
          Rejoignez notre communauté de professionnels et développez des partenariats durables
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Créer mon profil professionnel
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Publier mes besoins
          </button>
        </div>
      </div>

      {/* Contact Details Popup */}
      <Popup
        isOpen={showDetailsPopup}
        onClose={() => setShowDetailsPopup(false)}
        size="xl"
      >
        {selectedContact && (
          <ContactDetailsPopup
            contact={selectedContact}
            onClose={() => setShowDetailsPopup(false)}
            onMessage={handleMessage}
            onCall={handleCall}
            onEmail={handleEmail}
          />
        )}
      </Popup>
    </div>
  );
};

export default NetworkingHub;