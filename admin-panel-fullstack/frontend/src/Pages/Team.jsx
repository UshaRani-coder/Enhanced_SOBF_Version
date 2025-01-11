import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import {
  createTeamMember,
  getTeams,
  removeTeamMember,
  updateTeamMember,
} from '../Reducers/TeamSlice';

const Team = () => {
  const dispatch = useDispatch();
  const { teams, status } = useSelector((state) => state.teams);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    linkedIn: '',
    instagram: '',
    image: null,
  });

  // Fetch teams data
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getTeams());
    }
  }, [status, dispatch]);

  // Handle form submission for adding a new team member
  const handleAddTeamMember = async () => {
    const newTeam = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      newTeam.append(key, value);
    });

    try {
      await dispatch(createTeamMember(newTeam)).unwrap(); // Wait for action to complete
      toast.success('Successfully added new team member.');
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to add team member. Please try again.');
      console.error('Error adding team member:', error);
    }
  };


  // Handle form submission for updating an existing team member
  const handleUpdateTeamMember = () => {
    const updatedTeam = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      updatedTeam.append(key, value);
    });

    dispatch(updateTeamMember({ id: currentPost._id, updatedData: updatedTeam }));
    toast.success('Successfully updated team member.');
    setIsModalOpen(false);
    resetForm();
  };

  // Handle deleting a team member
  const handleDeleteTeamMember = (id) => {
    dispatch(removeTeamMember(id));
    toast.success('Successfully deleted team member.');
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Reset the form to its initial state
  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      linkedIn: '',
      instagram: '',
      image: null,
    });
    setCurrentPost(null);
  };

  // Open modal for updating an existing team member
  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({
      name: post.name,
      role: post.role,
      linkedIn: post.linkedIn || '',
      instagram: post.instagram || '',
      image: null,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between px-14 pb-4">
        <h1 className="text-4xl">Our Team Members</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Member
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Team Member' : 'Add New Team Member'}
            </h2>
            <form>
              {/* Name */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none"
                />
              </div>

              {/* Role */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Role</label>
                <textarea
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none"
                ></textarea>
              </div>

              {/* LinkedIn */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">LinkedIn</label>
                <input
                  type="text"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none"
                />
              </div>

              {/* Instagram */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none"
                />
              </div>

              {/* Image */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={isUpdateMode ? handleUpdateTeamMember : handleAddTeamMember}
                >
                  {isUpdateMode ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Team Members */}
      <div className="mt-6 flex flex-wrap justify-evenly gap-4">
        {teams.length > 0 ? (
          teams.map((member) => (
            <div
              key={member._id}
              className="border p-4 rounded shadow hover:shadow-lg transition-shadow duration-300 max-w-sm"
            >
              <img
                src={member.image || 'https://via.placeholder.com/150'}
                alt={member.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-bold">{member.name}</h3>
              <p className="italic">{member.role}</p>
              <div className="flex justify-between mt-2">
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  Instagram
                </a>
              </div>
              <div className="mt-2 flex gap-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => openUpdateModal(member)}
                >
                  Update
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDeleteTeamMember(member._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No team members found.</p>
        )}
      </div>
    </div>
  );
};

export default Team;
