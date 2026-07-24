import { useMemo } from 'react';
import { availableMonths } from '@/utils/availableMonths';

const useFilteredPosts = (posts, selectedYear, selectedMonth) => {
  const availableYears = useMemo(() => {
    const years = new Set(
      posts.map((post) => new Date(post.date).getFullYear())
    );

    return [...years].sort((a, b) => b - a);
  }, [posts]);

  const availableFilteredMonths = useMemo(() => {
    const months = new Set();

    posts.forEach((post) => {
      const date = new Date(post.date);

      if (!selectedYear || date.getFullYear() === Number(selectedYear)) {
        months.add(availableMonths[date.getMonth()]);
      }
    });

    return availableMonths.filter((month) => months.has(month));
  }, [posts, selectedYear]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const date = new Date(post.date);

      const matchesYear =
        !selectedYear || date.getFullYear() === Number(selectedYear);

      const matchesMonth =
        !selectedMonth ||
        date.getMonth() === availableMonths.indexOf(selectedMonth);

      return matchesYear && matchesMonth;
    });
  }, [posts, selectedYear, selectedMonth]);

  return {
    availableYears,
    availableFilteredMonths,
    filteredPosts,
  };
};

export default useFilteredPosts;