import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { SearchParams } from '../services/api';

interface FiltersProps {
  breeds: string[];
  searchParams: SearchParams;
  updateSearchParams: (params: Partial<SearchParams>) => void;
  onSortChange: (sort: string) => void;
  onClose: () => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  breeds, 
  searchParams, 
  updateSearchParams,
  onSortChange,
  onClose
}) => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>(searchParams.breeds || []);
  const [minAge, setMinAge] = useState<string>(searchParams.ageMin?.toString() || '');
  const [maxAge, setMaxAge] = useState<string>(searchParams.ageMax?.toString() || '');
  const [zipCode, setZipCode] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>(searchParams.sort || 'breed:asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBreedsList, setShowBreedsList] = useState(false);
  
  // Filter breeds based on search term
  const filteredBreeds = breeds
    .filter(breed => breed.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));
  
  // Apply filters
  const applyFilters = () => {
    const newParams: Partial<SearchParams> = {
      from: 0, // Reset pagination when filters change
    };
    
    if (selectedBreeds.length > 0) {
      newParams.breeds = selectedBreeds;
    }
    
    if (minAge) {
      newParams.ageMin = parseInt(minAge);
    }
    
    if (maxAge) {
      newParams.ageMax = parseInt(maxAge);
    }
    
    if (zipCode) {
      newParams.zipCodes = [zipCode];
    }
    
    updateSearchParams(newParams);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSelectedBreeds([]);
    setMinAge('');
    setMaxAge('');
    setZipCode('');
    setSortOrder('breed:asc');
    setSearchTerm('');
    
    updateSearchParams({
      breeds: undefined,
      ageMin: undefined,
      ageMax: undefined,
      zipCodes: undefined,
      from: 0,
      sort: 'breed:asc'
    });
  };
  
  // Toggle breed selection
  const toggleBreed = (breed: string) => {
    setSelectedBreeds(prev => 
      prev.includes(breed)
        ? prev.filter(b => b !== breed)
        : [...prev, breed]
    );
  };
  
  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOrder(value);
    onSortChange(value);
  };
  
  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [selectedBreeds]);

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <SlidersHorizontal size={16} className="mr-1" />
          Filters
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 lg:hidden"
          aria-label="Close filters"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Sort Order */}
      <div className="mb-4">
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={handleSortChange}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="breed:asc">Breed (A-Z)</option>
          <option value="breed:desc">Breed (Z-A)</option>
          <option value="name:asc">Name (A-Z)</option>
          <option value="name:desc">Name (Z-A)</option>
          <option value="age:asc">Age (Youngest First)</option>
          <option value="age:desc">Age (Oldest First)</option>
        </select>
      </div>
      
      {/* Age Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Age Range
        </label>
        <div className="flex space-x-2">
          <div className="w-1/2">
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="w-1/2">
            <input
              type="number"
              min={minAge ? parseInt(minAge) : 0}
              placeholder="Max"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* ZIP Code */}
      <div className="mb-4">
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
          ZIP Code
        </label>
        <input
          type="text"
          id="zipCode"
          placeholder="Enter ZIP code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
      {/* Breed Selection */}
      <div className="mb-4">
        <div 
          onClick={() => setShowBreedsList(!showBreedsList)}
          className="flex justify-between items-center cursor-pointer py-2 border-b"
        >
          <span className="font-medium text-gray-700">Breed</span>
          {showBreedsList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        
        {showBreedsList && (
          <div className="mt-2">
            <div className="mb-2">
              <input
                type="text"
                placeholder="Search breeds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div className="max-h-48 overflow-y-auto border rounded-md p-1">
              {filteredBreeds.length === 0 ? (
                <div className="text-center py-2 text-gray-500">No breeds found</div>
              ) : (
                filteredBreeds.map(breed => (
                  <div key={breed} className="flex items-center mb-1 last:mb-0">
                    <input
                      type="checkbox"
                      id={`breed-${breed}`}
                      checked={selectedBreeds.includes(breed)}
                      onChange={() => toggleBreed(breed)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`breed-${breed}`}
                      className="ml-2 block text-sm text-gray-700 truncate"
                    >
                      {breed}
                    </label>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              {selectedBreeds.length} breed{selectedBreeds.length !== 1 ? 's' : ''} selected
            </div>
          </div>
        )}
      </div>
      
      {/* Apply/Reset Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;