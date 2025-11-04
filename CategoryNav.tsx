import React from 'react';
import { MovieCategory } from '../types';

interface CategoryNavProps {
  selectedCategory: MovieCategory | 'all';
  onSelectCategory: (category: MovieCategory | 'all') => void;
}

const categories: (MovieCategory | 'all')[] = ['all', 'webseries', 'hollywood', 'bollywood', 'south-indian'];

const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-start space-x-4 md:space-x-8 overflow-x-auto pb-1 px-4 sm:px-6 lg:px-8" aria-label="Tabs">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`
                whitespace-nowrap py-3 px-2 border-b-4 font-brand font-black text-base sm:text-lg md:text-xl capitalize
                transition-all duration-300 transform hover:-translate-y-1 focus:outline-none text-brand-primary [text-shadow:0_0_8px_theme(colors.brand-primary)]
                ${
                  isActive
                    ? 'border-brand-primary'
                    : 'border-transparent'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {category === 'all' ? 'All Movies' : category.replace('-', ' ')}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;