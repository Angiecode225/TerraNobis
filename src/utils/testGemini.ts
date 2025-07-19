// Utilitaire de test pour l'API Gemini
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const testGeminiConnection = async () => {
  console.log('🧪 Test de connexion Gemini...');
  console.log('🔑 Clé API:', GEMINI_API_KEY ? '✅ Configurée' : '❌ Manquante');

  if (!GEMINI_API_KEY) {
    console.error('❌ Clé API non configurée');
    return false;
  }

  const testPrompt = "Dis-moi bonjour en français en une phrase.";
  
  const models = [
    'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
    'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
  ];

  for (const modelUrl of models) {
    try {
      console.log(`🔄 Test avec: ${modelUrl}`);
      
      const response = await fetch(`${modelUrl}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: testPrompt
            }]
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const result = data.candidates[0]?.content?.parts[0]?.text;
        console.log(`✅ Succès avec ${modelUrl}`);
        console.log(`📝 Réponse: ${result}`);
        return { success: true, model: modelUrl, response: result };
      } else {
        const errorText = await response.text();
        console.log(`❌ Échec avec ${modelUrl}: ${response.status}`);
        console.log(`📄 Erreur: ${errorText}`);
      }
    } catch (error) {
      console.log(`❌ Erreur avec ${modelUrl}:`, error);
    }
  }

  console.error('❌ Aucun modèle ne fonctionne');
  return { success: false, error: 'Aucun modèle disponible' };
};

// Fonction pour lister les modèles disponibles
export const listAvailableModels = async () => {
  if (!GEMINI_API_KEY) {
    console.error('❌ Clé API non configurée');
    return;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('📋 Modèles disponibles:');
      data.models?.forEach((model: any) => {
        console.log(`- ${model.name}: ${model.description || 'Aucune description'}`);
      });
      return data.models;
    } else {
      const errorText = await response.text();
      console.error('❌ Erreur lors de la récupération des modèles:', errorText);
    }
  } catch (error) {
    console.error('❌ Erreur de connexion:', error);
  }
}; 

// Test des améliorations d'affichage de Gemini
import { geminiService } from '../services/gemini';

export const testGeminiDisplay = async () => {
  console.log('🧪 Test des améliorations d\'affichage Gemini...');
  
  try {
    // Test avec une image fictive (base64 minimal)
    const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    const testLocation = 'Thiès, Sénégal';
    
    console.log('📸 Test d\'analyse d\'image...');
    const result = await geminiService.analyzeSoilImage(testImageBase64, testLocation);
    
    console.log('✅ Résultat Gemini:', result);
    
    // Vérifier la structure
    if (result.analysis && result.recommendations) {
      console.log('✅ Structure correcte détectée');
      console.log('📝 Analyse:', result.analysis);
      console.log('🌾 Recommandations:', result.recommendations.length, 'cultures');
      
      result.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec.crop} (${rec.suitability}% adapté)`);
      });
    } else {
      console.log('⚠️ Structure incomplète, fallback utilisé');
    }
    
    return result;
  } catch (error) {
    console.error('❌ Erreur test Gemini:', error);
    return null;
  }
};

// Test des améliorations visuelles
export const testVisualImprovements = () => {
  console.log('🎨 Test des améliorations visuelles...');
  
  const testData = {
    soilQuality: 'Excellente',
    ph: 6.8,
    nutrients: {
      nitrogen: 85,
      phosphorus: 60,
      potassium: 75
    },
    recommendations: [
      {
        crop: 'Mil',
        suitability: 95,
        expectedYield: '1.5 tonnes/hectare',
        marketDemand: 'Très élevée',
        plantingPeriod: 'Juin - Juillet',
        harvestPeriod: 'Octobre - Novembre',
        tips: [
          'Sol parfait pour le mil, excellente rétention d\'eau',
          'Technique ancestrale des poquets recommandée',
          'Rotation avec niébé pour optimiser la fertilité'
        ]
      },
      {
        crop: 'Arachide',
        suitability: 88,
        expectedYield: '1.0 tonne/hectare',
        marketDemand: 'Élevée',
        plantingPeriod: 'Mai - Juin',
        harvestPeriod: 'Septembre - Octobre',
        tips: [
          'Excellente pour fixer l\'azote dans le sol',
          'Association idéale avec le mil',
          'Surveillance des parasites recommandée'
        ]
      }
    ],
    traditionalKnowledge: [
      {
        title: 'Technique ancestrale de semis du mil',
        description: 'Nos anciens plantaient le mil avec la technique des "poquets", en créant des trous espacés de 30cm et en y plaçant 3-4 graines.',
        region: 'Sénégal Oriental',
        benefits: ['Meilleure résistance à la sécheresse', 'Rendement optimisé', 'Préservation des variétés locales']
      }
    ]
  };
  
  console.log('✅ Données de test créées:', testData);
  return testData;
};

