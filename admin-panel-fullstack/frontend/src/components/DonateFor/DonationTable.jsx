import React from 'react';
import DonationRow from './DonationRow';

const DonationTable = ({
  data,
  sortConfig,
  requestSort,
  expandedRow,
  setExpandedRow,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-white uppercase bg-[#27274F]">
          <tr>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => requestSort('title')}
            >
              Title{' '}
              {sortConfig?.key === 'title' &&
                (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3">Description</th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => requestSort('raised')}
            >
              Raised{' '}
              {sortConfig?.key === 'raised' &&
                (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => requestSort('goal')}
            >
              Goal{' '}
              {sortConfig?.key === 'goal' &&
                (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3">Progress</th>
            <th className="px-6 py-3">Donors</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((category) => (
              <DonationRow
                key={category?._id}
                category={category}
                expandedRow={expandedRow}
                setExpandedRow={setExpandedRow}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                No donation posts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonationTable;
