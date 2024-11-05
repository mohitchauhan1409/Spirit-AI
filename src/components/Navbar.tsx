import React from 'react';
import { Brain } from 'lucide-react';

const categories = [
  "All Experts",
  "Business Strategy",
  "Technical",
  "Leadership",
  "Innovation"
];

const Navbar: React.FC<{ activeCategory: string; onCategoryChange: (category: string) => void }> = ({
  activeCategory,
  onCategoryChange
}) => {
  return (
    <nav className="w-full bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Spirit AI
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;