import React from 'react';
import { LoadingSpinnerProps } from '../../types';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-green-600`} />
    </div>
  );
};

export default LoadingSpinner;