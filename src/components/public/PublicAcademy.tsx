import React, { useState } from 'react';
import { PublicAcademyProps } from '../../types';
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  Award,
  TrendingUp,
  Download,
  Eye,
  ArrowRight
} from 'lucide-react';

const PublicAcademy: React.FC<PublicAcademyProps> = ({ onLogin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const courses = [
    {
      id: '1',
      title: 'Techniques Ancestrales de Culture du Mil',
      instructor: 'Mamadou Diop',
      description: 'Apprenez les techniques traditionnelles de culture du mil utilisées par nos ancêtres, adaptées au climat sahélien.',
      duration: 120,
      level: 'beginner',
      category: 'Cultures traditionnelles',
      thumbnail: 'https://images.pexels.com/photos/4021761/pexels-photo-4021761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      price: 0,
      enrolledUsers: 1245,
      rating: 4.8,
      lessons: 8,
      isFree: true,
      tags: ['Gratuit', 'Ancestral', 'Mil'],
      preview: true
    },
    {
      id: '2',
      title: 'Introduction à l\'Agriculture Biologique',
      instructor: 'Fatou Ndiaye',
      description: 'Découvrez les principes de base de l\'agriculture biologique et apprenez à cultiver sans produits chimiques.',
      duration: 90,
      level: 'beginner',
      category: 'Agriculture durable',
      thumbnail: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      price: 0,
      enrolledUsers: 892,
      rating: 4.9,
      lessons: 6,
      isFree: true,
      tags: ['Gratuit', 'Bio', 'Débutant'],
      preview: true
    },
    {
      id: '3',
      title: 'Gestion de l\'Eau en Agriculture',
      instructor: 'Cheikh Diop',
      description: 'Techniques d\'irrigation efficaces et gestion durable de l\'eau pour optimiser vos cultures.',
      duration: 150,
      level: 'intermediate',
      category: 'Techniques agricoles',
      thumbnail: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      price: 15000,
      enrolledUsers: 567,
      rating: 4.7,
      lessons: 10,
      isFree: false,
      tags: ['Premium', 'Irrigation', 'Eau'],
      preview: true
    },
    {
      id: '4',
      title: 'Élevage de Poules Pondeuses pour Débutants',
      instructor: 'Ousmane Fall',
      description: 'Guide complet pour créer et gérer un élevage de poules pondeuses rentable et durable.',
      duration: 75,
      level: 'beginner',
      category: 'Élevage',
      thumbnail: 'https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      price: 0,
      enrolledUsers: 1456,
      rating: 4.6,
      lessons: 5,
      isFree: true,
      tags: ['Gratuit', 'Élevage', 'Poules'],
      preview: true
    },
    {
      id: '5',
      title: 'Transformation et Conservation des Produits',
      instructor: 'Mariama Sow',
      description: 'Apprenez à transformer et conserver vos produits agricoles pour augmenter leur valeur ajoutée.',
      duration: 200,
      level: 'intermediate',
      category: 'Transformation',
      thumbnail: 'https://images.pexels.com/photos/6546267/pexels-photo-6546267.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      price: 25000,
      enrolledUsers: 334,
      rating: 4.8,
      lessons: 12,
      isFree: false,
      tags: ['Premium', 'Transformation', 'Valeur Ajoutée'],
      preview: true
    },
    {
      id: '6',
      title: 'Compostage et Fertilisation Naturelle',
      instructor: 'Aïssatou Ba',
      description: 'Créez vos propres fertilisants naturels et améliorez la fertilité de vos sols de manière écologique.',
      duration: 60,
      level: 'beginner',
      category: 'Agriculture durable',
      thumbnail: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      price: 0,
      enrolledUsers: 723,
      rating: 4.5,
      lessons: 4,
      isFree: true,
      tags: ['Gratuit', 'Compost', 'Écologique'],
      preview: true
    },
    {
      id: '7',
      title: 'Marketing Digital pour Agriculteurs',
      instructor: 'Abdou Diallo',
      description: 'Apprenez à vendre vos produits en ligne et à développer votre présence digitale.',
      duration: 180,
      level: 'intermediate',
      category: 'Gestion agricole',
      thumbnail: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      price: 20000,
      enrolledUsers: 445,
      rating: 4.4,
      lessons: 9,
      isFree: false,
      tags: ['Premium', 'Marketing', 'Digital'],
      preview: true
    },
    {
      id: '8',
      title: 'Plantes Médicinales et Leurs Usages',
      instructor: 'Khadija Sall',
      description: 'Découvrez les plantes médicinales locales, leurs propriétés et comment les cultiver.',
      duration: 100,
      level: 'beginner',
      category: 'Plantes médicinales',
      thumbnail: 'https://images.pexels.com/photos/6546267/pexels-photo-6546267.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      price: 0,
      enrolledUsers: 612,
      rating: 4.7,
      lessons: 7,
      isFree: true,
      tags: ['Gratuit', 'Médicinal', 'Traditionnel'],
      preview: true
    }
  ];

  const categories = [
    'Cultures traditionnelles', 'Agriculture durable', 'Techniques agricoles', 
    'Élevage', 'Transformation', 'Gestion agricole', 'Plantes médicinales'
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const freeCourses = courses.filter(course => course.isFree);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      default: return level;
    }
  };

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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              TerraNobis Académie
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Formez-vous aux techniques agricoles ancestrales et modernes. 
              Accès gratuit aux formations de base, certifications disponibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onLogin}
                className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Commencer à apprendre
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Parcourir les formations
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
              <div className="text-3xl font-bold text-purple-600">{freeCourses.length}</div>
              <div className="text-gray-600">Formations gratuites</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">5,847</div>
              <div className="text-gray-600">Étudiants inscrits</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">234</div>
              <div className="text-gray-600">Certifications délivrées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600">4.7</div>
              <div className="text-gray-600">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Free Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Formations Gratuites Populaires</h2>
          <p className="text-xl text-gray-600">Commencez votre apprentissage sans aucun coût</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {freeCourses.slice(0, 4).map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gray-200 relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    GRATUIT
                  </span>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                  <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="h-5 w-5 text-purple-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">Par {course.instructor}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration} min</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{course.lessons} leçons</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">
                    {renderStars(course.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {course.rating} ({course.enrolledUsers})
                  </span>
                </div>
                
                <button 
                  onClick={onLogin}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  Commencer maintenant
                </button>
              </div>
            </div>
          ))}
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
                placeholder="Rechercher une formation, instructeur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="all">Toutes catégories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">Tous niveaux</option>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* All Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Toutes les Formations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                    {getLevelLabel(course.level)}
                  </span>
                  {course.isFree ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      GRATUIT
                    </span>
                  ) : (
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      PREMIUM
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                  <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="h-6 w-6 text-purple-600" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
                  {!course.isFree && (
                    <Award className="h-5 w-5 text-yellow-500 flex-shrink-0 ml-2" />
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration} min</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{course.lessons} leçons</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.enrolledUsers}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {renderStars(course.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {course.rating} ({course.enrolledUsers} étudiants)
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Par {course.instructor}</span>
                  <span className="text-sm text-purple-600 font-medium">{course.category}</span>
                </div>

                {!course.isFree && (
                  <div className="mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      {course.price.toLocaleString()} FCFA
                    </span>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button 
                    onClick={onLogin}
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    {course.isFree ? 'Commencer' : 'S\'inscrire'}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à développer vos compétences agricoles ?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Rejoignez des milliers d'agriculteurs qui se forment avec TerraNobis Académie. 
            Formations gratuites et certifications reconnues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onLogin}
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-lg"
            >
              Créer mon compte étudiant
            </button>
            <button 
              onClick={onLogin}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors text-lg"
            >
              Devenir instructeur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicAcademy;