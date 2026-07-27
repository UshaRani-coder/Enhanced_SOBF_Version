import React from 'react';
import CircularProgress from '../../helper/CircularPorgrogress.jsx';
import DonorDetails from './DonorDetails';

const DonationRow = ({
  category,
  expandedRow,
  setExpandedRow,
  onEdit,
  onDelete,
}) => {
  const isExpanded = expandedRow === category._id;

  const toggleExpand = () => {
    setExpandedRow(isExpanded ? null : category._id);
  };

  const parseCurrency = (value) => parseInt((value || '0').replace(/₹|,/g, ''));

  const raised = parseCurrency(category?.raised);
  const goal = parseCurrency(category?.goal);

  const progress =
    goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

  return (
    <>
      <tr
        className="bg-white border-b hover:bg-gray-50 cursor-pointer"
        onClick={toggleExpand}
      >
        <td className="px-6 py-4 font-medium text-gray-900">
          <div className="flex items-center">
            <img
              src={category?.image || ''}
              alt={category?.title}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            {category?.title}
          </div>
        </td>

        <td className="px-6 py-4 max-w-xs truncate">{category?.description}</td>

        <td className="px-6 py-4">{category?.raised}</td>

        <td className="px-6 py-4">{category?.goal}</td>

        <td className="px-6 py-4">
          <CircularProgress percentage={progress} />
        </td>

        <td className="px-6 py-4 text-center">
          {category?.donor?.length || 0}
        </td>

        <td className="px-6 py-4">
          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(category);
              }}
              className="text-blue-600 font-bold hover:text-blue-700"
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(category._id);
              }}
              className="text-red-600 font-bold hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {isExpanded && category?.donor?.length > 0 && (
        <DonorDetails donors={category.donor} />
      )}
    </>
  );
};

export default DonationRow;
