import React, { useState } from 'react';
import { 
  MapPin, 
  Star, 
  ShoppingCart, 
  Heart,
  Share2,
  Download,
  Truck,
  Package,
  Leaf,
  Award,
  Clock,
  Scale,
  Info,
  Phone,
  Mail,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ProductDetails } from '../../types';

interface ProductDetailsPopupProps {
  product: ProductDetails;
  onClose: () => void;
  onAddToCart?: (productId: string, quantity: number) => void;
  onContact?: (farmerId: string) => void;
}

const ProductDetailsPopup: React.FC<ProductDetailsPopupProps> = ({
  product,
  onClose,
  onAddToCart,
  onContact
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

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

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews.length} avis)
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {product.location}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
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
          </div>
          
          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Price and Stock */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-emerald-600">
                  {product.price.toLocaleString()} FCFA
                </span>
                <span className="text-sm text-gray-600">/{product.unit}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 50 
                  ? 'bg-green-100 text-green-800' 
                  : product.stock > 0 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 50 ? 'En stock' : product.stock > 0 ? 'Stock limité' : 'Épuisé'}
              </span>
            </div>

            {/* Wholesale Pricing */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Prix en gros</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Minimum {product.wholesale.minQuantity}{product.unit} :</span>
                  <span className="text-lg font-bold text-blue-600">
                    {product.wholesale.price.toLocaleString()} FCFA/{product.unit}
                  </span>
                </div>
                {product.wholesale.bulkDiscounts.map((discount, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{discount.quantity}+ {product.unit} :</span>
                    <span className="text-green-600 font-medium">-{discount.discount}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Quantité</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
              <span className="text-sm text-gray-600">({product.unit})</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => onAddToCart?.(product.id, quantity)}
              disabled={product.stock === 0}
              className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 font-medium"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Ajouter au panier</span>
            </button>
            <div className="flex space-x-3">
              <button
                onClick={() => onContact?.(product.farmerId)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Contacter</span>
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Achat en gros
              </button>
            </div>
          </div>

          {/* Farmer Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Vendu par</h4>
            <div className="flex items-center space-x-3">
              <img
                src={product.farmerAvatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                alt={product.farmerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h5 className="font-medium text-gray-900">{product.farmerName}</h5>
                <div className="flex space-x-2 mt-1">
                  <button
                    onClick={() => onContact?.(product.farmerId)}
                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Phone className="h-3 w-3" />
                    <span>Appeler</span>
                  </button>
                  <button
                    onClick={() => onContact?.(product.farmerId)}
                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Mail className="h-3 w-3" />
                    <span>Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex space-x-8 border-b border-gray-200">
          {[
            { id: 'description', label: 'Description', icon: Info },
            { id: 'specifications', label: 'Spécifications', icon: Package },
            { id: 'nutrition', label: 'Valeur nutritive', icon: Scale },
            { id: 'farming', label: 'Méthode de culture', icon: Leaf },
            { id: 'shipping', label: 'Livraison', icon: Truck },
            { id: 'reviews', label: 'Avis', icon: Star }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              {product.certifications.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert, index) => (
                      <span key={index} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center">
                        <Award className="h-3 w-3 mr-1" />
                        {cert.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Poids :</span>
                  <p className="text-sm text-gray-900">{product.specifications.weight}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Dimensions :</span>
                  <p className="text-sm text-gray-900">{product.specifications.dimensions}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Emballage :</span>
                  <p className="text-sm text-gray-900">{product.specifications.packaging}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Durée de conservation :</span>
                  <p className="text-sm text-gray-900">{product.specifications.shelfLife}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Conditions de stockage :</span>
                  <p className="text-sm text-gray-900">{product.specifications.storageConditions}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="space-y-4">
              {product.nutritionalInfo.calories && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{product.nutritionalInfo.calories}</div>
                    <div className="text-xs text-gray-600">Calories</div>
                  </div>
                  {product.nutritionalInfo.protein && (
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{product.nutritionalInfo.protein}g</div>
                      <div className="text-xs text-gray-600">Protéines</div>
                    </div>
                  )}
                  {product.nutritionalInfo.carbs && (
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">{product.nutritionalInfo.carbs}g</div>
                      <div className="text-xs text-gray-600">Glucides</div>
                    </div>
                  )}
                  {product.nutritionalInfo.fat && (
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-lg font-bold text-red-600">{product.nutritionalInfo.fat}g</div>
                      <div className="text-xs text-gray-600">Lipides</div>
                    </div>
                  )}
                </div>
              )}
              {(product.nutritionalInfo.vitamins || product.nutritionalInfo.minerals) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.nutritionalInfo.vitamins && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Vitamines</h4>
                      <div className="flex flex-wrap gap-1">
                        {product.nutritionalInfo.vitamins.map((vitamin, index) => (
                          <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            {vitamin}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.nutritionalInfo.minerals && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Minéraux</h4>
                      <div className="flex flex-wrap gap-1">
                        {product.nutritionalInfo.minerals.map((mineral, index) => (
                          <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                            {mineral}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'farming' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Méthode de culture :</span>
                    <p className="text-sm text-gray-900">{product.farmingDetails.farmingMethod}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Date de récolte :</span>
                    <p className="text-sm text-gray-900">{product.farmingDetails.harvestDate}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Irrigation :</span>
                    <p className="text-sm text-gray-900">{product.farmingDetails.irrigation}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Pesticides utilisés :</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.farmingDetails.pesticides.map((pesticide, index) => (
                        <span key={index} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {pesticide}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Fertilisants :</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.farmingDetails.fertilizers.map((fertilizer, index) => (
                        <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {fertilizer}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Méthodes de livraison</h4>
                <div className="space-y-3">
                  {product.shipping.methods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Truck className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.duration}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{method.price.toLocaleString()} FCFA</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Livraison gratuite</h4>
                <p className="text-sm text-gray-700">
                  Livraison gratuite pour les commandes de plus de {product.shipping.freeShippingThreshold.toLocaleString()} FCFA
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Politique de retour</h4>
                <p className="text-sm text-gray-700">{product.shipping.returnPolicy}</p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={review.userAvatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                            alt={review.userName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h5 className="font-medium text-gray-900">{review.userName}</h5>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{review.createdAt}</span>
                      </div>
                      <h6 className="font-medium text-gray-900 mb-1">{review.title}</h6>
                      <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Utile ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
                          <ThumbsDown className="h-4 w-4" />
                          <span>Pas utile</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Aucun avis pour le moment</h4>
                  <p className="text-gray-600">Soyez le premier à laisser un avis sur ce produit !</p>
                </div>
              )}
            </div>
          )}
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

export default ProductDetailsPopup; 