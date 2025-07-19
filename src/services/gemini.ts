// Service pour l'API Gemini de Google
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

// Validation de la clé API
if (!GEMINI_API_KEY) {
  console.error('⚠️ VITE_GEMINI_API_KEY non définie dans les variables d\'environnement');
  console.error('📝 Créez un fichier .env à la racine du projet avec :');
  console.error('VITE_GEMINI_API_KEY=votre_cle_api_ici');
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface SoilAnalysisPrompt {
  location: string;
  soilType?: string;
  ph?: number;
  nutrients?: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  imageBase64?: string;
}

export interface CropRecommendationPrompt {
  soilData: SoilAnalysisPrompt;
  climate: string;
  season: string;
  marketDemand?: string;
}

export interface InvestmentAnalysisPrompt {
  projectData: {
    title: string;
    description: string;
    cropType: string;
    investmentAmount: number;
    location: string;
    duration: number;
  };
  marketData?: any;
}

export interface StructuredCropRecommendation {
  crop: string;
  suitability: number;
  expectedYield: string;
  marketDemand: string;
  plantingPeriod: string;
  harvestPeriod: string;
  tips: string[];
}

export interface StructuredSoilAnalysis {
  recommendations: StructuredCropRecommendation[];
  analysis: string;
}

class GeminiService {
  private async makeRequest(prompt: string, imageBase64?: string) {
    try {
      // Vérification de la clé API
      if (!GEMINI_API_KEY) {
        throw new Error('Clé API Gemini non configurée');
      }

      const requestBody: any = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      };

      // Ajouter l'image si fournie
      if (imageBase64) {
        requestBody.contents[0].parts.push({
          inline_data: {
            mime_type: "image/jpeg",
            data: imageBase64
          }
        });
      }

      console.log('🤖 Envoi de requête à Gemini API...');
      
      // Essayer d'abord avec gemini-1.5-flash
      let response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      // Si ça ne marche pas, essayer avec gemini-pro
      if (!response.ok) {
        console.log('🔄 Tentative avec gemini-pro...');
        const fallbackUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
        response = await fetch(`${fallbackUrl}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur Gemini API:', response.status, errorText);
        throw new Error(`Erreur Gemini API (${response.status}): ${errorText}`);
      }

      const data: GeminiResponse = await response.json();
      const result = data.candidates[0]?.content?.parts[0]?.text || 'Aucune réponse générée';
      
      console.log('✅ Réponse Gemini reçue');
      return result;
    } catch (error) {
      console.error('❌ Erreur Gemini API:', error);
      throw error;
    }
  }

  // Analyse de sol avec IA
  async analyzeSoil(prompt: SoilAnalysisPrompt): Promise<string> {
    const systemPrompt = `Tu es un expert agronome spécialisé dans l'analyse de sol et les cultures africaines. 
    
    Analyse les données suivantes et fournis des recommandations détaillées :
    
    Localisation: ${prompt.location}
    Type de sol: ${prompt.soilType || 'Non spécifié'}
    pH: ${prompt.ph || 'Non mesuré'}
    Nutriments: ${prompt.nutrients ? `N: ${prompt.nutrients.nitrogen}, P: ${prompt.nutrients.phosphorus}, K: ${prompt.nutrients.potassium}` : 'Non mesurés'}
    
    Fournis une analyse structurée avec :
    1. Évaluation de la qualité du sol
    2. Cultures recommandées avec pourcentages d'adaptation
    3. Techniques agricoles traditionnelles locales
    4. Recommandations de fertilisation
    5. Conseils pour améliorer la productivité
    
    Réponds en français et sois spécifique au contexte africain.`;

    return this.makeRequest(systemPrompt, prompt.imageBase64);
  }

  // Recommandations de cultures
  async getCropRecommendations(prompt: CropRecommendationPrompt): Promise<string> {
    const systemPrompt = `En tant qu'expert en agriculture africaine, recommande les meilleures cultures pour :
    
    Localisation: ${prompt.soilData.location}
    Climat: ${prompt.climate}
    Saison: ${prompt.season}
    Données du sol: ${JSON.stringify(prompt.soilData)}
    
    Fournis :
    1. Top 5 cultures recommandées avec pourcentages d'adaptation
    2. Rendements attendus
    3. Périodes de plantation et récolte
    4. Techniques traditionnelles locales
    5. Analyse de marché et rentabilité
    6. Conseils pratiques pour chaque culture
    
    Sois précis et utilise les connaissances locales africaines.`;

    return this.makeRequest(systemPrompt);
  }

  // Analyse d'investissement
  async analyzeInvestment(prompt: InvestmentAnalysisPrompt): Promise<string> {
    const systemPrompt = `Tu es un expert en finance agricole et investissement. 
    
    Analyse ce projet d'investissement agricole :
    
    ${JSON.stringify(prompt.projectData, null, 2)}
    
    Fournis une analyse complète :
    1. Évaluation des risques (faible/moyen/élevé)
    2. Potentiel de rendement
    3. Analyse de marché
    4. Recommandations d'amélioration
    5. Comparaison avec des projets similaires
    6. Conseils pour optimiser l'investissement
    
    Sois réaliste et utilise des données du marché africain.`;

    return this.makeRequest(systemPrompt);
  }

  // Conseils personnalisés
  async getPersonalizedAdvice(userQuery: string, context: any): Promise<string> {
    const systemPrompt = `Tu es l'assistant IA de TerraNobis, une plateforme agricole africaine.
    
    Contexte utilisateur: ${JSON.stringify(context)}
    Question: ${userQuery}
    
    Fournis des conseils personnalisés, pratiques et adaptés au contexte africain.
    Utilise les savoirs ancestraux et les techniques modernes.
    Sois encourageant et motivant.`;

    return this.makeRequest(systemPrompt);
  }

  // Analyse d'image de sol avec recommandations structurées
  async analyzeSoilImage(imageBase64: string, location: string): Promise<StructuredSoilAnalysis> {
    const systemPrompt = `Tu es un expert en analyse visuelle de sol et en agriculture africaine.
    
    Analyse cette image de sol prise à ${location}.
    
    IMPORTANT: Tu dois répondre UNIQUEMENT au format JSON suivant, sans texte avant ou après :
    {
      "analysis": "Analyse détaillée et professionnelle du sol avec observations visuelles, texture, couleur, structure et qualité générale. Inclus des recommandations d'amélioration spécifiques.",
      "recommendations": [
        {
          "crop": "Nom de la culture",
          "suitability": 85,
          "expectedYield": "1.2 tonnes/hectare",
          "marketDemand": "Élevée",
          "plantingPeriod": "Juin - Juillet",
          "harvestPeriod": "Octobre - Novembre",
          "tips": [
            "Conseil pratique détaillé et spécifique",
            "Technique ancestrale adaptée",
            "Recommandation d'amélioration du sol"
          ]
        }
      ]
    }
    
    Règles strictes :
    - suitability doit être un nombre entre 0 et 100
    - Fournis 3-5 cultures recommandées adaptées au contexte africain
    - Sois spécifique au contexte local et utilise les connaissances traditionnelles
    - Inclus des conseils pratiques et détaillés
    - L'analyse doit être professionnelle et encourageante
    - Réponds UNIQUEMENT en JSON valide, sans markdown, sans code blocks
    - Ne mets pas de backticks ou de blocs de code autour de ta réponse
    `;

    try {
      console.log('🤖 Envoi de requête d\'analyse d\'image à Gemini...');
      const response = await this.makeRequest(systemPrompt, imageBase64);
      
      console.log('📝 Réponse brute de Gemini:', response);
      
      // Nettoyer la réponse pour enlever les markdown si présents
      let cleanResponse = response.trim();
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      console.log('🧹 Réponse nettoyée:', cleanResponse);
      
      // Essayer de parser la réponse JSON
      try {
        const parsed = JSON.parse(cleanResponse);
        console.log('✅ JSON parsé avec succès:', parsed);
        
        // Valider la structure
        if (!parsed.recommendations || !Array.isArray(parsed.recommendations)) {
          throw new Error('Structure recommendations invalide');
        }
        
        return {
          analysis: parsed.analysis || "Analyse de sol effectuée avec succès",
          recommendations: parsed.recommendations.map((rec: any) => ({
            crop: rec.crop || 'Culture non spécifiée',
            suitability: typeof rec.suitability === 'number' ? rec.suitability : 75,
            expectedYield: rec.expectedYield || '1.0 tonnes/hectare',
            marketDemand: rec.marketDemand || 'Moyenne',
            plantingPeriod: rec.plantingPeriod || 'Juin - Juillet',
            harvestPeriod: rec.harvestPeriod || 'Octobre - Novembre',
            tips: Array.isArray(rec.tips) ? rec.tips : ['Conseils en cours de développement']
          }))
        };
      } catch (parseError) {
        console.error('❌ Erreur parsing JSON Gemini:', parseError);
        console.log('🔍 Tentative de nettoyage supplémentaire...');
        
        // Tentative de nettoyage supplémentaire
        let cleanedResponse = cleanResponse;
        // Enlever les caractères non-JSON au début et à la fin
        const jsonStart = cleanedResponse.indexOf('{');
        const jsonEnd = cleanedResponse.lastIndexOf('}') + 1;
        if (jsonStart !== -1 && jsonEnd > jsonStart) {
          cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd);
          console.log('🔧 Réponse après nettoyage supplémentaire:', cleanedResponse);
          
          try {
            const parsed = JSON.parse(cleanedResponse);
            console.log('✅ JSON parsé après nettoyage:', parsed);
            return {
              analysis: parsed.analysis || "Analyse de sol effectuée",
              recommendations: parsed.recommendations || []
            };
          } catch (secondParseError) {
            console.error('❌ Échec du second parsing:', secondParseError);
          }
        }
        
        // Fallback : recommandations par défaut avec la réponse brute comme analyse
        console.log('🔄 Utilisation du fallback avec recommandations par défaut');
        return {
          analysis: `Analyse de sol pour ${location}: ${cleanResponse}`,
          recommendations: [
            {
              crop: 'Mil',
              suitability: 92,
              expectedYield: '1.2 tonnes/hectare',
              marketDemand: 'Élevée',
              plantingPeriod: 'Juin - Juillet',
              harvestPeriod: 'Octobre - Novembre',
              tips: [
                'Ajouter du compost organique pour améliorer la structure',
                'Planter après les premières pluies',
                'Espacement recommandé: 30cm entre les plants'
              ]
            },
            {
              crop: 'Arachide',
              suitability: 88,
              expectedYield: '0.8 tonnes/hectare',
              marketDemand: 'Très élevée',
              plantingPeriod: 'Mai - Juin',
              harvestPeriod: 'Septembre - Octobre',
              tips: [
                'Excellente pour fixer l\'azote dans le sol',
                'Rotation idéale avec le mil',
                'Surveillez les parasites pendant la croissance'
              ]
            },
            {
              crop: 'Maïs',
              suitability: 75,
              expectedYield: '2.5 tonnes/hectare',
              marketDemand: 'Moyenne',
              plantingPeriod: 'Juin - Juillet',
              harvestPeriod: 'Octobre - Novembre',
              tips: [
                'Nécessite un apport en fertilisant',
                'Arrosage régulier requis',
                'Buttage recommandé à 6 semaines'
              ]
            }
          ]
        };
      }
    } catch (error) {
      console.error('❌ Erreur analyse image Gemini:', error);
      throw error;
    }
  }

  // Prévisions météo et conseils
  async getWeatherAdvice(location: string, season: string): Promise<string> {
    const systemPrompt = `En tant qu'expert météo agricole africain, fournis des conseils pour :
    
    Localisation: ${location}
    Saison: ${season}
    
    Donne :
    1. Prévisions météo générales
    2. Conseils de plantation
    3. Gestion de l'irrigation
    4. Protection des cultures
    5. Techniques traditionnelles de prévision météo
    
    Adapte tes conseils au contexte local africain.`;

    return this.makeRequest(systemPrompt);
  }
}

export const geminiService = new GeminiService(); 