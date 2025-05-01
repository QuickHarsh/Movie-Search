import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Input = ({ value, onChange, placeholder, className = '' }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative w-full ${className}`}
    >
      <motion.div
        className={`relative flex items-center w-full transition-all duration-300 ${
          isFocused ? 'ring-2 ring-indigo-500' : ''
        }`}
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <MagnifyingGlassIcon className="h-6 w-6 text-indigo-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 text-base bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-2 border-indigo-100 dark:border-gray-700 rounded-xl shadow-lg focus:outline-none focus:ring-0 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 hover:bg-white dark:hover:bg-gray-800"
        />
      </motion.div>
    </motion.div>
  );
};

export default Input;
