import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Message, Conversation } from '../../types';
import { 
  Send, 
  Search, 
  Plus, 
  MoreVertical,
  Paperclip,
  Smile
} from 'lucide-react';

const Messages: React.FC = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Mamadou Sow',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      lastMessage: 'Merci pour votre investissement dans mon projet !',
      lastMessageTime: '10:30',
      unreadCount: 2,
      online: true,
      role: 'Agriculteur'
    },
    {
      id: '2',
      name: 'Aïssatou Ba',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      lastMessage: 'Pouvez-vous m\'envoyer plus d\'informations sur le miel ?',
      lastMessageTime: '09:15',
      unreadCount: 0,
      online: false,
      role: 'Acheteur'
    },
    {
      id: '3',
      name: 'Fatou Ndiaye',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      lastMessage: 'Votre formation sur l\'agriculture bio était excellente',
      lastMessageTime: 'Hier',
      unreadCount: 1,
      online: true,
      role: 'Agriculteur'
    },
    {
      id: '4',
      name: 'Support TerraNobis',
      avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      lastMessage: 'Nous avons résolu votre problème de paiement',
      lastMessageTime: '2 jours',
      unreadCount: 0,
      online: true,
      role: 'Support'
    }
  ];

  // Mock messages for selected conversation
  const messages: Message[] = [
    {
      id: '1',
      senderId: '1',
      receiverId: user?.id || '',
      content: 'Bonjour ! J\'ai vu que vous avez investi dans mon projet de culture de mil. Merci beaucoup pour votre confiance !',
      read: true,
      createdAt: '2024-01-20T08:00:00Z'
    },
    {
      id: '2',
      senderId: user?.id || '',
      receiverId: '1',
      content: 'Bonjour Mamadou ! Je suis ravi de soutenir votre projet. Pouvez-vous me tenir informé des progrès ?',
      read: true,
      createdAt: '2024-01-20T08:05:00Z'
    },
    {
      id: '3',
      senderId: '1',
      receiverId: user?.id || '',
      content: 'Bien sûr ! Je vais publier des mises à jour régulières. Le terrain est déjà préparé et nous allons commencer les semis la semaine prochaine.',
      read: true,
      createdAt: '2024-01-20T08:10:00Z'
    },
    {
      id: '4',
      senderId: '1',
      receiverId: user?.id || '',
      content: 'Merci encore pour votre investissement. Cela nous permet de garantir une bonne récolte !',
      read: false,
      createdAt: '2024-01-20T10:30:00Z'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, this would send the message to the API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  return (
    <div className="h-[calc(100vh-200px)] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
              <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une conversation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-purple-50 border-r-2 border-purple-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{conversation.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedConv.avatar}
                        alt={selectedConv.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {selectedConv.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedConv.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedConv.online ? 'En ligne' : 'Hors ligne'} • {selectedConv.role}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === user?.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`text-xs mt-1 ${
                        message.senderId === user?.id ? 'text-purple-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.createdAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Tapez votre message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez une conversation</h3>
                <p className="text-gray-600">Choisissez une conversation pour commencer à échanger</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;