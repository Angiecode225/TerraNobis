import React, { useState, useRef, useEffect } from 'react';
import { AIMessage } from '../../types';
import { 
  MessageCircle, 
  Send, 
  X, 
  Brain, 
  Minimize2, 
  Maximize2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import { geminiService } from '../../services/gemini';
import { useNotifications } from '../common/NotificationManager';
import { testGeminiConnection, listAvailableModels } from '../../utils/testGemini';

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onToggle }) => {
  const { showSuccess, showError } = useNotifications();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Bonjour ! Je suis votre assistant IA TerraNobis, alimenté par Google Gemini. Je peux vous aider avec l\'analyse de sol, les recommandations de cultures, les investissements agricoles et bien plus. Comment puis-je vous assister aujourd\'hui ?',
      timestamp: new Date(),
      suggestions: [
        'Analyser mon sol',
        'Recommander des cultures',
        'Trouver des investissements',
        'Conseils de plantation'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [useGemini, setUseGemini] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<AIMessage> => {
    if (useGemini) {
      try {
        const context = {
          userType: 'agriculteur',
          platform: 'TerraNobis',
          location: 'Afrique de l\'Ouest'
        };
        
        const geminiResponse = await geminiService.getPersonalizedAdvice(userMessage, context);
        
        // Limiter la longueur de la réponse pour éviter le scroll
        const maxLength = 300;
        const truncatedResponse = geminiResponse.length > maxLength 
          ? geminiResponse.substring(0, maxLength) + '...'
          : geminiResponse;
        
        // Analyser le contexte de la réponse de Gemini pour adapter les suggestions
        const lowerResponse = geminiResponse.toLowerCase();
        let suggestions: string[] = [];
        
        if (lowerResponse.includes('image') || lowerResponse.includes('photo') || lowerResponse.includes('fausse') || lowerResponse.includes('fake') || lowerResponse.includes('générée') || lowerResponse.includes('artificielle')) {
          // Si Gemini parle d'images/photos (surtout si fausses), proposer des actions liées aux vraies images
          suggestions = [
            'Analyser une vraie photo de sol',
            'Prendre une photo de ma culture',
            'Diagnostic visuel de maladie',
            'Estimer le rendement par photo'
          ];
        } else if (lowerResponse.includes('ne peut pas') || lowerResponse.includes('impossible') || lowerResponse.includes('pas d\'image') || lowerResponse.includes('aucune image')) {
          // Si Gemini indique qu'il ne peut pas faire quelque chose, proposer des alternatives
          suggestions = [
            'Envoyer une vraie photo',
            'Décrire ma situation',
            'Poser une question textuelle',
            'Utiliser les outils d\'analyse'
          ];
        } else if (lowerResponse.includes('sol') || lowerResponse.includes('terre') || lowerResponse.includes('analyse')) {
          // Si Gemini parle de sol, proposer des actions liées au sol
          suggestions = [
            'Analyser une photo de sol',
            'Voir les cultures adaptées',
            'Conseils d\'amendement',
            'Techniques ancestrales'
          ];
        } else if (lowerResponse.includes('culture') || lowerResponse.includes('plante') || lowerResponse.includes('semis')) {
          // Si Gemini parle de cultures, proposer des actions liées aux cultures
          suggestions = [
            'Calendrier de plantation',
            'Techniques ancestrales',
            'Rotation des cultures',
            'Gestion des parasites'
          ];
        } else if (lowerResponse.includes('investir') || lowerResponse.includes('financement') || lowerResponse.includes('roi')) {
          // Si Gemini parle d'investissement, proposer des actions liées aux investissements
          suggestions = [
            'Voir projets disponibles',
            'Calculer ROI',
            'Évaluer les risques',
            'Diversifier portfolio'
          ];
        } else {
          // Suggestions par défaut si le contexte n'est pas clair
          suggestions = [
            'Analyser mon sol',
            'Recommander des cultures', 
            'Trouver des investissements',
            'Conseils de plantation'
          ];
        }
        
        // Debug: afficher les suggestions générées
        console.log('Suggestions générées pour Gemini:', suggestions);
        
        return {
          id: Date.now().toString(),
          type: 'ai',
          content: truncatedResponse,
          timestamp: new Date(),
          suggestions
        };
      } catch (error) {
        showError('Erreur IA', 'Impossible de contacter l\'IA Gemini');
        // Fallback to local response
      }
    }

    // Local fallback response
    const lowerMessage = userMessage.toLowerCase();
    
    let response = '';
    let suggestions: string[] = [];

    if (lowerMessage.includes('sol') || lowerMessage.includes('terre') || lowerMessage.includes('analyse')) {
      response = `🌱 **Analyse de Sol IA**

Pour une analyse précise de votre sol, je peux vous aider à :

• **Identifier le type de sol** - Argileux, sableux, limoneux
• **Mesurer le pH** - Optimal entre 6.0 et 7.5
• **Évaluer les nutriments** - Azote, phosphore, potassium
• **Recommander des amendements** - Compost, chaux, fertilisants

Pouvez-vous me dire votre région et type de culture envisagé ?`;
      
      suggestions = ['Analyser une photo de sol', 'Voir les cultures adaptées', 'Conseils d\'amendement', 'Techniques ancestrales'];
    }
    else if (lowerMessage.includes('culture') || lowerMessage.includes('plante') || lowerMessage.includes('semer')) {
      response = `🌾 **Recommandations de Cultures IA**

**Cultures adaptées au Sahel :**
• **Mil** - Résistant à la sécheresse, 1.2T/ha
• **Sorgho** - Adapté aux sols pauvres
• **Arachide** - Fixe l'azote, rotation idéale
• **Niébé** - Légumineuse nutritive

**Période :** Juin-Juillet (hivernage)
**Techniques :** Semis en poquets, association mil-niébé

Quelle est votre superficie et région ?`;
      
      suggestions = ['Calendrier de plantation', 'Techniques ancestrales', 'Rotation des cultures', 'Gestion des parasites'];
    }
    else if (lowerMessage.includes('investir') || lowerMessage.includes('investissement') || lowerMessage.includes('financement')) {
      response = `💰 **Conseils d'Investissement Agricole IA**

**Projets à fort potentiel :**
• **Mil Bio (Thiès)** - ROI 22%, Risque faible
• **Élevage Avicole (Fatick)** - ROI 28%, Marché garanti
• **Maraîchage Urbain (Dakar)** - ROI 25%, Proximité marché

**Critères IA :** Viabilité technique, Demande marché, Expérience agriculteur

Quel montant et secteur d'investissement ?`;
      
      suggestions = ['Voir projets disponibles', 'Calculer ROI', 'Évaluer les risques', 'Diversifier portfolio'];
    }
    else if (lowerMessage.includes('météo') || lowerMessage.includes('climat') || lowerMessage.includes('pluie')) {
      response = `🌤️ **Prévisions Climatiques IA**

Analyse météorologique pour l'agriculture :

**Prévisions 7 jours :**
• Température : 28-35°C
• Humidité : 65-80%
• Précipitations : 15mm attendues
• Vent : 12 km/h SO

**Recommandations :**
🌱 Période favorable pour le semis
💧 Irrigation recommandée dans 3 jours
🌾 Surveillance des parasites après la pluie

**Alerte IA :** Conditions optimales pour la plantation de mil dans les 48h prochaines.`;
      
      suggestions = ['Prévisions 15 jours', 'Alertes météo', 'Calendrier irrigation', 'Impact sur cultures'];
    }
    else if (lowerMessage.includes('marché') || lowerMessage.includes('prix') || lowerMessage.includes('vendre')) {
      response = `📈 **Analyse de Marché IA**

Tendances des prix agricoles actuelles :

**Prix moyens (FCFA/kg) :**
• Mil : 1,500 (+12% vs mois dernier)
• Arachide : 2,200 (stable)
• Tomate : 800 (-5% saisonnier)
• Oignon : 1,200 (+8%)

**Opportunités de vente :**
🎯 **Forte demande** : Mil bio, œufs frais
📊 **Marché stable** : Arachides, miel
⚠️ **Surplus saisonnier** : Tomates, légumes verts

**Conseil IA :** Moment optimal pour vendre le mil, attendre pour les tomates.`;
      
      suggestions = ['Prévisions prix', 'Meilleurs acheteurs', 'Stratégie vente', 'Certification bio'];
    }
    else if (lowerMessage.includes('formation') || lowerMessage.includes('apprendre') || lowerMessage.includes('cours')) {
      response = `📚 **Formations Personnalisées IA**

Recommandations basées sur votre profil :

**Formations gratuites recommandées :**
• **Techniques Ancestrales du Mil** - 2h, Débutant
• **Agriculture Biologique** - 1.5h, Certification
• **Gestion de l'Eau** - 2.5h, Intermédiaire

**Parcours suggéré :**
1️⃣ Bases de l'agriculture durable
2️⃣ Techniques spécifiques à votre culture
3️⃣ Gestion financière agricole
4️⃣ Marketing et vente

**Certification disponible** après completion du parcours.`;
      
      suggestions = ['Commencer formation', 'Voir certifications', 'Planning personnalisé', 'Formations premium'];
    }
    else {
      response = `🤖 **Assistant IA TerraNobis**

Je suis là pour vous accompagner dans tous vos projets agricoles ! Je peux vous aider avec :

🌱 **Diagnostic agricole** - Analyse de sol, recommandations de cultures
💰 **Investissements** - Évaluation de projets, calcul de ROI
🛒 **Marketplace** - Conseils de vente, analyse de marché
📚 **Formations** - Parcours personnalisés, certifications
🌤️ **Météo agricole** - Prévisions, alertes, calendrier cultural

Posez-moi une question spécifique ou choisissez un sujet ci-dessous !`;
      
      suggestions = ['Analyser mon sol', 'Recommander des cultures', 'Trouver des investissements', 'Formations disponibles'];
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      
      if (useGemini) {
        showSuccess('IA Gemini', 'Réponse générée par Google Gemini');
      }
    } catch (error) {
      showError('Erreur IA', 'Impossible de générer une réponse');
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Implement speech recognition here
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    // Implement text-to-speech here
  };

  const testGemini = async () => {
    try {
      showInfo('Test Gemini', 'Test de connexion en cours...');
      const result = await testGeminiConnection();
      if (result && result.success) {
        showSuccess('Test Gemini', `Connexion réussie avec ${result.model}`);
        console.log('✅ Test Gemini réussi:', result);
      } else {
        showError('Test Gemini', 'Échec de la connexion');
        console.log('❌ Test Gemini échoué:', result);
      }
    } catch (error) {
      showError('Test Gemini', 'Erreur lors du test');
      console.error('❌ Erreur test Gemini:', error);
    }
  };

  const listModels = async () => {
    try {
      showInfo('Liste des modèles', 'Récupération des modèles disponibles...');
      const models = await listAvailableModels();
      if (models) {
        showSuccess('Modèles disponibles', `${models.length} modèles trouvés`);
        console.log('📋 Modèles:', models);
      } else {
        showError('Liste des modèles', 'Impossible de récupérer les modèles');
      }
    } catch (error) {
      showError('Liste des modèles', 'Erreur lors de la récupération');
      console.error('❌ Erreur liste modèles:', error);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 animate-pulse"
      >
        <Brain className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[480px]'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="h-6 w-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Assistant IA TerraNobis</h3>
            <p className="text-xs text-green-100 flex items-center">
              {useGemini ? (
                <>
                  <Sparkles className="h-3 w-3 mr-1" />
                  Alimenté par Google Gemini
                </>
              ) : (
                'En ligne • Prêt à vous aider'
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {useGemini && (
            <>
              <button
                onClick={testGemini}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                title="Tester Gemini"
              >
                <Sparkles className="h-4 w-4" />
              </button>
              <button
                onClick={listModels}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                title="Lister les modèles"
              >
                <Brain className="h-4 w-4" />
              </button>
            </>
          )}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 h-[280px]">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {/* Suggestions */}
            {messages.length > 0 && messages[messages.length - 1].suggestions && (
              <div className="flex flex-wrap gap-1 mt-2">
                {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs hover:bg-green-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleVoice}
                className={`p-1.5 rounded-lg transition-colors ${
                  isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isListening ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
              </button>
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question à l'IA..."
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-sm"
                  rows={1}
                />
              </div>
              <button
                onClick={toggleSpeech}
                className={`p-1.5 rounded-lg transition-colors ${
                  isSpeaking ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="p-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistant;