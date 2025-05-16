import axios from 'axios';

const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

// Configure axios with credentials and CORS
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle image URLs
api.interceptors.response.use(response => {
  // If the response contains dog data, ensure the image URLs are properly handled
  if (response.data && Array.isArray(response.data)) {
    response.data = response.data.map(dog => {
      if (dog.img) {
        // Add a timestamp to prevent caching
        const timestamp = Date.now();
        dog.img = `${dog.img}${dog.img.includes('?') ? '&' : '?'}t=${timestamp}`;
      }
      return dog;
    });
  }
  return response;
});

// Types
export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface SearchResults {
  resultIds: string[];
  total: number;
  next: string | null;
  prev: string | null;
}

export interface SearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}

// Authentication
export const login = async (name: string, email: string) => {
  try {
    const response = await api.post('/auth/login', { name, email });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Failed to login. Please check your credentials and try again.');
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to logout. Please try again.');
  }
};

// Dog Data
export const getBreeds = async (): Promise<string[]> => {
  try {
    const response = await api.get('/dogs/breeds');
    return response.data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw new Error('Failed to fetch breeds. Please try again.');
  }
};

export const searchDogs = async (params: SearchParams): Promise<SearchResults> => {
  try {
    const response = await api.get('/dogs/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching dogs:', error);
    throw new Error('Failed to search dogs. Please try again.');
  }
};

export const getDogs = async (dogIds: string[]): Promise<Dog[]> => {
  try {
    const response = await api.post('/dogs', dogIds);
    return response.data;
  } catch (error) {
    console.error('Error fetching dogs:', error);
    throw new Error('Failed to fetch dogs. Please try again.');
  }
};

export const getMatch = async (dogIds: string[]): Promise<{ match: string }> => {
  try {
    const response = await api.post('/dogs/match', dogIds);
    return response.data;
  } catch (error) {
    console.error('Error getting match:', error);
    throw new Error('Failed to get a match. Please try again.');
  }
};