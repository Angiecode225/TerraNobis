import React, { useState } from 'react';
import { PublicMarketplaceProps } from '../../types';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  ShoppingCart, 
  Users,
  Leaf,
  Award,
  Package,
  Truck,
  ArrowRight
} from 'lucide-react';

const PublicMarketplace: React.FC<PublicMarketplaceProps> = ({ onLogin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const products = [
    {
      id: '1',
      name: 'Mil Bio Premium',
      farmer: 'Aminata Diallo',
      location: 'Thiès, Sénégal',
      price: 1500,
      priceWholesale: 1200,
      unit: 'kg',
      category: 'Céréales',
      image: 'https://images.pexels.com/photos/4021761/pexels-photo-4021761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Mil cultivé selon les techniques ancestrales, certifié biologique. Riche en nutriments.',
      stock: 500,
      minWholesale: 50,
      organic: true,
      local: true,
      rating: 4.9,
      reviews: 23,
      badges: ['Bio', 'Local', 'Ancestral']
    },
    {
      id: '2',
      name: 'Tomates Fraîches',
      farmer: 'Mamadou Sow',
      location: 'Fatick, Sénégal',
      price: 800,
      priceWholesale: 650,
      unit: 'kg',
      category: 'Légumes',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Tomates fraîches cultivées sans pesticides, parfaites pour vos salades et sauces.',
      stock: 200,
      minWholesale: 25,
      organic: false,
      local: true,
      rating: 4.7,
      reviews: 15,
      badges: ['Frais', 'Local']
    },
    {
      id: '3',
      name: 'Miel Naturel Artisanal',
      farmer: 'Aïssatou Ba',
      location: 'Tambacounda, Sénégal',
      price: 4500,
      priceWholesale: 3800,
      unit: 'pot 500g',
      category: 'Produits transformés',
      image: 'https://images.pexels.com/photos/1638475/pexels-photo-1638475.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Miel pur et naturel produit par nos abeilles locales. Récolté artisanalement.',
      stock: 80,
      minWholesale: 10,
      organic: true,
      local: true,
      rating: 5.0,
      reviews: 31,
      badges: ['Bio', 'Artisanal', 'Premium']
    },
    {
      id: '4',
      name: 'Arachides Grillées',
      farmer: 'Ousmane Fall',
      location: 'Saint-Louis, Sénégal',
      price: 2200,
      priceWholesale: 1900,
      unit: 'kg',
      category: 'Légumineuses',
      image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Arachides locales grillées artisanalement, croustillantes et savoureuses.',
      stock: 150,
      minWholesale: 20,
      organic: false,
      local: true,
      rating: 4.5,
      reviews: 12,
      badges: ['Grillé', 'Artisanal']
    },
    {
      id: '5',
      name: 'Œufs Frais de Poules Élevées au Sol',
      farmer: 'Fatou Ndiaye',
      location: 'Kaolack, Sénégal',
      price: 3000,
      priceWholesale: 2500,
      unit: 'douzaine',
      category: 'Produits animaux',
      image: 'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Œufs frais de poules élevées en plein air, nourries avec des graines naturelles.',
      stock: 300,
      minWholesale: 50,
      organic: true,
      local: true,
      rating: 4.8,
      reviews: 28,
      badges: ['Frais', 'Plein Air', 'Bio']
    },
    {
      id: '6',
      name: 'Bissap Séché Premium',
      farmer: 'Cheikh Diop',
      location: 'Ziguinchor, Sénégal',
      price: 1800,
      priceWholesale: 1500,
      unit: 'paquet 250g',
      category: 'Plantes médicinales',
      image: 'https://images.pexels.com/photos/6546267/pexels-photo-6546267.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Fleurs d\'hibiscus séchées de qualité supérieure pour préparer la boisson traditionnelle.',
      stock: 120,
      minWholesale: 15,
      organic: true,
      local: true,
      rating: 4.6,
      reviews: 18,
      badges: ['Bio', 'Traditionnel', 'Médicinal']
    },
    {
      id: '7',
      name: 'Riz Parfumé Local',
      farmer: 'Mariama Sow',
      location: 'Saint-Louis, Sénégal',
      price: 1200,
      priceWholesale: 1000,
      unit: 'kg',
      category: 'Céréales',
      image: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Riz parfumé cultivé dans la vallée du fleuve Sénégal, grain long et savoureux.',
      stock: 800,
      minWholesale: 100,
      organic: false,
      local: true,
      rating: 4.4,
      reviews: 35,
      badges: ['Parfumé', 'Vallée du Fleuve']
    },
    {
      id: '8',
      name: 'Mangues Séchées Artisanales',
      farmer: 'Abdou Diallo',
      location: 'Casamance, Sénégal',
      price: 3500,
      priceWholesale: 3000,
      unit: 'paquet 500g',
      category: 'Fruits',
      image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      description: 'Mangues séchées naturellement au soleil, sans conservateurs ni additifs.',
      stock: 60,
      minWholesale: 10,
      organic: true,
      local: true,
      rating: 4.9,
      reviews: 22,
      badges: ['Bio', 'Séché Naturel', 'Sans Additifs']
    }
  ];

  const categories = [
    'Céréales', 'Légumes', 'Fruits', 'Légumineuses', 'Produits animaux', 
    'Produits transformés', 'Plantes médicinales'
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'organic' && product.organic) ||
                         (selectedFilter === 'local' && product.local) ||
                         (selectedFilter === 'wholesale' && product.minWholesale <= 50);
    
    return matchesSearch && matchesCategory && matchesFilter;
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Marketplace Agricole
            </h1>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Achetez directement auprès des producteurs locaux. 
              Produits frais, bio et de qualité. Vente au détail et en gros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onLogin}
                className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Commencer mes achats
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors">
                Devenir vendeur
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Produits Bio</h3>
              <p className="text-gray-600 text-sm">Certifiés biologiques et naturels</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Direct Producteur</h3>
              <p className="text-gray-600 text-sm">Achat direct sans intermédiaire</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Package className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Vente en Gros</h3>
              <p className="text-gray-600 text-sm">Prix préférentiels pour les gros volumes</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 p-3 rounded-full mb-4">
                <Truck className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Livraison Rapide</h3>
              <p className="text-gray-600 text-sm">Livraison dans toute la région</p>
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
                placeholder="Rechercher un produit, agriculteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">Toutes catégories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">Tous les filtres</option>
                <option value="organic">Bio uniquement</option>
                <option value="local">Local uniquement</option>
                <option value="wholesale">Vente en gros</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Product Image */}
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.badges.slice(0, 2).map((badge, index) => (
                    <span key={index} className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Farmer & Location */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>Par {product.farmer}</span>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">{product.location}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-lg font-bold text-emerald-600">
                        {product.price.toLocaleString()} FCFA
                      </span>
                      <span className="text-sm text-gray-600">/{product.unit}</span>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded ${
                      product.stock > 50 
                        ? 'bg-green-100 text-green-800' 
                        : product.stock > 0 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 50 ? 'En stock' : product.stock > 0 ? 'Stock limité' : 'Épuisé'}
                    </span>
                  </div>
                  
                  {/* Wholesale pricing */}
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Gros (min. {product.minWholesale}{product.unit}):</span>
                    <span className="text-blue-600 font-semibold ml-1">
                      {product.priceWholesale.toLocaleString()} FCFA/{product.unit}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button 
                    onClick={onLogin}
                    disabled={product.stock === 0}
                    className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Ajouter au panier</span>
                  </button>
                  <div className="flex space-x-2">
                    <button 
                      onClick={onLogin}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Achat en gros
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à soutenir l'agriculture locale ?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Rejoignez des milliers d'acheteurs qui soutiennent directement nos agriculteurs 
            et consomment des produits frais et de qualité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onLogin}
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-lg"
            >
              Créer mon compte acheteur
            </button>
            <button 
              onClick={onLogin}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors text-lg"
            >
              Devenir vendeur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicMarketplace;