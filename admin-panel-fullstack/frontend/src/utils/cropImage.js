import { toast } from 'react-toastify';

const cropImage = (file, aspectRatio = 16 / 9) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected.'));
      return;
    }

    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!validImageTypes.includes(file.type)) {
      toast.error('Only JPEG, JPG and PNG images are allowed.');
      reject(new Error('Invalid file type.'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();

      image.onload = () => {
        const originalAspect = image.width / image.height;

        const minAspect = 1;
        const maxAspect = 3;

        if (originalAspect < minAspect || originalAspect > maxAspect) {
          toast.error(
            'Image is too tall or too wide to crop properly. Please upload an image with an aspect ratio between 1:1 and 3:1.',
            {
              autoClose: 5000,
            },
          );

          reject(new Error('Unsupported aspect ratio.'));
          return;
        }

        let cropWidth = image.width;
        let cropHeight = image.height;

        if (cropWidth / cropHeight > aspectRatio) {
          cropWidth = cropHeight * aspectRatio;
        } else {
          cropHeight = cropWidth / aspectRatio;
        }

        const offsetX = (image.width - cropWidth) / 2;
        const offsetY = (image.height - cropHeight) / 2;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        ctx.drawImage(
          image,
          offsetX,
          offsetY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight,
        );

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to crop image.'));
              return;
            }

            const croppedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            resolve(croppedFile);
          },
          file.type,
          0.9,
        );
      };

      image.onerror = () => {
        reject(new Error('Failed to load image.'));
      };

      image.src = event.target.result;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read image.'));
    };

    reader.readAsDataURL(file);
  });
};

export default cropImage;
