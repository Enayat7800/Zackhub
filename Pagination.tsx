import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="flex justify-center items-center space-x-2 mt-8 mb-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-2 font-medium text-sm bg-light-card dark:bg-brand-card rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Previous page"
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`
            hidden sm:inline-block w-10 h-10 font-medium text-sm rounded-md transition-colors
            ${
              currentPage === number
                ? 'bg-brand-primary text-white'
                : 'bg-light-card dark:bg-brand-card hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
          aria-current={currentPage === number ? 'page' : undefined}
        >
          {number}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 font-medium text-sm bg-light-card dark:bg-brand-card rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
