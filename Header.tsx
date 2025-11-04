import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  onLogoClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSearch: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onLogoClick, searchQuery, setSearchQuery, showSearch }) => {
  return (
    <header className="sticky top-0 z-20 bg-light-bg dark:bg-brand-bg shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          <div className="flex-1 flex items-center justify-start">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-light-text-secondary dark:text-brand-text-secondary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <h1
              onClick={onLogoClick}
              className="font-brand text-4xl md:text-5xl font-black text-brand-primary cursor-pointer select-none tracking-wide"
            >
              ZackHub
            </h1>
          </div>

          <div className="flex-1 flex items-center justify-end">
             {showSearch && (
               <div className="relative hidden sm:block group">
                 <input
                   type="text"
                   placeholder="Search..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="bg-light-sidebar dark:bg-brand-card border-2 border-gray-300 dark:border-gray-600 focus:border-brand-primary dark:focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/40 text-light-text dark:text-brand-text placeholder-gray-500 dark:placeholder-gray-400 rounded-full py-2 pl-12 pr-4 transition-all duration-300 w-full max-w-xs shadow-md focus:shadow-lg focus:shadow-brand-primary/20 outline-none"
                   aria-label="Search for movies or series"
                 />
                 <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-brand-primary transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                   <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                 </svg>
               </div>
             )}
          </div>

        </div>
        {showSearch && (
            <div className="sm:hidden pb-4">
                 <div className="relative group">
                 <input
                   type="text"
                   placeholder="Search for movies or series..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="bg-light-sidebar dark:bg-brand-card border-2 border-gray-300 dark:border-gray-600 focus:border-brand-primary dark:focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/40 text-light-text dark:text-brand-text placeholder-gray-500 dark:placeholder-gray-400 rounded-full py-2 pl-12 pr-4 transition-all duration-300 w-full shadow-md focus:shadow-lg focus:shadow-brand-primary/20 outline-none"
                   aria-label="Search for movies or series"
                 />
                 <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-brand-primary transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                   <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                 </svg>
               </div>
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;