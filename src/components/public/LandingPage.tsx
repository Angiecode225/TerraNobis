import React from 'react';
import { LandingPageProps } from '../../types';
import { 
  Sprout, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Brain, 
  ArrowRight,
  Star,
  MapPin,
  DollarSign,
  Play,
  CheckCircle
} from 'lucide-react';

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onLogin }) => {
  const stats = [
    { label: 'Agriculteurs actifs', value: '2,847', icon: Users },
    { label: 'Projets financés', value: '1,234', icon: Sprout },
    { label: 'Investissements', value: '45M FCFA', icon: TrendingUp },
    { label: 'Formations gratuites', value: '156', icon: BookOpen }
  ];

  const features = [
    {
      icon: Brain,
      title: 'IA Agricole Avancée',
      description: 'Notre intelligence artificielle analyse votre sol, prédit les meilleures cultures et optimise vos rendements en temps réel.'
    },
    {
      icon: TrendingUp,
      title: 'Investissement Participatif',
      description: 'Investissez dans des projets agricoles locaux et soutenez la souveraineté alimentaire tout en générant des revenus.'
    },
    {
      icon: Users,
      title: 'Mise en Relation',
      description: 'Connectez agriculteurs, entrepreneurs et particuliers pour des achats en gros ou détail directement du producteur.'
    },
    {
      icon: BookOpen,
      title: 'Formations Gratuites',
      description: 'Accédez à des formations sur les techniques ancestrales et modernes, certifiées par nos experts.'
    }
  ];

  const testimonials = [
    {
      name: 'Aminata Diallo',
      role: 'Agricultrice, Thiès',
      content: 'Grâce à l\'IA de TerraNobis, j\'ai augmenté mes rendements de 40% et trouvé des investisseurs pour mon projet de mil bio.',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Mamadou Sow',
      role: 'Investisseur, Dakar',
      content: 'J\'ai investi dans 5 projets agricoles via TerraNobis. Excellent retour sur investissement et impact social positif.',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Fatou Ndiaye',
      role: 'Entrepreneuse, Kaolack',
      content: 'La plateforme m\'a permis de connecter directement avec des agriculteurs pour approvisionner mon restaurant.',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                L'avenir de l'agriculture
                <span className="block text-yellow-300">alimenté par l'IA</span>
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Valorisez vos savoirs ancestraux, optimisez vos cultures avec l'IA, 
                investissez dans l'agriculture locale et créez des liens directs producteur-consommateur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('public-investments')}
                  className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center"
                >
                  Découvrir les investissements
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={onLogin}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors"
                >
                  Commencer gratuitement
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/4021761/pexels-photo-4021761.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                alt="Agriculture moderne"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-semibold">IA Prédictive</div>
                    <div className="text-sm text-gray-600">+40% de rendement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir TerraNobis ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre plateforme révolutionne l'agriculture en combinant intelligence artificielle, 
              savoirs ancestraux et économie collaborative.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Sections */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer"
                 onClick={() => onNavigate('public-investments')}>
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2">Investir dans l'agriculture</h3>
              <p className="text-blue-100 mb-4">Découvrez des projets agricoles rentables et soutenez la souveraineté alimentaire</p>
              <div className="flex items-center justify-center text-yellow-300">
                Voir les projets <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
            
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer"
                 onClick={() => onNavigate('public-marketplace')}>
              <Users className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2">Marketplace agricole</h3>
              <p className="text-blue-100 mb-4">Achetez directement auprès des producteurs locaux, en gros ou au détail</p>
              <div className="flex items-center justify-center text-yellow-300">
                Parcourir les produits <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
            
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer"
                 onClick={() => onNavigate('public-academy')}>
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2">Formations gratuites</h3>
              <p className="text-blue-100 mb-4">Apprenez les techniques agricoles ancestrales et modernes avec nos experts</p>
              <div className="flex items-center justify-center text-yellow-300">
                Commencer à apprendre <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos utilisateurs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à révolutionner votre agriculture ?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Rejoignez des milliers d'agriculteurs, investisseurs et entrepreneurs qui transforment 
            l'agriculture africaine avec TerraNobis.
          </p>
          <button 
            onClick={onLogin}
            className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-lg"
          >
            Commencer maintenant - C'est gratuit
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;