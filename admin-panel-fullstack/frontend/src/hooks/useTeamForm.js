import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
  addTeam,
  updateTeamData,
  removeTeam,
  getTeamData,
} from '../reducers/TeamSlice';

import validateTeam from '../components/Team/validateTeam';

const initialFormData = {
  name: '',
  role: '',
  linkedIn: '',
  instagram: '',
  image: null,
};

const useTeamForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.name]: e.value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!file) return;

    const img = new Image();

    img.onload = () => {
      const ratio = img.width / img.height;

      if (ratio < 0.9 || ratio > 1.1) {
        toast.error('Please upload a square image (1:1 aspect ratio).');
        e.target.value = '';
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    };

    img.src = URL.createObjectURL(file);
  };

  const handleAddTeamMember = async () => {
    const validation = validateTeam(formData);

    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      setIsLoading(true);

      await dispatch(addTeam(data)).unwrap();

      toast.success('Team member added successfully.');

      resetForm();
      dispatch(getTeamData());

      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to add team member.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTeamMember = async () => {
    const validation = validateTeam(formData, true);

    if (!validation.valid) {
      toast.error(validation.message);
      return false;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    try {
      setIsLoading(true);

      await dispatch(
        updateTeamData({
          id: currentPost._id,
          teamData: data,
        }),
      ).unwrap();

      toast.success('Team member updated successfully.');

      resetForm();
      dispatch(getTeamData());

      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to update team member.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteTeamMember = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this team member?',
    );

    if (!confirmDelete) return;

    try {
      setIsLoading(true);

      await dispatch(removeTeam(id)).unwrap();

      toast.success('Successfully deleted team member.');

      dispatch(getTeamData());
    } catch (error) {
      toast.error(error.message || 'Failed to delete team member.');
    } finally {
      setIsLoading(false);
    }
  };

  const openUpdateModal = (member) => {
    setIsUpdateMode(true);
    setCurrentPost(member);

    setFormData({
      name: member.name || '',
      role: member.role || '',
      linkedIn: member.linkedIn || '',
      instagram: member.instagram || '',
      image: null,
    });
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentPost(null);
    setIsUpdateMode(false);
  };

  return {
    formData,
    setFormData,
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
  };
};

export default useTeamForm;
