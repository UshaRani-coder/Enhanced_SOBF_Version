// for recent-activities and new-bulletines
export const initialPostFormData = {
  title: '',
  description: '',
  images: [],
  date: '',
};

export const resetPostForm = ({
  setFormData,
  setPreviewImage,
  setCurrentPost,
  fileInputRef,
}) => {
  setFormData(initialPostFormData);
  setPreviewImage(null);
  setCurrentPost(null);

  if (fileInputRef?.current) {
    fileInputRef.current.value = '';
  }
};

export const handlePostInputChange = (eventOrData, setFormData) => {
  if (eventOrData?.target) {
    const { name, value } = eventOrData.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  } else {
    const { name, value } = eventOrData;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

export const removePostImage = (index, setFormData) => {
  setFormData((prev) => ({
    ...prev,
    images: prev.images.filter((_, i) => i !== index),
  }));
};

export const populatePostForm = ({
  post,
  setFormData,
  setPreviewImage,
  setCurrentPost,
  setIsModalOpen,
  setIsUpdateMode,
}) => {
  setIsModalOpen(true);
  setIsUpdateMode(true);
  setCurrentPost(post);

  setFormData({
    title: post?.title || '',
    description: post?.description || '',
    images: post?.images || [],
    date: post?.date || '',
  });

   setPreviewImage(post?.images?.[0]?.url || null);
};
