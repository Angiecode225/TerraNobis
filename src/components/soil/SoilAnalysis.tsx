import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../common/NotificationManager';
import { geminiService } from '../../services/gemini';
import { testGeminiResponse } from '../../utils/testGemini';
import { 
  Upload, 
  MapPin, 
  Search, 
  Lightbulb, 
  TrendingUp, 
  FileText, 
  Download, 
  Bot,
  BarChart3,
  Leaf,
  CheckCircle,
  Sparkles,
  Star,
  Heart,
  Bug,
  Ruler
} from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import Popup from '../common/Popup';
import SoilAnalysisReport from './SoilAnalysisReport';
import CreateProjectModal from '../projects/CreateProjectModal';
import Confetti from '../common/Confetti';

// Ajout de la fonction d'appel à Flask
async function fetchFlaskPrediction(imageFile: File, city: string, area: number) {
  const formData = new FormData();
  formData.append('soil_image', imageFile);
  formData.append('city', city);
  formData.append('area', area.toString());

  const response = await fetch('http://localhost:5000/predict', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: formData,
  });

  if (!response.ok) throw new Error('Erreur lors de la prédiction Flask');
  return await response.json();
}

// Fonction pour appeler Gemini avec le contexte Flask
async function fetchGeminiWithContext(flaskData: any) {
  // Prompt pour une réponse moyenne (5 conseils, clairs, phrases courtes, un peu de contexte)
  const customPrompt =
    `Voici les résultats d'une analyse de sol réalisée en Afrique :
    - Ville : ${flaskData.ville || flaskData.location || ''}
    - Type de sol : ${flaskData.type_de_sol_predit || ''}
    - Culture optimale : ${flaskData.culture_optimale || ''}
    - pH : ${flaskData.pH || ''}
    - Azote (N) : ${flaskData.N || ''}
    - Phosphore (P) : ${flaskData.P || ''}
    - Potassium (K) : ${flaskData.K || ''}

    Donne 5 conseils pratiques, clairs, avec des phrases courtes. Ajoute un peu de contexte si utile, mais reste simple et direct. Pas de répétition des données ci-dessus. Réponds en français accessible à tous, sous forme de liste.`;

  const result = await geminiService.analyzeSoil({
    location: flaskData.ville || flaskData.location || '',
    soilType: flaskData.type_de_sol_predit || '',
    ph: flaskData.pH || undefined,
    nutrients: {
      nitrogen: flaskData.N || 0,
      phosphorus: flaskData.P || 0,
      potassium: flaskData.K || 0
    },
  });

  // Nettoie la réponse pour ne garder que les 5 premiers conseils/phrases
  const conseils = result
    .replace(/\*\*([^*]+)\*\*/g, '')
    .replace(/<[^>]+>/g, '')
    .split(/\n|\r|•|\d+\.|-/)
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 5)
    .map((c, i) => `• ${c}`)
    .join('\n');

  return conseils;
}

