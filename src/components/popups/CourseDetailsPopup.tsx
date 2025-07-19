import React, { useState } from 'react';
import { 
  Clock, 
  Users, 
  Star, 
  Play, 
  BookOpen, 
  Award,
  Download,
  Share2,
  CheckCircle,
  FileText,
  Video,
  Link,
  Calendar,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { CourseDetails } from '../../types';

interface CourseDetailsPopupProps {
  course: CourseDetails;
  onClose: () => void;
  onEnroll?: (courseId: string) => void;
  onContact?: (instructorId: string) => void;
}

const CourseDetailsPopup: React.FC<CourseDetailsPopupProps> = ({
  course,
  onClose,
  onEnroll,
  onContact
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

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

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              {course.certification && (
                <Award className="h-6 w-6 text-yellow-500" />
              )}
            </div>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                {getLevelLabel(course.level)}
              </span>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration} min
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                {course.enrolledUsers} étudiants
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                {course.rating} ({course.reviews.length} avis)
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Thumbnail */}
          <div className="relative">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4">
                <Play className="h-8 w-8 text-purple-600" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              {[
                { id: 'overview', label: 'Aperçu', icon: BookOpen },
                { id: 'curriculum', label: 'Programme', icon: FileText },
                { id: 'materials', label: 'Matériaux', icon: Download },
                { id: 'reviews', label: 'Avis', icon: Star },
                { id: 'schedule', label: 'Planning', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-4">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Learning Objectives */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Objectifs d'apprentissage</h3>
                  <ul className="space-y-2">
                    {course.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prerequisites */}
                {course.prerequisites.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Prérequis</h3>
                    <ul className="space-y-2">
                      {course.prerequisites.map((prerequisite, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{prerequisite}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Certificates */}
                {course.certificates.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications disponibles</h3>
                    <div className="space-y-3">
                      {course.certificates.map((cert, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-1">{cert.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{cert.description}</p>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Conditions :</span>
                            <ul className="mt-1 space-y-1">
                              {cert.requirements.map((req, reqIndex) => (
                                <li key={reqIndex} className="text-sm text-gray-600 flex items-center space-x-2">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-4">
                {course.curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleSection(section.section)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {expandedSections.includes(section.section) ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{section.section}</h4>
                          <p className="text-sm text-gray-600">{section.lessons.length} leçons</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {section.lessons.reduce((total, lesson) => total + lesson.duration, 0)} min
                      </div>
                    </button>
                    
                    {expandedSections.includes(section.section) && (
                      <div className="border-t border-gray-200">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center justify-between p-4 hover:bg-gray-50">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100">
                                {lesson.type === 'video' && <Video className="h-4 w-4 text-purple-600" />}
                                {lesson.type === 'text' && <FileText className="h-4 w-4 text-purple-600" />}
                                {lesson.type === 'quiz' && <BookOpen className="h-4 w-4 text-purple-600" />}
                                {lesson.type === 'assignment' && <CheckCircle className="h-4 w-4 text-purple-600" />}
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                                <p className="text-sm text-gray-600 capitalize">{lesson.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-500">{lesson.duration} min</span>
                              {lesson.completed && (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Matériaux de cours</h3>
                <div className="space-y-3">
                  {course.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100">
                          {material.type === 'pdf' && <FileText className="h-5 w-5 text-red-500" />}
                          {material.type === 'video' && <Video className="h-5 w-5 text-blue-500" />}
                          {material.type === 'link' && <Link className="h-5 w-5 text-green-500" />}
                          {material.type === 'download' && <Download className="h-5 w-5 text-purple-500" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{material.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">{material.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {material.required && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            Requis
                          </span>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Avis des étudiants</h3>
                {course.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {course.reviews.map((review) => (
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
                        <p className="text-sm text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Aucun avis pour le moment</h4>
                    <p className="text-gray-600">Soyez le premier à laisser un avis sur ce cours !</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Planning du cours</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Période du cours</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Du {course.schedule.startDate} au {course.schedule.endDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  {course.schedule.sessions.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Sessions programmées</h4>
                      <div className="space-y-2">
                        {course.schedule.sessions.map((session, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Calendar className="h-5 w-5 text-purple-600" />
                              <div>
                                <div className="font-medium text-gray-900">{session.day}</div>
                                <div className="text-sm text-gray-600">{session.time}</div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              {session.duration} min
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Instructor Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructeur</h3>
            <div className="flex items-start space-x-3">
              <img
                src={course.instructorAvatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                alt={course.instructor}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{course.instructor}</h4>
                <p className="text-sm text-gray-600 mb-2">{course.instructorBio}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onContact?.(course.instructor)}
                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Contacter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Course Stats */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Statistiques du cours</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Durée totale</span>
                <span className="text-sm font-medium text-gray-900">{course.duration} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Leçons</span>
                <span className="text-sm font-medium text-gray-900">
                  {course.curriculum.reduce((total, section) => total + section.lessons.length, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Étudiants inscrits</span>
                <span className="text-sm font-medium text-gray-900">{course.enrolledUsers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Note moyenne</span>
                <div className="flex items-center">
                  {renderStars(course.rating)}
                  <span className="ml-1 text-sm font-medium text-gray-900">{course.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Prix</h3>
            <div className="space-y-3">
              {course.pricing.originalPrice && course.pricing.originalPrice > course.pricing.currentPrice && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg line-through text-gray-500">
                    {course.pricing.originalPrice.toLocaleString()} FCFA
                  </span>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    -{Math.round(((course.pricing.originalPrice - course.pricing.currentPrice) / course.pricing.originalPrice) * 100)}%
                  </span>
                </div>
              )}
              <div className="text-2xl font-bold text-gray-900">
                {course.pricing.currentPrice.toLocaleString()} FCFA
              </div>
              
              {course.pricing.paymentPlans && course.pricing.paymentPlans.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Plans de paiement</h4>
                  <div className="space-y-2">
                    {course.pricing.paymentPlans.map((plan, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {plan.name} : {plan.price.toLocaleString()} FCFA × {plan.installments} versements
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => onEnroll?.(course.id)}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              S'inscrire maintenant
            </button>
            <button
              onClick={() => onContact?.(course.instructor)}
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Contacter l'instructeur
            </button>
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

export default CourseDetailsPopup; 