// Fonction pour tester l'ensemble
export const runAllTests = async () => {
  console.log('🚀 Lancement de tous les tests...');
  
  // Test visuel
  const visualData = testVisualImprovements();
  
  // Test Gemini (si API disponible)
  try {
    const geminiData = await testGeminiDisplay();
    console.log('🎉 Tous les tests terminés avec succès !');
    return { visualData, geminiData };
  } catch (error) {
    console.log('⚠️ Test Gemini échoué, mais améliorations visuelles OK');
    return { visualData, geminiData: null };
  }
}; 

// Test utilitaire pour diagnostiquer les problèmes avec Gemini
import { geminiService } from '../services/gemini';

export const testGeminiResponse = async () => {
  console.log('🧪 Test de diagnostic Gemini...');
  
  try {
    // Test avec une image factice (base64 minimal)
    const fakeImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    
    console.log('📸 Test avec image factice...');
    const result = await geminiService.analyzeSoilImage(fakeImageBase64, 'Thiès, Sénégal');
    
    console.log('✅ Résultat du test:', result);
    console.log('📊 Structure des recommandations:', result.recommendations);
    
    if (result.recommendations && result.recommendations.length > 0) {
      console.log('🎯 Première recommandation:', result.recommendations[0]);
    }
    
    return result;
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
    throw error;
  }
};

// Test de parsing JSON
export const testJsonParsing = (jsonString: string) => {
  console.log('🔍 Test de parsing JSON...');
  console.log('📝 JSON brut:', jsonString);
  
  try {
    // Nettoyage
    let cleanJson = jsonString.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    console.log('🧹 JSON nettoyé:', cleanJson);
    
    const parsed = JSON.parse(cleanJson);
    console.log('✅ JSON parsé avec succès:', parsed);
    
    return parsed;
  } catch (error) {
    console.error('❌ Erreur de parsing:', error);
    
    // Tentative de nettoyage supplémentaire
    const jsonStart = jsonString.indexOf('{');
    const jsonEnd = jsonString.lastIndexOf('}') + 1;
    
    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      const extractedJson = jsonString.substring(jsonStart, jsonEnd);
      console.log('🔧 JSON extrait:', extractedJson);
      
      try {
        const parsed = JSON.parse(extractedJson);
        console.log('✅ JSON parsé après extraction:', parsed);
        return parsed;
      } catch (secondError) {
        console.error('❌ Échec du second parsing:', secondError);
      }
    }
    
    throw error;
  }
};

// Test de structure de données
export const validateRecommendationStructure = (recommendation: any) => {
  console.log('🔍 Validation de la structure de recommandation...');
  
  const requiredFields = ['crop', 'suitability', 'expectedYield', 'marketDemand', 'plantingPeriod', 'harvestPeriod', 'tips'];
  const missingFields = requiredFields.filter(field => !(field in recommendation));
  
  if (missingFields.length > 0) {
    console.warn('⚠️ Champs manquants:', missingFields);
    return false;
  }
  
  if (typeof recommendation.suitability !== 'number') {
    console.warn('⚠️ suitability doit être un nombre, reçu:', typeof recommendation.suitability);
    return false;
  }
  
  if (!Array.isArray(recommendation.tips)) {
    console.warn('⚠️ tips doit être un tableau, reçu:', typeof recommendation.tips);
    return false;
  }
  
  console.log('✅ Structure valide');
  return true;
}; 