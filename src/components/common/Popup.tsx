import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PopupProps } from '../../types';
import ReactDOM from 'react-dom';

const Popup: React.FC<PopupProps> = React.memo(({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  size = 'md' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsVisible(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'unset';
      }, 200); // Durée de l'animation de sortie

      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  if (!isVisible) return null;

  // Utilise un Portal pour rendre le modal en dehors du flux principal du DOM
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto" key={isOpen ? 'open' : 'closed'}>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-all duration-200 ${
          isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden transition-all duration-200 transform ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

Popup.displayName = 'Popup';

export default Popup; 