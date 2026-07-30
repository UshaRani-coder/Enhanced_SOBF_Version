import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTeamData } from '../reducers/TeamSlice';

import TeamModal from '../components/Team/TeamModal';
import TeamList from '../components/Team/TeamList';

import useTeamForm from '../hooks/useTeamForm';

const Team = () => {
  const dispatch = useDispatch();

  const { teams, status } = useSelector((state) => state.teams);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    formData,
    isLoading,
    currentPost,
    isUpdateMode,
    setIsUpdateMode,
    handleInputChange,
    handleFileChange,
    handleAddTeamMember,
    handleUpdateTeamMember,
    handleDeleteTeamMember,
    openUpdateModal,
    resetForm,
  } = useTeamForm();

  // Fetch teams
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getTeamData());
    }
  }, [status, dispatch]);

  const openAddModal = () => {
    resetForm();
    setIsUpdateMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (member) => {
    openUpdateModal(member);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    let success;

    if (isUpdateMode) {
      success = await handleUpdateTeamMember();
    } else {
      success = await handleAddTeamMember();
    }

    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-lg small-range:text-2xl md:text-3xl lg:text-4xl font-semibold">
          Our Team Members
        </h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-4 small-max:py-1.5 text-[12px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl "
          onClick={openAddModal}
        >
          Add Member
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <TeamModal
          formData={formData}
          isUpdateMode={isUpdateMode}
          isLoading={isLoading}
          currentPost={currentPost}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          onClose={() => {
            resetForm();
            setIsModalOpen(false);
          }}
        />
      )}

      {/* Team Members */}
      <TeamList
        teams={teams}
        onEdit={handleEdit}
        onDelete={handleDeleteTeamMember}
      />
    </div>
  );
};

export default Team;
