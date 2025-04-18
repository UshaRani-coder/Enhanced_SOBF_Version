// src/components/Pagination.js
import React from 'react';

const Pagination = ({ volunteersPerPage, totalVolunteers, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalVolunteers / volunteersPerPage);

  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Show limited page numbers on mobile
  const getVisiblePages = () => {
    if (window.innerWidth < 640) { // sm breakpoint
      const maxVisible = 3;
      let start = Math.max(1, currentPage - 1);
      let end = Math.min(totalPages, currentPage + 1);

      if (currentPage <= 2) {
        end = Math.min(maxVisible, totalPages);
      } else if (currentPage >= totalPages - 1) {
        start = Math.max(totalPages - maxVisible + 1, 1);
      }

      return pageNumbers.slice(start - 1, end);
    }
    return pageNumbers;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="w-full py-4 flex items-center justify-center">
      <nav className="flex items-center gap-1" aria-label="Pagination">
        {/* Previous Button */}
        <button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>

        {/* First Page */}
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => paginate(1)}
              className={`px-3 py-1 rounded border ${currentPage === 1 ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-500 hover:bg-gray-50'}`}
            >
              1
            </button>
            {visiblePages[0] > 2 && <span className="px-2">...</span>}
          </>
        )}

        {/* Page Numbers */}
        {visiblePages.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-3 py-1 rounded border text-sm ${currentPage === number
              ? 'bg-blue-50 border-blue-500 text-blue-600'
              : 'border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
          >
            {number}
          </button>
        ))}

        {/* Last Page */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2">...</span>
            )}
            <button
              onClick={() => paginate(totalPages)}
              className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 text-gray-500 hover:bg-gray-50'}`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </nav>
    </div>
  );
};

export default Pagination;