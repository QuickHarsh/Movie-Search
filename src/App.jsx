import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';
import Button from './Components/Button';
import Input from './Components/Input';
import Card from './Components/Card';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function App() {
  const [movieData, setMovieData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeMediaQuery.matches);
    
    const handleChange = (e) => setIsDark(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=4a3b711b`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        setSuggestions(data.Search.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      setSuggestions([]);
    }
  };

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setShowSuggestions(false);
    
    try {
      const response = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=4a3b711b`);
      const data = await response.json();
      
      if (data.Response === 'False') {
        setError(data.Error);
        setMovieData(null);
      } else {
        setMovieData(data);
        setSearchHistory(prev => {
          const newHistory = [query, ...prev.filter(item => item !== query)].slice(0, 5);
          return newHistory;
        });
      }
    } catch (err) {
      setError('An error occurred while fetching the movie data');
      setMovieData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.Title);
    setShowSuggestions(false);
    handleSearch(suggestion.Title);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-6xl px-6">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6"
            >
              Movie Search
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-400 text-xl"
            >
              Search for your favorite movies and get detailed information
            </motion.p>
          </motion.header>

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-full max-w-3xl mb-12">
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <div className="relative w-full sm:w-96">
                  <Input
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Enter movie title..."
                    className="w-full"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                    >
                      {suggestions.map((suggestion) => (
                        <motion.div
                          key={suggestion.imdbID}
                          whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                          className="px-4 py-3 cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex items-center gap-3">
                            {suggestion.Poster !== 'N/A' && (
                              <img
                                src={suggestion.Poster}
                                alt={suggestion.Title}
                                className="w-10 h-15 object-cover rounded"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {suggestion.Title}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {suggestion.Year}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
                <Button onClick={() => handleSearch()} disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-xl mb-12 p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl shadow-lg text-center backdrop-blur-sm"
                >
                  {error}
                </motion.div>
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center h-64"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-400">Loading...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {movieData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="w-full max-w-4xl"
                >
                  <Card movieData={movieData} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </div>
      </div>
    </div>
  );
}

export default App;
