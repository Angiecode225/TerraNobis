import React, { useState } from 'react';
import Popup from '../common/Popup';
import { MapPin, Sprout, Ruler, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface ParcelleForm {
  name: string;
  location: string;
  surfaceArea: number;
  soilType: string;
}

interface CreateParcelleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (parcelle: ParcelleForm) => void;
}

const soilTypes = [
  'Argileux',
  'Sableux',
  'Limoneux',
  'Humifère',
  'Rocheux',
  'Autre',
];

const CreateParcelleModal: React.FC<CreateParcelleModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ParcelleForm>({
    name: '',
    location: '',
    surfaceArea: 0,
    soilType: '',
  });
  const [error, setError] = useState('');

  const steps = [
    {
      label: 'Nom de la parcelle',
      icon: <Sprout className="h-5 w-5 text-accent" />, 
      content: (
        <input
          type="text"
          className="w-full max-w-xs mx-auto px-3 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Ex: Parcelle Nord"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      ),
      validate: () => form.name.trim() !== '',
      error: 'Le nom est requis.'
    },
    {
      label: 'Localisation',
      icon: <MapPin className="h-5 w-5 text-accent" />, 
      content: (
        <input
          type="text"
          className="w-full max-w-xs mx-auto px-3 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Village, Région, GPS..."
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
      ),
      validate: () => form.location.trim() !== '',
      error: 'La localisation est requise.'
    },
    {
      label: 'Superficie (hectares)',
      icon: <Ruler className="h-5 w-5 text-accent" />, 
      content: (
        <input
          type="number"
          min={0.01}
          step={0.01}
          className="w-full max-w-xs mx-auto px-3 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Ex: 2.5"
          value={form.surfaceArea || ''}
          onChange={e => setForm({ ...form, surfaceArea: parseFloat(e.target.value) || 0 })}
        />
      ),
      validate: () => form.surfaceArea > 0,
      error: 'La superficie doit être supérieure à 0.'
    },
    {
      label: 'Type de sol',
      icon: <Sprout className="h-5 w-5 text-accent" />, 
      content: (
        <select
          className="w-full max-w-xs mx-auto px-3 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          value={form.soilType}
          onChange={e => setForm({ ...form, soilType: e.target.value })}
        >
          <option value="">Sélectionner</option>
          {soilTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      ),
      validate: () => form.soilType !== '',
      error: 'Le type de sol est requis.'
    },
  ];

  const handleNext = () => {
    if (!steps[step].validate()) {
      setError(steps[step].error);
      return;
    }
    setError('');
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(s => s - 1);
  };

  const handleSubmit = () => {
    if (!steps[step].validate()) {
      setError(steps[step].error);
      return;
    }
    setError('');
    onSubmit(form);
    onClose();
    setStep(0);
    setForm({ name: '', location: '', surfaceArea: 0, soilType: '' });
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size="md" title="Enregistrer une parcelle">
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-2">
          {steps[step].icon}
          <h3 className="text-lg font-semibold text-primary">{steps[step].label}</h3>
        </div>
        {steps[step].content}
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="px-4 py-2 rounded bg-primary text-white disabled:opacity-50"
            onClick={handleBack}
            disabled={step === 0}
          >
            <ChevronLeft className="inline h-4 w-4 mr-1" /> Retour
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              className="px-4 py-2 rounded bg-accent text-black font-semibold"
              onClick={handleNext}
            >
              Suivant <ChevronRight className="inline h-4 w-4 ml-1" />
            </button>
          ) : (
            <button
              type="button"
              className="px-4 py-2 rounded bg-accent text-black font-semibold"
              onClick={handleSubmit}
            >
              <CheckCircle className="inline h-4 w-4 mr-1" /> Enregistrer
            </button>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default CreateParcelleModal; 