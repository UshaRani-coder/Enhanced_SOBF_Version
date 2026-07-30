import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
  createEventPost,
  updateEventPost,
  removeEvent,
  fetchEvents,
} from '../reducers/upcomingEventsSlice';

import validateEvent from '../components/UpcomingEvents/validateEvent';

const initialFormData = {
  title: '',
  description: '',
  image: null,
  date: '',
  startTime: '',
  endTime: '',
  location: '',
};

const useEventForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPost = async () => {
    if (!validateEvent(formData)) return;

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      setIsLoading(true);

      await dispatch(createEventPost(data)).unwrap();

      toast.success('Event added successfully.');

      setIsModalOpen(false);
      resetForm();

      dispatch(fetchEvents());

      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to add event.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePost = async () => {
    if (!validateEvent(formData, true)) return;

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    try {
      setIsLoading(true);

      await dispatch(
        updateEventPost({
          id: currentPost._id,
          updatedData: data,
        }),
      ).unwrap();

      toast.success('Event updated successfully.');

      setIsModalOpen(false);
      resetForm();

      dispatch(fetchEvents());

      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to update event.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this event? This action cannot be undone.',
    );

    if (!confirmDelete) return;

    try {
      setIsLoading(true);

      await dispatch(removeEvent(id)).unwrap();

      toast.success('Event deleted successfully.');

      dispatch(fetchEvents());

      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to delete event.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

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

      if (ratio < 1.6 || ratio > 1.9) {
        toast.error(
          'Please upload a landscape image with a 16:9 aspect ratio.',
        );
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

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);

    setFormData({
      title: post.title || '',
      description: post.description || '',
      image: null,
      date: post.date ? new Date(post.date).toISOString().split('T')[0] : '',
      startTime: post.startTime || '',
      endTime: post.endTime || '',
      location: post.location || '',
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

    isModalOpen,
    setIsModalOpen,

    isUpdateMode,
    setIsUpdateMode,

    currentPost,

    handleInputChange,
    handleFileChange,
    handleRemoveImage,

    handleAddPost,
    handleUpdatePost,
    handleDeletePost,

    openUpdateModal,
    resetForm,
  };
};

export default useEventForm;
