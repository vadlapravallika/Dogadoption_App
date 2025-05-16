import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PawPrint } from 'lucide-react';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/search');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      await login(name, email);
      navigate('/search');
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fetch-navy via-fetch-blue to-fetch-lightBlue py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8 transform hover:scale-[1.01] transition-all duration-300">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-fetch-orange to-fetch-red rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-20 w-20 bg-gradient-to-br from-fetch-orange to-fetch-red rounded-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-all duration-300">
                <PawPrint size={40} className="text-white transform -rotate-12 group-hover:rotate-0 transition-all duration-300" />
              </div>
            </div>
          </div>
          <h2 className="mt-8 text-4xl font-extrabold bg-gradient-to-r from-fetch-navy to-fetch-blue bg-clip-text text-transparent">Welcome to Fetch</h2>
          <p className="mt-3 text-fetch-blue">
            Find your perfect companion today
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-fetch-red p-4 rounded-md" role="alert">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-fetch-red" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-fetch-red">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-fetch-navy">
                Name
              </label>
              <div className="mt-1 relative group">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3 border-2 border-fetch-lightBlue rounded-xl text-fetch-navy placeholder-fetch-blue/50 focus:outline-none focus:ring-2 focus:ring-fetch-orange focus:border-transparent transition-all duration-200 bg-fetch-cream/50"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-fetch-orange to-fetch-red opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-fetch-navy">
                Email
              </label>
              <div className="mt-1 relative group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-4 py-3 border-2 border-fetch-lightBlue rounded-xl text-fetch-navy placeholder-fetch-blue/50 focus:outline-none focus:ring-2 focus:ring-fetch-orange focus:border-transparent transition-all duration-200 bg-fetch-cream/50"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-fetch-orange to-fetch-red opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-fetch-orange to-fetch-red hover:from-fetch-red hover:to-fetch-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fetch-orange transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PawPrint size={16} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-200" />
                  </span>
                  <span className="text-base font-semibold">Find Your Perfect Match</span>
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-fetch-blue">
            By signing in, you agree to our{' '}
            <a href="#" className="font-medium text-fetch-orange hover:text-fetch-red transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;