const SoilAnalysis: React.FC = () => {
  const [analysisData, setAnalysisData] = useState({
    location: '',
    soilType: '',
    ph: '',
    superficie: '', // Ajout du champ superficie
    imageFile: null as File | null
  });
  const { showSuccess, showError, showInfo } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [showReport, setShowReport] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4; // Localisation, Type de sol, Photo, Résultats
  const [projectPrefill, setProjectPrefill] = useState<any>(null);

  // Animation de confettis quand l'analyse est terminée
  useEffect(() => {
    if (results && !loading) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [results, loading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAnalysisData({ ...analysisData, imageFile: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (analysisData.imageFile && analysisData.location && analysisData.superficie) {
        const flaskResult = await fetchFlaskPrediction(
          analysisData.imageFile,
          analysisData.location,
          Number(analysisData.superficie)
        );
        console.log('[DEBUG] Réponse Flask:', flaskResult);
        setResults(flaskResult);
        // Debug Gemini
        console.log('[DEBUG] On va appeler Gemini avec :', flaskResult);
        try {
          const geminiResult = await fetchGeminiWithContext(flaskResult);
          console.log('[DEBUG] Réponse Gemini:', geminiResult);
          setAiAnalysis(geminiResult);
        } catch (err) {
          console.error('[DEBUG] Erreur Gemini:', err);
          showError('Erreur Gemini', String(err));
        }
        showSuccess('Analyse IA complète réussie', 'Résultat enrichi reçu !');
        nextStep();
        setLoading(false);
      }
    } catch (error) {
      showError('Erreur d\'analyse', 'Une erreur est survenue lors de l\'analyse');
      setLoading(false);
    }
  };

  const getSuitabilityColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSuitabilityBg = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100';
    if (percentage >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  // Navigation entre les étapes
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return analysisData.location.trim() !== '' && analysisData.superficie && Number(analysisData.superficie) > 0;
      case 2: return analysisData.soilType !== '';
      case 3: return true; // Photo est optionnelle
      case 4: return false; // Dernière étape
      default: return false;
    }
  };

  const handleStepSubmit = async () => {
    if (currentStep === 3) {
      // Soumettre l'analyse à l'étape 3
      await handleSubmit(new Event('submit') as any);
    } else {
      nextStep();
    }
  };

  // Liste des types de sol extraits du CSV
  const soilTypes = [
    'Ferrallitique',
    'Ferrugineux',
    'Hydromorphe',
    'Sableux',
    'Vertisol'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Confettis de célébration */}
      <Confetti isActive={showConfetti} />
      
      {/* Barre de progression */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">🌱 Diagnostic du Sol</h1>
            <div className="text-sm text-gray-600">
              Étape {currentStep} sur {totalSteps}
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          
          {/* Étapes */}
          <div className="flex justify-between mt-3">
            {[
              { number: 1, title: 'Localisation', icon: '📍' },
              { number: 2, title: 'Type de sol', icon: '🏗️' },
              { number: 3, title: 'Photo (optionnel)', icon: '📸' },
              { number: 4, title: 'Résultats', icon: '📊' }
            ].map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <div className={`text-xs mt-1 text-center ${
                  currentStep >= step.number ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}>
                  <div className="text-lg">{step.icon}</div>
                  <div className="hidden sm:block">{step.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message de célébration */}
      {showConfetti && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold">🎉 Analyse terminée ! Vos résultats sont prêts !</span>
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
      )}

      {/* Contenu principal par étapes */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-8 animate-fade-in">
            <div className="flex items-center mb-6">
              <div className="bg-blue-500 rounded-full p-3 mr-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-blue-800">📍 Étape 1 : Où êtes-vous ?</h2>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 rounded-full p-2 mr-3 animate-float">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-blue-800 text-glow">🌍 Indiquez votre localisation</h3>
              </div>
              <div className="relative mb-6">
                <input
                  type="text"
                  value={analysisData.location}
                  onChange={(e) => setAnalysisData({ ...analysisData, location: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-blue-300 rounded-xl focus-ring text-lg transition-all duration-300"
                  placeholder="Ex: Thiès, Sénégal"
                  required
                />
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-500 animate-pulse" />
              </div>
              {/* Champ superficie */}
              <div className="relative mb-2">
                <input
                  type="number"
                  min={1}
                  value={analysisData.superficie}
                  onChange={(e) => setAnalysisData({ ...analysisData, superficie: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-green-300 rounded-xl focus-ring text-lg transition-all duration-300"
                  placeholder="Superficie de la parcelle (en m²)"
                  required
                />
                <Ruler className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-green-500 animate-pulse" />
              </div>
              <p className="text-sm text-blue-600 mt-2">📏 Indiquez la superficie de votre parcelle en mètres carrés (m²)</p>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-8 animate-fade-in">
            <div className="flex items-center mb-6">
              <div className="bg-purple-500 rounded-full p-3 mr-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-purple-800">🏗️ Étape 2 : Type de sol</h2>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="flex items-center mb-4">
                <div className="bg-purple-500 rounded-full p-2 mr-3 animate-float">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-purple-800 text-glow">🏗️ Quel type de sol avez-vous ?</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {soilTypes.map((type, index) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAnalysisData({ ...analysisData, soilType: type })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:bg-purple-50 hover:shadow-md ${
                      analysisData.soilType === type
                        ? 'border-purple-500 bg-purple-100 shadow-lg scale-105 animate-glow'
                        : 'border-purple-200 bg-white hover:border-purple-300 hover:shadow-md'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-2xl mb-2">🌱</div>
                    <div className="font-semibold text-purple-800 text-sm">{type}</div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-purple-600 mt-3">🏗️ Choisissez le type qui ressemble le plus à votre sol</p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8 animate-fade-in">
            <div className="flex items-center mb-6">
              <div className="bg-green-500 rounded-full p-3 mr-4">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-green-800">📸 Étape 3 : Photo de votre sol</h2>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 rounded-full p-2 mr-3 animate-float">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-green-800 text-glow">📸 Photo de votre sol (optionnel)</h3>
              </div>
              
              <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-500 transition-all duration-300 hover:bg-green-50 hover-scale">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="soil-image"
                />
                <label htmlFor="soil-image" className="cursor-pointer">
                  <div className="text-4xl mb-4 animate-bounce">📱</div>
                  <Upload className="h-16 w-16 text-green-500 mx-auto mb-4 animate-pulse" />
                  <p className="text-lg font-semibold text-green-800 mb-2">
                    Cliquez ici pour prendre une photo
                  </p>
                  <p className="text-sm text-green-600 mb-4">
                    📸 Prenez une photo de votre sol pour une analyse plus précise !
                  </p>
                  <div className="bg-green-100 rounded-lg p-3 hover-scale">
                    <p className="text-xs text-green-700">
                      💡 Conseil : Prenez la photo en plein soleil pour voir les couleurs
                    </p>
                  </div>
                </label>
                {analysisData.imageFile && (
                  <div className="mt-4 bg-green-100 rounded-lg p-3 animate-bounce-in">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 animate-pulse" />
                      <span className="text-green-700 font-medium">
                        ✅ Photo ajoutée : {analysisData.imageFile.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
                  <h4 className="font-semibold text-yellow-800">💡 Comment ça marche ?</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 text-lg">
                      1️⃣
                    </div>
                    <p className="text-yellow-700 font-medium">Dites-nous où vous êtes</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 text-lg">
                      2️⃣
                    </div>
                    <p className="text-yellow-700 font-medium">Prenez une photo de votre sol</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 text-lg">
                      3️⃣
                    </div>
                    <p className="text-yellow-700 font-medium">Obtenez vos conseils magiques !</p>
                  </div>
                </div>
              </div>
            </div>
            {/* BOUTON POUR LANCER L'ANALYSE */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleStepSubmit}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Analyse en cours..." : "Lancer l'analyse"}
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && results && (
          <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-8 animate-fade-in">
            {/* Message de succès animé */}
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 text-white text-center">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Star className="h-8 w-8 animate-spin" />
                <h2 className="text-2xl font-bold">🎉 Félicitations !</h2>
                <Star className="h-8 w-8 animate-spin" />
              </div>
              <p className="text-lg">
                Votre analyse de sol est terminée ! Découvrez vos recommandations personnalisées ci-dessous.
              </p>
            </div>
            {/* Soil Quality Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 text-indigo-500 mr-2" />
                Analyse du sol
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-green-600 mb-1">{results.soilQuality || ''}</div>
                  <div className="text-sm text-green-700 font-medium">Qualité générale</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{results.pH}</div>
                  <div className="text-sm text-blue-700 font-medium">pH du sol</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{results.N}%</div>
                  <div className="text-sm text-purple-700 font-medium">Azote (N)</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-orange-600 mb-1">{results.P}%</div>
                  <div className="text-sm text-orange-700 font-medium">Phosphore (P)</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-lime-50 border border-yellow-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow col-span-2 md:col-span-4">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">{results.K}%</div>
                  <div className="text-sm text-yellow-700 font-medium">Potassium (K)</div>
                </div>
              </div>
            </div>
            {/* Crop Recommendations - design carte */}
            {results && results.found && (
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-6 mt-6 shadow-sm">
                <h2 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
                  <Leaf className="h-5 w-5 text-green-500 mr-2" />
                  Recommandations de cultures
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border-2 border-green-200 p-4 flex flex-col items-center shadow hover:shadow-lg transition">
                    <div className="text-2xl font-bold text-green-700 mb-2">🌾 {results.culture_optimale}</div>
                    <div className="text-sm text-gray-700 mb-1">Culture optimale</div>
                    <div className="text-lg font-semibold text-blue-700 mb-2">Prévision de rendement</div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{results.rendement_estime} t</div>
                    <div className="text-sm text-gray-700 mb-1">Pour {results.superficie} m²</div>
                    <div className="text-xs text-gray-500 italic">{results.match_level}</div>
                  </div>
                  <div className="bg-white rounded-xl border-2 border-yellow-200 p-4 flex flex-col items-center shadow hover:shadow-lg transition">
                    <div className="text-lg font-semibold text-yellow-700 mb-2">Engrais recommandé</div>
                    <div className="text-base text-gray-800 mb-1">Type : <span className="font-bold text-green-700">{results.type_engrais}</span></div>
                    <div className="text-base text-gray-800 mb-1">Formule NPK : <span className="font-bold text-blue-700">{results.formule_NPK}</span></div>
                    <div className="text-base text-gray-800 mb-1">Fréquence : <span className="font-bold text-purple-700">{results.frequence_application}</span></div>
                    <div className="text-base text-gray-800 mb-1">Mode : <span className="font-bold text-orange-700">{results.mode_application}</span></div>
                  </div>
                </div>
              </div>
            )}
            {results && !results.found && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p>{results.match_level}</p>
              </div>
            )}
            {/* Conseils IA pour tous - design chaleureux et lisible */}
            {aiAnalysis && (
              <div className="bg-white rounded-lg shadow-sm border border-purple-200 p-6 mt-6">
                <h2 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                  <Bot className="h-5 w-5 text-purple-500 mr-2" />
                  Conseils IA pour tous
                </h2>
                <ul className="text-gray-900 text-base leading-relaxed space-y-2 list-disc pl-6">
                  {aiAnalysis.split(/\n|\r/).filter(Boolean).map((c, i) => (
                    <li key={i}>{c.replace(/^•\s*/, '')}</li>
                  ))}
                </ul>
                <div className="mt-2 text-xs text-gray-500 italic">Conseils adaptés pour tous, même sans savoir lire : demande à un proche de t’expliquer si besoin.</div>
              </div>
            )}
            {/* Boutons d'action à la fin */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              <button 
                onClick={() => {
                  setProjectPrefill({
                    cropType: results.culture_optimale || '',
                    surfaceArea: results.superficie || '',
                    expectedReturn: results.rendement_estime || '',
                    location: results.ville || '',
                    description: `Type de sol : ${results.type_de_sol_predit || ''}\nEngrais recommandé : ${results.type_engrais || ''}`
                  });
                  setShowCreateProject(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <TrendingUp className="h-5 w-5" />
                <span>Créer un projet d'investissement</span>
              </button>
              <button 
                onClick={() => setShowReport(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <FileText className="h-5 w-5" />
                <span>Télécharger le rapport</span>
              </button>
            </div>
          </div>
        )}

        {/* Boutons de navigation */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              <span>← Retour</span>
            </button>
            <div className="flex space-x-4">
              {/* Bouton Suivant pour étapes 1 et 2 */}
              {(currentStep === 1 || currentStep === 2) && (
                <button
                  onClick={nextStep}
                  disabled={!canProceedToNext() || loading}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                    !canProceedToNext() || loading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700'
                  }`}
                >
                  <span>Suivant</span>
                  <span>→</span>
                </button>
              )}
              {/* Pas de bouton ici à l'étape 3, il est dans le bloc principal */}
            </div>
          </div>
        </div>
      </div>

      {/* Soil Analysis Report Popup */}
      <Popup
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        size="xl"
      >
        {results && (
          <SoilAnalysisReport
            analysisData={{
              id: `analysis-${Date.now()}`,
              location: analysisData.location,
              date: new Date().toLocaleDateString('fr-FR'),
              ph: results.pH,
              nitrogen: results.N,
              phosphorus: results.P,
              potassium: results.K || 75,
              organicMatter: 3.5,
              moisture: 65,
              temperature: 28,
              recommendations: [
                'Apport de compost organique pour améliorer la structure du sol',
                'Fertilisation azotée modérée pour optimiser la croissance',
                'Rotation des cultures pour préserver la fertilité',
                'Irrigation adaptée selon les besoins des cultures recommandées'
              ],
              cropSuggestions: Array.isArray(results.recommendations) ? results.recommendations.map((rec: any) => rec.crop) : [],
              traditionalMethods: Array.isArray(results.traditionalKnowledge) ? results.traditionalKnowledge.map((knowledge: any) => knowledge.title) : []
            }}
            onClose={() => setShowReport(false)}
          />
        )}
      </Popup>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
        onSubmit={(projectData) => {
          console.log('Projet créé depuis l\'analyse de sol:', projectData);
          setShowCreateProject(false);
        }}
        cropRecommendations={results?.recommendations || []}
        prefill={projectPrefill}
      />
    </div>
  );
};

export default SoilAnalysis;