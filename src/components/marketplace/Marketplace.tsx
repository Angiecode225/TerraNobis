import React, { useState } from 'react';
import { Product, ProductDetails } from '../../types';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  ShoppingCart, 
  Heart,
  Leaf,
  Award
} from 'lucide-react';
import Popup from '../common/Popup';
import ProductDetailsPopup from '../popups/ProductDetailsPopup';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Mil Bio',
      description: 'Mil cultivé selon les techniques ancestrales, certifié biologique. Riche en nutriments et idéal pour les préparations traditionnelles.',
      price: 1500,
      unit: 'kg',
      category: 'Céréales',
      farmerId: 'farmer1',
      farmerName: 'Aminata Diallo',
      images: [
        'https://images.pexels.com/photos/4021761/pexels-photo-4021761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
      ],
      stock: 50,
      organic: true,
      local: true,
      rating: 4.9,
      reviews: 23,
      location: 'Thiès, Sénégal'
    },
    {
      id: '2',
      name: 'Tomates Fraîches',
      description: 'Tomates fraîches cultivées sans pesticides, parfaites pour vos salades et sauces. Récoltées à maturité.',
      price: 800,
      unit: 'kg',
      category: 'Légumes',
      farmerId: 'farmer2',
      farmerName: 'Mamadou Sow',
      images: [
        'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
      ],
      stock: 30,
      organic: false,
      local: true,
      rating: 4.7,
      reviews: 15,
      location: 'Fatick, Sénégal'
    },
    {
      id: '3',
      name: 'Miel Naturel',
      description: 'Miel pur et naturel produit par nos abeilles locales. Récolté artisanalement et non traité.',
      price: 4500,
      unit: 'pot 500g',
      category: 'Produits transformés',
      farmerId: 'farmer3',
      farmerName: 'Aïssatou Ba',
      images: [
        'https://images.pexels.com/photos/1638475/pexels-photo-1638475.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
      ],
      stock: 15,
      organic: true,
      local: true,
      rating: 5.0,
      reviews: 31,
      location: 'Tambacounda, Sénégal'
    },
    {
      id: '4',
      name: 'Arachides Grillées',
      description: 'Arachides locales grillées artisanalement, croustillantes et savoureuses. Parfaites pour l\'apéritif.',
      price: 2200,
      unit: 'kg',
      category: 'Légumineuses',
      farmerId: 'farmer4',
      farmerName: 'Ousmane Fall',
      images: [
        'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
      ],
      stock: 25,
      organic: false,
      local: true,
      rating: 4.5,
      reviews: 12,
      location: 'Saint-Louis, Sénégal'
    },
    {
      id: '5',
      name: 'Œufs Frais',
      description: 'Œufs frais de poules élevées en plein air, nourries avec des graines naturelles. Collectés quotidiennement.',
      price: 3000,
      unit: 'douzaine',
      category: 'Produits animaux',
      farmerId: 'farmer2',
      farmerName: 'Mamadou Sow',
      images: [
        'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
      ],
      stock: 40,
      organic: true,
      local: true,
      rating: 4.8,
      reviews: 28,
      location: 'Fatick, Sénégal'
    },
    {
      id: '6',
      name: 'Bissap Séché',
      description: 'Fleurs d\'hibiscus séchées de qualité supérieure pour préparer la boisson traditionnelle bissap.',
      price: 1800,
      unit: 'paquet 250g',
      category: 'Plantes médicinales',
      farmerId: 'farmer5',
      farmerName: 'Fatou Ndiaye',
      images: [
        'https://images.pexels.com/photos/6546267/pexels-photo-6546267.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'
      ],
      stock: 20,
      organic: true,
      local: true,
      rating: 4.6,
      reviews: 18,
      location: 'Kaolack, Sénégal'
    }
  ];

  const categories = [
    'Céréales', 'Légumes', 'Fruits', 'Légumineuses', 'Produits animaux', 
    'Produits transformés', 'Plantes médicinales'
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'organic' && product.organic) ||
                         (selectedFilter === 'local' && product.local) ||
                         (selectedFilter === 'instock' && product.stock > 0);
    
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

  const handleViewDetails = (product: Product) => {
    // Convertir le produit en ProductDetails avec des données complémentaires
    const productDetails: ProductDetails = {
      ...product,
      farmerAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      reviews: [
        {
          id: '1',
          userId: 'user1',
          userName: 'Mamadou Diallo',
          userAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          productId: product.id,
          rating: 5,
          title: 'Excellent produit',
          comment: 'Produit de très bonne qualité, je recommande !',
          helpful: 12,
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Fatou Ndiaye',
          userAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          productId: product.id,
          rating: 4,
          title: 'Très satisfaite',
          comment: 'Livraison rapide et produit frais.',
          helpful: 8,
          createdAt: '2024-01-10'
        }
      ],
      specifications: {
        weight: 'Variable selon le produit',
        dimensions: 'Standard',
        packaging: 'Emballage écologique',
        shelfLife: 'Variable selon le produit',
        storageConditions: 'Conserver dans un endroit frais et sec'
      },
      nutritionalInfo: {
        calories: 120,
        protein: 8,
        carbs: 15,
        fat: 3,
        vitamins: ['Vitamine C', 'Vitamine B6'],
        minerals: ['Fer', 'Magnésium']
      },
      farmingDetails: {
        farmingMethod: 'Agriculture biologique',
        harvestDate: 'Récolte récente',
        pesticides: ['Aucun pesticide utilisé'],
        fertilizers: ['Compost naturel'],
        irrigation: 'Irrigation naturelle'
      },
      certifications: [
        {
          name: 'Certification Bio',
          issuer: 'Ministère de l\'Agriculture',
          validUntil: '2025-12-31',
          logo: 'https://example.com/bio-logo.png'
        }
      ],
      shipping: {
        methods: [
          { name: 'Livraison standard', price: 500, duration: '2-3 jours' },
          { name: 'Livraison express', price: 1000, duration: '1 jour' }
        ],
        freeShippingThreshold: 10000,
        returnPolicy: 'Retour accepté sous 7 jours'
      },
      wholesale: {
        minQuantity: 10,
        price: product.price * 0.8,
        bulkDiscounts: [
          { quantity: 20, discount: 10 },
          { quantity: 50, discount: 20 }
        ]
      }
    };
    
    setSelectedProduct(productDetails);
    setShowDetailsPopup(true);
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    // Logique d'ajout au panier
    console.log('Ajouter au panier:', productId, quantity);
    setShowDetailsPopup(false);
  };

  const handleContact = (farmerId: string) => {
    // Logique de contact
    console.log('Contacter l\'agriculteur:', farmerId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Marketplace TerraNobis</h1>
        <p className="text-emerald-100">
          Découvrez et achetez des produits agricoles locaux directement auprès de nos agriculteurs
        </p>
      </div>

      {/* Search and Filters */}
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
              <option value="instock">En stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Product Image */}
            <div className="h-48 bg-gray-200 relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.organic && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Leaf className="h-3 w-3 mr-1" />
                    Bio
                  </span>
                )}
                {product.local && (
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    Local
                  </span>
                )}
              </div>
              <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Product Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <span className="text-lg font-bold text-emerald-600">
                  {product.price.toLocaleString()} FCFA
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} avis)
                </span>
              </div>

              {/* Farmer & Location */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>Par {product.farmerName}</span>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{product.location}</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Par {product.unit}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock > 0 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 10 ? 'En stock' : product.stock > 0 ? 'Stock limité' : 'Épuisé'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button 
                  disabled={product.stock === 0}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Ajouter au panier</span>
                </button>
                <button 
                  onClick={() => handleViewDetails(product)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou vos filtres.
          </p>
        </div>
      )}

      {/* Product Details Popup */}
      <Popup
        isOpen={showDetailsPopup}
        onClose={() => setShowDetailsPopup(false)}
        size="xl"
      >
        {selectedProduct && (
          <ProductDetailsPopup
            product={selectedProduct}
            onClose={() => setShowDetailsPopup(false)}
            onAddToCart={handleAddToCart}
            onContact={handleContact}
          />
        )}
      </Popup>
    </div>
  );
};

export default Marketplace;