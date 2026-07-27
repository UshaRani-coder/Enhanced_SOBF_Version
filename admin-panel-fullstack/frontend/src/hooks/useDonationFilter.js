import { useEffect, useState } from 'react';

const useDonationFilter = (categories = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'title',
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredData = [...categories]
    .filter(
      (item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const { key, direction } = sortConfig;

      if (key === 'raised' || key === 'goal') {
        const aValue = parseInt((a[key] || '0').replace(/₹|,/g, ''));

        const bValue = parseInt((b[key] || '0').replace(/₹|,/g, ''));

        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }

      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }

      return 0;
    });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return {
    filteredData,
    searchTerm,
    setSearchTerm,
    sortConfig,
    requestSort,
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages,
  };
};

export default useDonationFilter;
