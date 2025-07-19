import React, { useState } from 'react';
import { Course, CourseDetails } from '../../types';
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';
import Popup from '../common/Popup';
import CourseDetailsPopup from '../popups/CourseDetailsPopup';

const Academy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<CourseDetails | null>(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  // Mock courses data
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Techniques Ancestrales de Culture du Mil',
      description: 'Apprenez les techniques traditionnelles de culture du mil utilisées par nos ancêtres, adaptées au climat sahélien.',
      instructor: 'Mamadou Diop',
      duration: 120,
      level: 'beginner',
      category: 'Cultures traditionnelles',
      thumbnail: 'https://images.pexels.com/photos/4021761/pexels-photo-4021761.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      videos: [
        { id: '1', title: 'Introduction au mil', duration: 15, url: '', completed: true },
        { id: '2', title: 'Préparation du terrain', duration: 25, url: '', completed: false },
        { id: '3', title: 'Techniques de semis', duration: 30, url: '', completed: false }
      ],
      quiz: [
        {
          id: '1',
          question: 'Quelle est la meilleure période pour semer le mil?',
          options: ['Avril-Mai', 'Juin-Juillet', 'Août-Septembre', 'Octobre-Novembre'],
          correctAnswer: 1
        }
      ],
      certification: true,
      enrolledUsers: 245,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Gestion Financière pour Agriculteurs',
      description: 'Maîtrisez les aspects financiers de votre exploitation agricole : budgétisation, investissements, et rentabilité.',
      instructor: 'Aïssatou Ba',
      duration: 180,
      level: 'intermediate',
      category: 'Gestion agricole',
      thumbnail: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      videos: [
        { id: '1', title: 'Bases de comptabilité agricole', duration: 30, url: '', completed: false },
        { id: '2', title: 'Planification budgétaire', duration: 45, url: '', completed: false },
        { id: '3', title: 'Analyse de rentabilité', duration: 40, url: '', completed: false }
      ],
      quiz: [],
      certification: true,
      enrolledUsers: 189,
      rating: 4.6
    },
    {
      id: '3',
      title: 'Agriculture Biologique et Durable',
      description: 'Découvrez les principes de l\'agriculture biologique et les pratiques durables pour préserver l\'environnement.',
      instructor: 'Fatou Ndiaye',
      duration: 150,
      level: 'intermediate',
      category: 'Agriculture durable',
      thumbnail: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      videos: [
        { id: '1', title: 'Principes de l\'agriculture bio', duration: 20, url: '', completed: false },
        { id: '2', title: 'Compostage et fertilisation naturelle', duration: 35, url: '', completed: false },
        { id: '3', title: 'Lutte biologique contre les parasites', duration: 30, url: '', completed: false }
      ],
      quiz: [],
      certification: true,
      enrolledUsers: 156,
      rating: 4.9
    },
    {
      id: '4',
      title: 'Élevage de Poules Pondeuses',
      description: 'Guide complet pour créer et gérer un élevage de poules pondeuses rentable et durable.',
      instructor: 'Ousmane Fall',
      duration: 90,
      level: 'beginner',
      category: 'Élevage',
      thumbnail: 'https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      videos: [
        { id: '1', title: 'Choix des races', duration: 15, url: '', completed: false },
        { id: '2', title: 'Construction du poulailler', duration: 25, url: '', completed: false },
        { id: '3', title: 'Alimentation et soins', duration: 30, url: '', completed: false }
      ],
      quiz: [],
      certification: true,
      enrolledUsers: 298,
      rating: 4.7
    },
    {
      id: '5',
      title: 'Techniques d\'Irrigation Moderne',
      description: 'Optimisez l\'utilisation de l\'eau dans votre exploitation avec les techniques d\'irrigation modernes.',
      instructor: 'Cheikh Diop',
      duration: 110,
      level: 'advanced',
      category: 'Techniques agricoles',
      thumbnail: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      videos: [
        { id: '1', title: 'Systèmes d\'irrigation goutte-à-goutte', duration: 35, url: '', completed: false },
        { id: '2', title: 'Irrigation par aspersion', duration: 30, url: '', completed: false },
        { id: '3', title: 'Gestion de l\'eau', duration: 25, url: '', completed: false }
      ],
      quiz: [],
      certification: true,
      enrolledUsers: 112,
      rating: 4.5
    },
    {
      id: '6',
      title: 'Transformation et Conservation des Produits',
      description: 'Apprenez à transformer et conserver vos produits agricoles pour augmenter leur valeur ajoutée.',
      instructor: 'Mariama Sow',
      duration: 200,
      level: 'intermediate',
      category: 'Transformation',
      thumbnail: 'https://images.pexels.com/photos/6546267/pexels-photo-6546267.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      videos: [
        { id: '1', title: 'Techniques de séchage', duration: 40, url: '', completed: false },
        { id: '2', title: 'Transformation du mil', duration: 50, url: '', completed: false },
        { id: '3', title: 'Emballage et stockage', duration: 35, url: '', completed: false }
      ],
      quiz: [],
      certification: true,
      enrolledUsers: 134,
      rating: 4.8
    }
  ];

  const categories = [
    'Cultures traditionnelles', 'Gestion agricole', 'Agriculture durable', 
    'Élevage', 'Techniques agricoles', 'Transformation'
  ];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

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

  const handleViewDetails = (course: Course) => {
    // Convertir le cours en CourseDetails avec des données complémentaires
    const courseDetails: CourseDetails = {
      ...course,
      instructorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      instructorBio: 'Expert en agriculture avec plus de 20 ans d\'expérience dans la formation et le conseil agricole.',
      curriculum: [
        {
          section: 'Introduction',
          lessons: [
            { title: 'Bienvenue dans le cours', duration: 5, type: 'video', completed: true },
            { title: 'Objectifs d\'apprentissage', duration: 10, type: 'text', completed: true },
            { title: 'Prérequis', duration: 8, type: 'text', completed: true }
          ]
        },
        {
          section: 'Fondamentaux',
          lessons: [
            { title: 'Concepts de base', duration: 25, type: 'video', completed: false },
            { title: 'Quiz de compréhension', duration: 15, type: 'quiz', completed: false },
            { title: 'Exercice pratique', duration: 30, type: 'assignment', completed: false }
          ]
        },
        {
          section: 'Techniques avancées',
          lessons: [
            { title: 'Méthodes avancées', duration: 35, type: 'video', completed: false },
            { title: 'Cas d\'étude', duration: 20, type: 'text', completed: false },
            { title: 'Projet final', duration: 60, type: 'assignment', completed: false }
          ]
        }
      ],
      learningObjectives: [
        'Comprendre les principes fondamentaux',
        'Maîtriser les techniques pratiques',
        'Appliquer les connaissances en situation réelle',
        'Évaluer et optimiser les résultats'
      ],
      prerequisites: [
        'Aucun prérequis pour les cours débutant',
        'Connaissances de base en agriculture pour les niveaux intermédiaire et avancé',
        'Accès à un ordinateur et une connexion internet'
      ],
      materials: [
        {
          name: 'Guide du participant',
          type: 'pdf',
          url: '/materials/guide.pdf',
          required: true
        },
        {
          name: 'Fiches techniques',
          type: 'pdf',
          url: '/materials/fiches.pdf',
          required: true
        },
        {
          name: 'Vidéos complémentaires',
          type: 'video',
          url: '/materials/videos',
          required: false
        }
      ],
      reviews: [
        {
          id: '1',
          userId: 'user1',
          userName: 'Mamadou Diallo',
          userAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          productId: course.id,
          rating: 5,
          title: 'Excellent cours',
          comment: 'Contenu très enrichissant et instructeur compétent.',
          helpful: 15,
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Fatou Ndiaye',
          userAvatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          productId: course.id,
          rating: 4,
          title: 'Très satisfaite',
          comment: 'Bien structuré et facile à suivre.',
          helpful: 8,
          createdAt: '2024-01-10'
        }
      ],
      certificates: [
        {
          name: 'Certificat de participation',
          description: 'Atteste de la participation complète au cours',
          requirements: ['Assister à toutes les sessions', 'Compléter les quiz']
        },
        {
          name: 'Certificat de compétence',
          description: 'Atteste de la maîtrise des compétences',
          requirements: ['Obtenir 80% aux évaluations', 'Compléter le projet final']
        }
      ],
      pricing: {
        currentPrice: course.certification ? 25000 : 0,
        currency: 'FCFA',
        paymentPlans: [
          {
            name: 'Paiement en 3 fois',
            price: 8500,
            installments: 3
          }
        ]
      },
      schedule: {
        startDate: '2024-02-01',
        endDate: '2024-04-01',
        sessions: [
          { day: 'Lundi', time: '14:00', duration: 60 },
          { day: 'Mercredi', time: '14:00', duration: 60 },
          { day: 'Vendredi', time: '14:00', duration: 60 }
        ]
      }
    };
    
    setSelectedCourse(courseDetails);
    setShowDetailsPopup(true);
  };

  const handleEnroll = (courseId: string) => {
    // Logique d'inscription
    console.log('S\'inscrire au cours:', courseId);
    setShowDetailsPopup(false);
  };

  const handleContact = (instructorId: string) => {
    // Logique de contact
    console.log('Contacter l\'instructeur:', instructorId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">TerraNobis Académie</h1>
            <p className="text-purple-100">
              Formez-vous aux techniques agricoles ancestrales et modernes avec nos experts
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">6</div>
            <div className="text-sm text-purple-100">Formations disponibles</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">1,234</div>
              <div className="text-sm text-gray-600">Étudiants inscrits</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-sm text-gray-600">Certifications délivrées</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
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

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Course Thumbnail */}
            <div className="h-48 bg-gray-200 relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                  {getLevelLabel(course.level)}
                </span>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="h-6 w-6 text-purple-600" />
                </button>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
                {course.certification && (
                  <Award className="h-5 w-5 text-yellow-500 flex-shrink-0 ml-2" />
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>

              {/* Course Stats */}
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration} min</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{course.enrolledUsers}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {renderStars(course.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {course.rating} ({course.enrolledUsers} étudiants)
                </span>
              </div>

              {/* Instructor */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Par {course.instructor}</span>
                <span className="text-sm text-purple-600 font-medium">{course.category}</span>
              </div>

              {/* Progress Bar (if enrolled) */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progression</span>
                  <span className="text-sm font-medium text-gray-900">33%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                  Continuer
                </button>
                <button 
                  onClick={() => handleViewDetails(course)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BookOpen className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune formation trouvée</h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou vos filtres.
          </p>
        </div>
      )}

      {/* Course Details Popup */}
      <Popup
        isOpen={showDetailsPopup}
        onClose={() => setShowDetailsPopup(false)}
        size="xl"
      >
        {selectedCourse && (
          <CourseDetailsPopup
            course={selectedCourse}
            onClose={() => setShowDetailsPopup(false)}
            onEnroll={handleEnroll}
            onContact={handleContact}
          />
        )}
      </Popup>
    </div>
  );
};

export default Academy;