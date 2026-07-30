import React, { useEffect, useState } from 'react';

const ImagePreview = ({
  image,
  onRemove,
  width = 'w-24',
  height = 'h-24',
  alt = 'Image Preview',
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);

      setPreviewUrl(objectUrl);

      // cleanup memory
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    // Existing image URL
    setPreviewUrl(image);
  }, [image]);

  if (!previewUrl) return null;

  return (
    <div className={`relative ${width} ${height} mb-4`}>
      <img
        src={previewUrl}
        alt={alt}
        className={`${width} ${height} object-cover rounded-md border`}
      />

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="
              absolute 
              -top-2 
              -right-2
              bg-red-500
              text-white
              rounded-full
              w-5
              h-5
              flex
              items-center
              justify-center
              text-sm
              font-bold
              hover:bg-red-600
              transition
            "
          aria-label="Remove image"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ImagePreview;
