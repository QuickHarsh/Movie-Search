import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ movieData }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden my-8 max-w-5xl mx-auto"
    >
      <div className="relative">
        {/* Header with Image Overlay */}
        <div className="relative h-[400px] overflow-hidden">
          {/* Background Poster (Blurred) */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10" />
            <img
              src={movieData.Poster}
              alt=""
              className="w-full h-full object-cover object-top blur-sm"
            />
          </div>

          {/* Main Poster */}
          <div className="absolute left-8 top-8 z-20">
            <motion.img
              variants={itemVariants}
              src={movieData.Poster}
              alt={movieData.Title}
              className="w-64 h-[360px] object-cover rounded-lg shadow-2xl ring-1 ring-gray-800"
            />
          </div>

          {/* Title and Metadata */}
          <div className="absolute bottom-0 left-80 right-0 p-8 z-20">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-3"
            >
              {movieData.Title}
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 text-sm text-gray-300"
            >
              <span>{movieData.Year}</span>
              <span>•</span>
              <span>{movieData.Runtime}</span>
              <span>•</span>
              <span>{movieData.Rated}</span>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Genre */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 mb-8"
          >
            {movieData.Genre.split(',').map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-medium"
              >
                {genre.trim()}
              </span>
            ))}
          </motion.div>

          {/* Rating Section */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-8 mb-8 p-4 bg-gray-800/50 rounded-lg"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-5 h-5 ${
                      i < Math.floor(parseFloat(movieData.imdbRating) / 2)
                        ? 'text-yellow-400'
                        : 'text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              <span className="text-2xl font-bold">{movieData.imdbRating}</span>
              <span className="text-gray-400 text-xs">IMDb Rating</span>
            </div>
            <div className="h-14 w-px bg-gray-700" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{movieData.imdbVotes}</span>
              <span className="text-gray-400 text-xs">Votes</span>
            </div>
          </motion.div>

          {/* Plot Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Plot</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {movieData.Plot}
            </p>
          </motion.div>

          {/* Cast & Crew Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Cast & Crew</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <h4 className="text-gray-400 text-xs mb-1">Director</h4>
                  <p className="text-sm">{movieData.Director}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-xs mb-1">Writer</h4>
                  <p className="text-sm">{movieData.Writer}</p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <h4 className="text-gray-400 text-xs mb-1">Cast</h4>
                  <p className="text-sm">{movieData.Actors}</p>
                </div>
                {movieData.Production && (
                  <div>
                    <h4 className="text-gray-400 text-xs mb-1">Production</h4>
                    <p className="text-sm">{movieData.Production}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Additional Details */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-700"
          >
            <div>
              <h4 className="text-gray-400 text-xs mb-1">Language</h4>
              <p className="text-sm">{movieData.Language}</p>
            </div>
            <div>
              <h4 className="text-gray-400 text-xs mb-1">Country</h4>
              <p className="text-sm">{movieData.Country}</p>
            </div>
            <div>
              <h4 className="text-gray-400 text-xs mb-1">Awards</h4>
              <p className="text-sm">{movieData.Awards}</p>
            </div>
            {movieData.BoxOffice && (
              <div>
                <h4 className="text-gray-400 text-xs mb-1">Box Office</h4>
                <p className="text-sm">{movieData.BoxOffice}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
