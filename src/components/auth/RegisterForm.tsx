import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole, RegisterFormProps } from '../../types';
import { Sprout, Mail, Lock, User, MapPin, Eye, EyeOff, Facebook, Smartphone } from 'lucide-react';
import CreateParcelleModal from '../projects/CreateParcelleModal';

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'farmer' as UserRole,
    location: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | 'facebook'>('email');
  const { register, loading, parcelles, addParcelle } = useAuth();
  const [parcelleModalOpen, setParcelleModalOpen] = useState(false);

  const roleOptions = [
    { value: 'farmer', label: 'Agriculteur', description: 'Je cultive la terre' },
    { value: 'investor', label: 'Investisseur', description: 'Je soutiens les projets agricoles' },
    { value: 'buyer', label: 'Acheteur', description: 'J\'achète des produits locaux' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name.trim()) {
      setError('Le nom est requis');
      return;
    }

    if (authMethod === 'email' && !formData.email.trim()) {
      setError('L\'email est requis');
      return;
    }

    if (authMethod === 'email' && !formData.email.includes('@')) {
      setError('Veuillez entrer un email valide');
      return;
    }

    if (authMethod === 'phone' && !formData.phone.trim()) {
      setError('Le numéro de téléphone est requis');
      return;
    }

    if (authMethod === 'phone' && formData.phone.length < 8) {
      setError('Veuillez entrer un numéro de téléphone valide');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!acceptedTerms) {
      setError('Vous devez accepter les conditions d\'utilisation');
      return;
    }

    try {
      const result = await register({
        ...formData,
        email: authMethod === 'email' ? formData.email : '',
        phone: authMethod === 'phone' ? formData.phone : ''
      });
      setSuccess('Compte créé avec succès ! Redirection...');
      // Ouvrir le modal d'ajout de parcelle si aucune n'est enregistrée
      if (!parcelles || parcelles.length === 0) {
        setParcelleModalOpen(true);
      } else {
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur s\'est produite lors de l\'inscription');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFacebookLogin = () => {
    setError('');
    setSuccess('Connexion Facebook en cours...');
    // Simulation de connexion Facebook
    setTimeout(() => {
      setSuccess('Connexion Facebook réussie ! Redirection...');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }, 2000);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Sprout className="h-12 w-12 text-green-600" />
              <span className="ml-2 text-3xl font-bold text-gray-900">TerraNobis</span>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Créer votre compte
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Rejoignez la communauté TerraNobis
            </p>
          </div>

          {/* Options de connexion */}
          <div className="space-y-4">
            {/* Facebook Login */}
            <button
              type="button"
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Facebook className="h-5 w-5 mr-2" />
              Continuer avec Facebook
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-green-50 to-blue-50 text-gray-500">Ou</span>
              </div>
            </div>

            {/* Méthode d'authentification */}
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  authMethod === 'email'
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                <Mail className="h-4 w-4 inline mr-1" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  authMethod === 'phone'
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                <Smartphone className="h-4 w-4 inline mr-1" />
                Téléphone
              </button>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom complet *
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-12 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Votre nom complet"
                    required
                  />
                </div>
              </div>

              {authMethod === 'email' && (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-12 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
              )}

              {authMethod === 'phone' && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Numéro de téléphone *
                  </label>
                  <div className="mt-1 relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-12 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="+221 77 123 45 67"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Je suis... *
                </label>
                <div className="mt-1 space-y-2">
                  {roleOptions.map((option) => (
                    <label key={option.value} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={formData.role === option.value}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                        required
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Localisation
                </label>
                <div className="mt-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-12 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Ville, Pays"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe * (min. 6 caractères)
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-12 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmer le mot de passe *
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-12 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                J'accepte les{' '}
                <a href="#" className="text-green-600 hover:text-green-500">
                  conditions d'utilisation
                </a>{' '}
                et la{' '}
                <a href="#" className="text-green-600 hover:text-green-500">
                  politique de confidentialité
                </a>
                *
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Création en cours...' : 'Créer mon compte'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Déjà un compte ?{' '}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Se connecter
                </button>
              </p>
            </div>

            {/* Bouton de test pour développement */}
            <div className="text-center pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    name: 'Test Utilisateur',
                    email: 'test@terranobis.com',
                    phone: '+221 77 123 45 67',
                    password: '123456',
                    confirmPassword: '123456',
                    role: 'farmer',
                    location: 'Dakar, Sénégal'
                  });
                  setAcceptedTerms(true);
                  setAuthMethod('email');
                }}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Remplir automatiquement (test)
              </button>
            </div>
          </form>
        </div>
      </div>
      <CreateParcelleModal
        isOpen={parcelleModalOpen}
        onClose={() => {
          setParcelleModalOpen(false);
          window.location.href = '/dashboard';
        }}
        onSubmit={addParcelle}
      />
    </>
  );
};

export default RegisterForm;