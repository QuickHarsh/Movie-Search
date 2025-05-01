import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Button = ({ children, onClick, disabled = false, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative group px-8 py-4 rounded-xl text-white font-medium text-base shadow-lg transition-all duration-300 ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700'
      } ${className}`}
    >
      <motion.div
        className="flex items-center justify-center gap-2"
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        whileHover={{ x: 4 }}
      >
        {children}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ArrowRightIcon className="h-5 w-5" />
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    </motion.button>
  );
};

export default Button;
