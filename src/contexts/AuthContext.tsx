import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, AuthContextType, RegisterData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Ajout du type Parcelle
export interface Parcelle {
  name: string;
  location: string;
  surfaceArea: number;
  soilType: string;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [parcelles, setParcelles] = useState<Parcelle[]>([]);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('terranobis_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);

    // Check if parcelles are already saved
    const savedParcelles = localStorage.getItem('terranobis_parcelles');
    if (savedParcelles) {
      setParcelles(JSON.parse(savedParcelles));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Mock authentication - in real app, this would be an API call
    const mockUser: User = {
      id: '1',
      name: email === 'admin@terranobis.com' ? 'Admin TerraNobis' : 'Jean David',
      email,
      role: email === 'admin@terranobis.com' ? 'admin' : 'farmer',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      location: 'Dakar, Sénégal',
      bio: 'Passionné par l\'agriculture durable et les savoirs ancestraux',
      verified: true,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('terranobis_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    
    try {
      // Validation supplémentaire
      if (!userData.name || !userData.email || !userData.password) {
        throw new Error('Tous les champs requis doivent être remplis');
      }

      if (userData.password.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères');
      }

      // Vérifier si l'utilisateur existe déjà (simulation)
      const existingUser = localStorage.getItem('terranobis_user');
      if (existingUser) {
        const parsedUser = JSON.parse(existingUser);
        if (parsedUser.email === userData.email) {
          throw new Error('Un compte avec cet email existe déjà');
        }
      }

      // Mock registration avec délai pour simuler l'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        location: userData.location || 'Non spécifié',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        bio: 'Nouveau membre de la communauté TerraNobis',
        verified: false,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('terranobis_user', JSON.stringify(newUser));
      setUser(newUser);
      setLoading(false);
      
      // Retourner un message de succès
      return { success: true, message: 'Compte créé avec succès !' };
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const addParcelle = (parcelle: Parcelle) => {
    setParcelles(prev => {
      const updated = [...prev, parcelle];
      localStorage.setItem('terranobis_parcelles', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    localStorage.removeItem('terranobis_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, parcelles, addParcelle }}>
      {children}
    </AuthContext.Provider>
  );
};