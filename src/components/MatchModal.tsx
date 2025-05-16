import React from 'react';
import { Dog } from '../services/api';
import { X, Heart, PawPrint } from 'lucide-react';

interface MatchModalProps {
  dog: Dog;
  isOpen: boolean;
  onClose: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ dog, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden transform transition-all fade-in">
        <div className="relative">
          {/* Header with confetti background */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-6 text-center">
            <div className="absolute top-4 right-4">
              <button 
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3">
              <PawPrint size={32} className="text-blue-500" />
            </div>
            
            <h2 className="text-2xl font-bold mb-1">It's a Match!</h2>
            <p className="text-blue-100">
              Meet your perfect canine companion
            </p>
          </div>
          
          {/* Dog Image */}
          <div className="relative h-64 w-full">
            <img 
              src={dog.img} 
              alt={dog.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Dog+Image+Not+Available';
              }}
            />
            
            {/* Heart overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <Heart size={64} className="text-white opacity-80" />
            </div>
          </div>
        </div>
        
        {/* Dog details */}
        <div className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{dog.name}</h3>
            <p className="text-gray-600">{dog.breed}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-bold text-gray-800">{dog.age} {dog.age === 1 ? 'year' : 'years'}</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-bold text-gray-800">{dog.zip_code}</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              {dog.name} is waiting for a loving home. Contact the shelter using the ID below to start the adoption process.
            </p>
            <div className="bg-gray-100 p-3 rounded-lg inline-block">
              <span className="font-mono text-sm text-gray-800">{dog.id}</span>
            </div>
          </div>
        </div>
        
        {/* Action button */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;