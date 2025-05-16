import React from 'react';
import { useQuery } from 'react-query';
import { getDogs, type Dog } from '../services/api';
import { X, Heart, Trash2 } from 'lucide-react';

interface FavoritesListProps {
  favoriteIds: string[];
  onRemoveFavorite: (id: string) => void;
  onGenerateMatch: () => void;
  onClose: () => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ 
  favoriteIds, 
  onRemoveFavorite, 
  onGenerateMatch,
  onClose
}) => {
  const { 
    data: favorites = [], 
    isLoading, 
    isError 
  } = useQuery(
    ['favorites', favoriteIds],
    () => favoriteIds.length ? getDogs(favoriteIds) : Promise.resolve([]),
    { enabled: favoriteIds.length > 0 }
  );
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <Heart size={16} className="mr-1 text-red-500" />
          Favorites ({favoriteIds.length})
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 lg:hidden"
          aria-label="Close favorites"
        >
          <X size={20} />
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 py-4">
          Error loading favorites
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-gray-500 py-8">
          <Heart size={48} className="mb-2" />
          <p>No favorites yet</p>
          <p className="text-sm text-center mt-2">
            Click the heart on a dog's card to add it to your favorites
          </p>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto -mx-4 px-4">
          {favorites.map(dog => (
            <FavoriteItem 
              key={dog.id} 
              dog={dog} 
              onRemove={() => onRemoveFavorite(dog.id)} 
            />
          ))}
        </div>
      )}
      
      {favorites.length > 0 && (
        <div className="pt-4 mt-auto">
          <button
            onClick={onGenerateMatch}
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center"
          >
            Find My Match
          </button>
        </div>
      )}
    </div>
  );
};

interface FavoriteItemProps {
  dog: Dog;
  onRemove: () => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ dog, onRemove }) => {
  return (
    <div className="flex items-center py-2 border-b last:border-0">
      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-3 flex-shrink-0">
        <img 
          src={dog.img} 
          alt={dog.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=Dog';
          }}
        />
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{dog.name}</h4>
        <p className="text-xs text-gray-500 truncate">{dog.breed}</p>
      </div>
      <button 
        onClick={onRemove}
        className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
        aria-label={`Remove ${dog.name} from favorites`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default FavoritesList;