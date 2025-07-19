import React, { useState } from 'react';
import { useNotifications } from '../common/NotificationManager';
import { 
  Download, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Clock,
  BarChart3,
  Leaf,
  Droplets,
  Thermometer,
  Sun
} from 'lucide-react';

interface SoilAnalysisData {
  id: string;
  location: string;
  date: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  moisture: number;
  temperature: number;
  recommendations: string[];
  cropSuggestions: string[];
  traditionalMethods: string[];
}

interface SoilAnalysisReportProps {
  analysisData: SoilAnalysisData;
  onClose: () => void;
}

const SoilAnalysisReport: React.FC<SoilAnalysisReportProps> = ({
  analysisData,
  onClose
}) => {
  const { showSuccess, showError, showInfo } = useNotifications();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const generateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Simulation de génération de rapport
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      showSuccess(
        'Rapport généré',
        'Le rapport d\'analyse de sol a été généré avec succès. Vous pouvez maintenant le télécharger.'
      );
    } catch (error) {
      showError(
        'Erreur de génération',
        'Une erreur est survenue lors de la génération du rapport.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadReport = async () => {
    setIsDownloading(true);
    
    try {
      // Simulation de téléchargement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Créer le contenu du rapport
      const reportContent = generateReportContent();
      
      // Créer et télécharger le fichier
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport-analyse-sol-${analysisData.location}-${analysisData.date}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      showSuccess(
        'Rapport téléchargé',
        'Le rapport d\'analyse de sol a été téléchargé avec succès.'
      );
    } catch (error) {
      showError(
        'Erreur de téléchargement',
        'Une erreur est survenue lors du téléchargement du rapport.'
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const generateReportContent = () => {
    const content = `
RAPPORT D'ANALYSE DE SOL - TERRA NOBIS
========================================

INFORMATIONS GÉNÉRALES
----------------------
Lieu: ${analysisData.location}
Date d'analyse: ${analysisData.date}
ID d'analyse: ${analysisData.id}

RÉSULTATS D'ANALYSE
-------------------
pH du sol: ${analysisData.ph}
Azote (N): ${analysisData.nitrogen} mg/kg
Phosphore (P): ${analysisData.phosphorus} mg/kg
Potassium (K): ${analysisData.potassium} mg/kg
Matière organique: ${analysisData.organicMatter}%
Humidité: ${analysisData.moisture}%
Température: ${analysisData.temperature}°C

INTERPRÉTATION DES RÉSULTATS
----------------------------
${getInterpretation()}

RECOMMANDATIONS MODERNES
-----------------------
${analysisData.recommendations.map(rec => `- ${rec}`).join('\n')}

SUGGESTIONS DE CULTURES
----------------------
${analysisData.cropSuggestions.map(crop => `- ${crop}`).join('\n')}

MÉTHODES TRADITIONNELLES
-----------------------
${analysisData.traditionalMethods.map(method => `- ${method}`).join('\n')}

CONCLUSION
----------
Ce rapport combine les analyses scientifiques modernes avec les savoirs ancestraux pour vous fournir des recommandations complètes et durables pour votre sol.

Généré par TerraNobis - L'avenir de l'agriculture alimenté par l'IA
    `;
    
    return content;
  };

  const getInterpretation = () => {
    let interpretation = '';
    
    // pH
    if (analysisData.ph < 6.0) {
      interpretation += '- Le sol est acide. Considérer l\'ajout de chaux pour améliorer le pH.\n';
    } else if (analysisData.ph > 7.5) {
      interpretation += '- Le sol est alcalin. Considérer l\'ajout de matière organique pour acidifier légèrement.\n';
    } else {
      interpretation += '- Le pH est optimal pour la plupart des cultures.\n';
    }
    
    // Azote
    if (analysisData.nitrogen < 50) {
      interpretation += '- Faible teneur en azote. Fertilisation azotée recommandée.\n';
    } else if (analysisData.nitrogen > 200) {
      interpretation += '- Teneur élevée en azote. Éviter la sur-fertilisation.\n';
    } else {
      interpretation += '- Teneur en azote satisfaisante.\n';
    }
    
    // Phosphore
    if (analysisData.phosphorus < 20) {
      interpretation += '- Faible teneur en phosphore. Ajout de phosphate recommandé.\n';
    } else {
      interpretation += '- Teneur en phosphore adéquate.\n';
    }
    
    // Potassium
    if (analysisData.potassium < 100) {
      interpretation += '- Faible teneur en potassium. Fertilisation potassique recommandée.\n';
    } else {
      interpretation += '- Teneur en potassium satisfaisante.\n';
    }
    
    return interpretation;
  };

  const getNutrientStatus = (value: number, min: number, max: number) => {
    if (value < min) return 'Faible';
    if (value > max) return 'Élevé';
    return 'Optimal';
  };

  const getNutrientColor = (value: number, min: number, max: number) => {
    if (value < min) return 'text-red-600';
    if (value > max) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Rapport d'Analyse de Sol</h2>
          <p className="text-gray-600">
            Analyse réalisée le {analysisData.date} à {analysisData.location}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={generateReport}
            disabled={isGenerating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Génération...</span>
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                <span>Générer le rapport</span>
              </>
            )}
          </button>
          
          <button
            onClick={downloadReport}
            disabled={isDownloading || isGenerating}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Téléchargement...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Télécharger</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Résultats d'analyse */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Paramètres physico-chimiques */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Paramètres physico-chimiques
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">pH du sol</span>
              <span className={`font-medium ${getNutrientColor(analysisData.ph, 6.0, 7.5)}`}>
                {analysisData.ph}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Azote (N)</span>
              <span className={`font-medium ${getNutrientColor(analysisData.nitrogen, 50, 200)}`}>
                {analysisData.nitrogen} mg/kg
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Phosphore (P)</span>
              <span className={`font-medium ${getNutrientColor(analysisData.phosphorus, 20, 100)}`}>
                {analysisData.phosphorus} mg/kg
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Potassium (K)</span>
              <span className={`font-medium ${getNutrientColor(analysisData.potassium, 100, 300)}`}>
                {analysisData.potassium} mg/kg
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Matière organique</span>
              <span className={`font-medium ${getNutrientColor(analysisData.organicMatter, 2, 8)}`}>
                {analysisData.organicMatter}%
              </span>
            </div>
          </div>
        </div>

        {/* Conditions environnementales */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Thermometer className="h-5 w-5 mr-2" />
            Conditions environnementales
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center">
                <Droplets className="h-4 w-4 mr-1" />
                Humidité
              </span>
              <span className="font-medium text-blue-600">
                {analysisData.moisture}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center">
                <Sun className="h-4 w-4 mr-1" />
                Température
              </span>
              <span className="font-medium text-orange-600">
                {analysisData.temperature}°C
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommandations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Recommandations modernes */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Recommandations modernes
          </h3>
          <ul className="space-y-2">
            {analysisData.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-blue-800 flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Suggestions de cultures */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
            <Leaf className="h-5 w-5 mr-2" />
            Cultures recommandées
          </h3>
          <ul className="space-y-2">
            {analysisData.cropSuggestions.map((crop, index) => (
              <li key={index} className="text-sm text-green-800 flex items-start">
                <span className="text-green-600 mr-2">•</span>
                {crop}
              </li>
            ))}
          </ul>
        </div>

        {/* Méthodes traditionnelles */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Savoirs ancestraux
          </h3>
          <ul className="space-y-2">
            {analysisData.traditionalMethods.map((method, index) => (
              <li key={index} className="text-sm text-yellow-800 flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interprétation détaillée */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Interprétation détaillée</h3>
        <div className="text-sm text-gray-700 whitespace-pre-line">
          {getInterpretation()}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Fermer
        </button>
        <button
          onClick={downloadReport}
          disabled={isDownloading}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Télécharger le rapport complet</span>
        </button>
      </div>
    </div>
  );
};

export default SoilAnalysisReport; 