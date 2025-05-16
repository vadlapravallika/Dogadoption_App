import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import DogCard from '../components/DogCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import FavoritesList from '../components/FavoritesList';
import MatchModal from '../components/MatchModal';
import { Heart, Search as SearchIcon, Filter, SlidersHorizontal } from 'lucide-react';
import { getBreeds, searchDogs, getDogs, getMatch, type Dog, type SearchParams } from '../services/api';

const Search = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({ 
    size: 20, 
    sort: 'breed:asc' 
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isGeneratingMatch, setIsGeneratingMatch] = useState(false);
  const queryClient = useQueryClient();

  // Query for breeds
  const { data: breeds = [] } = useQuery('breeds', getBreeds);

  // Query for search results
  const { 
    data: searchResults, 
    isLoading: isSearching,
    isError: searchError,
    refetch: refetchSearch
  } = useQuery(
    ['dogSearch', searchParams], 
    () => searchDogs(searchParams),
    { 
      keepPreviousData: true,
      staleTime: 5000
    }
  );

  // Query for dogs
  const { 
    data: dogs = [], 
    isLoading: isLoadingDogs,
    isError: dogsError
  } = useQuery(
    ['dogs', searchResults?.resultIds], 
    () => getDogs(searchResults?.resultIds || []),
    { 
      enabled: !!searchResults?.resultIds,
      keepPreviousData: true,
      staleTime: 5000
    }
  );

  // Handle favorites toggle
  const toggleFavorite = useCallback((dogId: string) => {
    setFavorites(prev => 
      prev.includes(dogId) 
        ? prev.filter(id => id !== dogId) 
        : [...prev, dogId]
    );
  }, []);

  // Generate a match
  const generateMatch = useCallback(async () => {
    if (favorites.length === 0) return;
    
    setIsGeneratingMatch(true);
    try {
      const result = await getMatch(favorites);
      const matchedDogData = await getDogs([result.match]);
      setMatchedDog(matchedDogData[0]);
      setIsMatchModalOpen(true);
    } catch (error) {
      console.error("Error generating match:", error);
    } finally {
      setIsGeneratingMatch(false);
    }
  }, [favorites]);

  // Update search parameters
  const updateSearchParams = useCallback((newParams: Partial<SearchParams>) => {
    setSearchParams(prev => ({ ...prev, ...newParams }));
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((sortOption: string) => {
    updateSearchParams({ sort: sortOption });
  }, [updateSearchParams]);

  // Handle pagination
  const goToNextPage = useCallback(() => {
    if (searchResults?.next) {
      const nextParams = new URLSearchParams(searchResults.next.split('?')[1]);
      updateSearchParams({ from: parseInt(nextParams.get('from') || '0') });
    }
  }, [searchResults, updateSearchParams]);

  const goToPrevPage = useCallback(() => {
    if (searchResults?.prev) {
      const prevParams = new URLSearchParams(searchResults.prev.split('?')[1]);
      updateSearchParams({ from: parseInt(prevParams.get('from') || '0') });
    }
  }, [searchResults, updateSearchParams]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-[calc(100vh-64px)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Find Your Perfect Dog</h1>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-md border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            <Filter size={18} className="mr-1" />
            <span className="hidden sm:inline">Filters</span>
          </button>
          
          <button 
            onClick={() => setShowFavorites(!showFavorites)}
            className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-md border border-blue-200 hover:bg-blue-50 transition-colors relative"
          >
            <Heart size={18} className="mr-1" />
            <span className="hidden sm:inline">Favorites</span>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </button>
          
          <button 
            onClick={generateMatch}
            disabled={favorites.length === 0 || isGeneratingMatch}
            className={`flex items-center px-4 py-2 rounded-md border transition-colors ${
              favorites.length > 0 
                ? 'bg-teal-600 text-white border-teal-700 hover:bg-teal-700' 
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
          >
            {isGeneratingMatch ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <>
                <span className="mr-1">Find Match</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Filter sidebar for larger screens, modal for mobile */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {showFilters && (
          <div className="w-full lg:w-64 bg-white rounded-lg shadow-md p-4 mb-4 lg:mb-0 fade-in">
            <Filters 
              breeds={breeds}
              searchParams={searchParams}
              updateSearchParams={updateSearchParams}
              onSortChange={handleSortChange}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )}
        
        <div className="flex-grow">
          {/* Main content with dog cards */}
          {isSearching || isLoadingDogs ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="loading-spinner mb-4"></div>
              <p className="text-gray-600">Fetching dogs...</p>
            </div>
          ) : searchError || dogsError ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-medium">Error loading dogs</p>
              <p className="text-sm">Please try again or refresh the page.</p>
            </div>
          ) : dogs.length === 0 ? (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-12 rounded-lg text-center">
              <SearchIcon size={48} className="mx-auto mb-4 text-blue-400" />
              <p className="text-xl font-medium mb-2">No dogs found</p>
              <p className="text-blue-600">Try adjusting your filters or search for different breeds.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dogs.map(dog => (
                  <DogCard 
                    key={dog.id}
                    dog={dog}
                    isFavorite={favorites.includes(dog.id)}
                    onToggleFavorite={() => toggleFavorite(dog.id)}
                  />
                ))}
              </div>
              
              {searchResults && (
                <Pagination 
                  currentPage={Math.floor((searchParams.from || 0) / (searchParams.size || 20)) + 1}
                  totalResults={searchResults.total}
                  pageSize={searchParams.size || 20}
                  hasNext={!!searchResults.next}
                  hasPrevious={!!searchResults.prev}
                  onNextPage={goToNextPage}
                  onPreviousPage={goToPrevPage}
                />
              )}
            </>
          )}
        </div>
        
        {/* Favorites sidebar */}
        {showFavorites && (
          <div className="w-full lg:w-64 bg-white rounded-lg shadow-md p-4 order-first lg:order-last fade-in">
            <FavoritesList 
              favoriteIds={favorites}
              onRemoveFavorite={toggleFavorite}
              onGenerateMatch={generateMatch}
              onClose={() => setShowFavorites(false)}
            />
          </div>
        )}
      </div>
      
      {/* Match Modal */}
      {matchedDog && (
        <MatchModal 
          dog={matchedDog}
          isOpen={isMatchModalOpen}
          onClose={() => setIsMatchModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Search;