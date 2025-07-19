import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { NavigationProps } from '../types';
import { 
  Home, 
  Search, 
  TrendingUp, 
  ShoppingCart, 
  BookOpen, 
  MessageCircle, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  X,
  Sprout,
  Network,
  User
} from 'lucide-react';
import CreateParcelleModal from './projects/CreateParcelleModal';

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(3);
  const [parcelleModalOpen, setParcelleModalOpen] = useState(false);
  const { addParcelle } = useAuth();

  const getNavItems = () => {
    if (!user) return [];

    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home, shortLabel: 'Accueil' },
      { id: 'soil-analysis', label: 'Diagnostic IA', icon: Search, shortLabel: 'IA' },
      { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, shortLabel: 'Marché' },
      { id: 'academy', label: 'Académie', icon: BookOpen, shortLabel: 'Formation' },
      { id: 'networking', label: 'Réseau Pro', icon: Network, shortLabel: 'Réseau' },
    ];

    const roleSpecificItems = {
      farmer: [
        { id: 'my-projects', label: 'Mes Projets', icon: Sprout, shortLabel: 'Projets' },
        { id: 'investments', label: 'Investissements', icon: TrendingUp, shortLabel: 'Invest' },
      ],
      investor: [
        { id: 'investments', label: 'Investissements', icon: TrendingUp, shortLabel: 'Invest' },
      ],
      buyer: [
        { id: 'orders', label: 'Mes Commandes', icon: ShoppingCart, shortLabel: 'Commandes' },
      ],
      admin: [
        { id: 'admin-users', label: 'Utilisateurs', icon: Settings, shortLabel: 'Users' },
        { id: 'admin-projects', label: 'Projets', icon: Sprout, shortLabel: 'Projets' },
        { id: 'admin-marketplace', label: 'Marketplace', icon: ShoppingCart, shortLabel: 'Marché' },
        { id: 'admin-analytics', label: 'Statistiques', icon: TrendingUp, shortLabel: 'Stats' },
      ]
    };

    return [...commonItems, ...(roleSpecificItems[user.role] || [])];
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-primary border-b border-accent shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14">
            {/* Logo - Plus compact */}
            <div className="flex items-center flex-shrink-0">
              <div className="flex items-center">
                <Sprout className="h-6 w-6 text-accent" />
                <span className="ml-2 text-lg font-bold text-white hidden sm:block">TerraNobis</span>
                <span className="ml-2 text-lg font-bold text-white sm:hidden">TN</span>
              </div>
            </div>

            {/* Desktop Navigation - Plus compact */}
            <div className="hidden lg:flex items-center space-x-1">
              {getNavItems().map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-accent text-black shadow-sm'
                      : 'text-white hover:text-accent hover:bg-primary/80'
                  }`}
                  title={item.label}
                >
                  <item.icon className="h-3.5 w-3.5 mr-1.5" />
                  <span className="hidden xl:block">{item.label}</span>
                  <span className="xl:hidden">{item.shortLabel}</span>
                </button>
              ))}
            </div>

            {/* User Actions - Plus compact */}
            <div className="flex items-center space-x-2">
              {/* Notifications - Plus petit */}
              <button className="relative p-1.5 text-white hover:text-accent rounded-full hover:bg-primary/80 transition-colors">
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent text-black text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>

              {/* User Menu - Plus compact */}
              <div className="flex items-center space-x-2">
                <img
                  className="h-6 w-6 rounded-full border border-accent"
                  src={user?.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                  alt="Profile"
                />
                <div className="hidden md:block">
                  <div className="text-xs font-medium text-white truncate max-w-20">{user?.name}</div>
                  <div className="text-[10px] text-accent capitalize">{user?.role}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-white hover:text-accent rounded-full hover:bg-primary/80 transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>

              {/* Bouton Ajouter une parcelle (desktop) */}
              <button
                className="hidden lg:inline-flex px-3 py-1.5 rounded-md bg-accent text-black font-semibold hover:bg-accent/90 transition-colors"
                onClick={() => setParcelleModalOpen(true)}
                title="Ajouter une parcelle"
              >
                <Sprout className="h-4 w-4 mr-1" /> Ajouter une parcelle
              </button>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-1.5 rounded-md text-white hover:text-accent hover:bg-primary/80 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Amélioré */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-primary border-t border-accent shadow-lg">
            <div className="px-2 py-2 space-y-1">
              {/* Section principale */}
              <div className="grid grid-cols-2 gap-1 mb-2">
                {getNavItems().slice(0, 6).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-center px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                      currentPage === item.id
                        ? 'bg-accent text-black shadow-sm'
                        : 'text-white hover:text-accent hover:bg-primary/80'
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5 mr-1.5" />
                    {item.shortLabel}
                  </button>
                ))}
              </div>
              
              {/* Section spécifique au rôle */}
              {getNavItems().slice(6).length > 0 && (
                <div className="border-t border-accent pt-2">
                  <div className="text-[10px] text-accent px-3 mb-1 uppercase tracking-wide">
                    {user?.role === 'farmer' ? 'Gestion' : 
                     user?.role === 'investor' ? 'Investissement' :
                     user?.role === 'buyer' ? 'Achats' :
                     user?.role === 'admin' ? 'Administration' : 'Actions'}
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {getNavItems().slice(6).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onPageChange(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center justify-center px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                          currentPage === item.id
                            ? 'bg-accent text-black shadow-sm'
                            : 'text-white hover:text-accent hover:bg-primary/80'
                        }`}
                      >
                        <item.icon className="h-3.5 w-3.5 mr-1.5" />
                        {item.shortLabel}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* User info mobile */}
              <div className="border-t border-accent pt-2 px-3">
                <div className="flex items-center space-x-2">
                  <img
                    className="h-8 w-8 rounded-full border border-accent"
                    src={user?.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                    alt="Profile"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{user?.name}</div>
                    <div className="text-xs text-accent capitalize">{user?.role}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-white hover:text-accent rounded-full hover:bg-primary/80 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Bouton Ajouter une parcelle (mobile menu) */}
              <button
                className="w-full flex items-center justify-center px-3 py-2 rounded-md bg-accent text-black font-semibold mb-2"
                onClick={() => { setParcelleModalOpen(true); setMobileMenuOpen(false); }}
              >
                <Sprout className="h-4 w-4 mr-1" /> Ajouter une parcelle
              </button>
            </div>
          </div>
        )}
      </nav>
      {/* Modal d'ajout de parcelle */}
      <CreateParcelleModal
        isOpen={parcelleModalOpen}
        onClose={() => setParcelleModalOpen(false)}
        onSubmit={addParcelle}
      />
    </>
  );
};

export default Navigation;