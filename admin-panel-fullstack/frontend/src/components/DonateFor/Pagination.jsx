import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex rounded-md shadow">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>

        {getPages().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border-t border-b border-gray-300 ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
