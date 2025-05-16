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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all z-50 flex flex-col">
        {/* Header */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-4 sm:p-6 text-center">
            <div className="absolute top-4 right-4">
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mb-3">
              <PawPrint size={28} className="text-blue-500 sm:size-32" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-1">It's a Match!</h2>
            <p className="text-blue-100 text-sm sm:text-base">
              Meet your perfect canine companion
            </p>
          </div>

          {/* Dog Image */}
          <div className="relative h-48 sm:h-64 w-full">
            <img
              src={dog.img}
              alt={dog.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/400x300?text=Dog+Image+Not+Available';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <Heart size={48} className="text-white opacity-80" />
            </div>
          </div>
        </div>

        {/* Dog details */}
        <div className="p-4 sm:p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{dog.name}</h3>
            <p className="text-gray-600">{dog.breed}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-500">Age</p>
              <p className="font-bold text-gray-800">{dog.age} {dog.age === 1 ? 'year' : 'years'}</p>
            </div>
            <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-500">Location</p>
              <p className="font-bold text-gray-800">{dog.zip_code}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              {dog.name} is waiting for a loving home. Contact the shelter using the ID below to start the adoption process.
            </p>
            <div className="bg-gray-100 p-2 sm:p-3 rounded-lg inline-block">
              <span className="font-mono text-sm text-gray-800">{dog.id}</span>
            </div>
          </div>
        </div>

        {/* Footer / Action */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
