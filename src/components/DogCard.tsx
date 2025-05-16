import React from 'react';
import { Heart } from 'lucide-react';
import { Dog } from '../services/api';

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, isFavorite, onToggleFavorite }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md border p-4 bg-white">
      <img
        src={dog.img}
        alt={dog.name}
        className="w-full h-48 object-cover rounded-md mb-3"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=Dog';
        }}
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:bg-red-100'
        }`}
        aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
      >
        <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
      </button>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{dog.name}</h3>
      <p className="text-sm text-gray-500">{dog.breed}</p>
      <div className="mt-2 flex items-center text-sm">
        <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full text-xs mr-2">{dog.age} years</span>
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md">📍 {dog.zip_code}</span>
      </div>
    </div>
  );
};

export default DogCard;
