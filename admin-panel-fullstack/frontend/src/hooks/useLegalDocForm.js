import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  addLegalDocument,
  getLegalDocuments,
  updateLegalDocumentById,
} from '../reducers/legalDocSlice';

const useLegalDocForm = (dispatch) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files?.[0] || null,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      file: null,
    });
  };

  const populateForm = (doc) => {
    setFormData({
      title: doc?.title || '',
      description: doc?.description || '',
      file: null,
    });
  };

  const validateForm = (isUpdateMode) => {
    if (!formData.title.trim()) {
      toast.error('Title is required.');
      return false;
    }

    if (!formData.description.trim()) {
      toast.error('Description is required.');
      return false;
    }

    if (!isUpdateMode && !formData.file) {
      toast.error('File is required.');
      return false;
    }

    if (formData.file && !formData.file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Only PDF files are allowed.');
      return false;
    }

    return true;
  };

  const handleAddDoc = async () => {
    if (!validateForm(false)) return false;

    try {
      setIsLoading(true);

      const body = new FormData();

      body.append('title', formData.title);
      body.append('description', formData.description);

      if (formData.file) {
        body.append('file', formData.file);
      }

      await dispatch(addLegalDocument(body)).unwrap();
      await dispatch(getLegalDocuments()).unwrap();

      toast.success('Successfully added legal document');

      resetForm();

      return true;
    } catch (error) {
      toast.error(error || 'Failed to add document');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDoc = async (id) => {
    if (!validateForm(true)) return false;

    try {
      setIsLoading(true);

      const body = new FormData();

      body.append('title', formData.title);
      body.append('description', formData.description);

      if (formData.file) {
        body.append('file', formData.file);
      }

      await dispatch(
        updateLegalDocumentById({
          id,
          updatedData: body,
        }),
      ).unwrap();

      await dispatch(getLegalDocuments()).unwrap();

      toast.success('Document updated successfully');

      resetForm();

      return true;
    } catch (error) {
      toast.error(error || 'Failed to update document');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleInputChange,
    handleFileChange,
    handleAddDoc,
    handleUpdateDoc,
    resetForm,
    populateForm,
  };
};

export default useLegalDocForm;
