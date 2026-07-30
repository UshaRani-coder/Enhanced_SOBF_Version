import { ACCEPTED_DIMENSIONS } from '../helper/Dimention';

const checkImageDimensions = (file) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = function () {
      const width = this.naturalWidth;
      const height = this.naturalHeight;

      const isValid = ACCEPTED_DIMENSIONS.some((dimension) => {
        const widthMatch =
          Math.abs(width - dimension.width) <=
          Math.round(dimension.width * 0.01);

        const heightMatch =
          Math.abs(height - dimension.height) <=
          Math.round(dimension.height * 0.01);

        return widthMatch && heightMatch;
      });

      URL.revokeObjectURL(img.src);

      resolve({
        isValid,
        width,
        height,
        acceptedSizes: ACCEPTED_DIMENSIONS.map(
          (dimension) => `${dimension.width}×${dimension.height}`,
        ),
        currentAspectRatio: Number((width / height).toFixed(2)),
      });
    };

    img.onerror = () => {
      if (img.src) {
        URL.revokeObjectURL(img.src);
      }

      resolve({
        isValid: false,
        width: 0,
        height: 0,
        acceptedSizes: ACCEPTED_DIMENSIONS.map(
          (dimension) => `${dimension.width}×${dimension.height}`,
        ),
        currentAspectRatio: null,
      });
    };

    img.src = URL.createObjectURL(file);
  });
};

export default checkImageDimensions;
