import React, { useState, useEffect } from 'react';
import { useNotifications } from '../common/NotificationManager';
import { 
  X, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText, 
  Upload,
  Crop,
  Users,
  Target
} from 'lucide-react';
import Popup from '../common/Popup';
import { useAuth } from '../../contexts/AuthContext';

interface CreateProjectForm {
  title: string;
  description: string;
  location: string;
  cropType: string;
  surfaceArea: number;
  investmentAmount: number;
  expectedReturn: number;
  duration: number;
  farmerName: string;
  farmerPhone: string;
  farmerEmail: string;
  documents: File[];
}

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: CreateProjectForm) => void;
  cropRecommendations?: any[]; // Ajouté pour passer les recommandations
  prefill?: Partial<CreateProjectForm>;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  cropRecommendations = [],
  prefill
}) => {
  const { showSuccess, showError } = useNotifications();
  const { parcelles, user } = useAuth();
  const [selectedParcelle, setSelectedParcelle] = useState<string>('');
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);
  const [formData, setFormData] = useState<CreateProjectForm>({
    title: '',
    description: '',
    location: '',
    cropType: '',
    surfaceArea: 0,
    investmentAmount: 0,
    expectedReturn: 0,
    duration: 12,
    farmerName: '',
    farmerPhone: '',
    farmerEmail: '',
    documents: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pré-remplir infos agriculteur
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        farmerName: user.name,
        farmerEmail: user.email,
        farmerPhone: user.phone || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    if (isOpen && prefill) {
      setFormData(prev => ({
        ...prev,
        ...prefill
      }));
    }
  }, [isOpen, prefill]);

  // Prix fictifs par culture pour le calcul automatique
  const cropPrices: Record<string, number> = {
    'Mil': 200000,
    'Arachide': 250000,
    'Maïs': 180000,
    'Riz': 220000,
    'Manioc': 150000,
    'Tomates': 300000,
    'Oignons': 280000,
    'Piments': 320000,
    'Haricots': 210000,
    'Sésame': 270000,
    'Autre': 200000
  };

  // Quand une culture recommandée est sélectionnée, pré-remplir les infos
  const handleCropTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const crop = e.target.value;
    setFormData(prev => ({ ...prev, cropType: crop }));
    if (cropRecommendations && cropRecommendations.length > 0) {
      const reco = cropRecommendations.find(r => r.crop === crop);
      setSelectedRecommendation(reco);
      if (reco) {
        const surface = formData.surfaceArea || 1;
        const price = cropPrices[crop] || 200000;
        setFormData(prev => ({
          ...prev,
          expectedReturn: parseFloat((reco.expectedYield || '0').toString()),
          description: `Période de plantation : ${reco.plantingPeriod}\nPériode de récolte : ${reco.harvestPeriod}\nConseils : ${(reco.tips || []).join(', ')}`,
          investmentAmount: surface * price
        }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'surfaceArea' || name === 'investmentAmount' || name === 'expectedReturn' || name === 'duration' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...files]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  // Quand une parcelle est sélectionnée, pré-remplir location et surfaceArea
  const handleParcelleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const parcelleName = e.target.value;
    setSelectedParcelle(parcelleName);
    const parcelle = parcelles.find(p => p.name === parcelleName);
    if (parcelle) {
      setFormData(prev => ({
        ...prev,
        location: parcelle.location,
        surfaceArea: parcelle.surfaceArea
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.title || !formData.description || !formData.location) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      if (formData.investmentAmount <= 0) {
        throw new Error('Le montant d\'investissement doit être supérieur à 0');
      }

      if (formData.expectedReturn <= 0) {
        throw new Error('Le rendement attendu doit être supérieur à 0');
      }

      // Simulation de création de projet
      await new Promise(resolve => setTimeout(resolve, 2000));

      onSubmit(formData);
      showSuccess(
        'Projet créé avec succès',
        'Votre projet d\'investissement a été créé et est en cours de validation par notre équipe.'
      );
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        cropType: '',
        surfaceArea: 0,
        investmentAmount: 0,
        expectedReturn: 0,
        duration: 12,
        farmerName: '',
        farmerPhone: '',
        farmerEmail: '',
        documents: []
      });
    } catch (error) {
      showError(
        'Erreur lors de la création',
        error instanceof Error ? error.message : 'Une erreur est survenue'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const cropTypes = [
    'Maïs',
    'Riz',
    'Manioc',
    'Tomates',
    'Oignons',
    'Piments',
    'Haricots',
    'Arachides',
    'Sésame',
    'Autre'
  ];

  return (
    <Popup isOpen={isOpen} onClose={onClose} size="xl" title="Créer un projet d'investissement">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sélection de la parcelle */}
        {parcelles && parcelles.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sélectionner une parcelle enregistrée
            </label>
            <select
              value={selectedParcelle}
              onChange={handleParcelleChange}
              className="w-full px-3 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent mb-2"
            >
              <option value="">-- Choisir une parcelle --</option>
              {parcelles.map(p => (
                <option key={p.name} value={p.name}>{p.name} ({p.location}, {p.surfaceArea} ha)</option>
              ))}
            </select>
          </div>
        )}
        {/* Informations du projet */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Informations du projet
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre du projet *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Culture de tomates bio"
                required
              />
            </div>

            {/* Type de culture (avec recommandations IA si dispo) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de culture
              </label>
              <select
                name="cropType"
                value={formData.cropType}
                onChange={handleCropTypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner une culture</option>
                {cropRecommendations && cropRecommendations.length > 0
                  ? cropRecommendations.map(reco => (
                      <option key={reco.crop} value={reco.crop}>{reco.crop}</option>
                    ))
                  : cropTypes.map(crop => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Décrivez votre projet d'investissement..."
                required
              />
            </div>
          </div>
        </div>

        {/* Localisation et superficie */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Localisation et superficie
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Localisation *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Région de Dakar"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Superficie (hectares)
              </label>
              <input
                type="number"
                name="surfaceArea"
                value={formData.surfaceArea}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.0"
              />
            </div>
          </div>
        </div>

        {/* Informations financières */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Informations financières
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Montant d'investissement (FCFA) *
              </label>
              <input
                type="number"
                name="investmentAmount"
                value={formData.investmentAmount}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rendement attendu (%)
              </label>
              <input
                type="number"
                name="expectedReturn"
                value={formData.expectedReturn}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durée (mois)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
                max="60"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12"
              />
            </div>
          </div>
        </div>

        {/* Informations de l'agriculteur */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Informations de l'agriculteur
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nom de l'agriculteur"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                name="farmerPhone"
                value={formData.farmerPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+221 XX XXX XX XX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="farmerEmail"
                value={formData.farmerEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@example.com"
              />
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Documents (optionnel)
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ajouter des documents
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <p className="text-sm text-gray-500 mt-1">
                Formats acceptés: PDF, DOC, DOCX, JPG, PNG (max 5MB par fichier)
              </p>
            </div>

            {formData.documents.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Documents sélectionnés:</h4>
                <div className="space-y-2">
                  {formData.documents.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Création en cours...
              </>
            ) : (
              <>
                <Target className="h-4 w-4 mr-2" />
                Créer le projet
              </>
            )}
          </button>
        </div>
      </form>
    </Popup>
  );
};

export default CreateProjectModal; 