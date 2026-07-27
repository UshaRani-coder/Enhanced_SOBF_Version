import React, { useState } from "react";
import useDebounce from "../../hooks/useDebounce.js";

const DonationSearch = ({ onChange }) => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  React.useEffect(() => {
    onChange(debouncedSearch);
  }, [debouncedSearch, onChange]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by title or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default DonationSearch;