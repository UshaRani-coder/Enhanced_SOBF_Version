export const validateDonationImage = (file) => {
  return new Promise((resolve) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
      resolve('Only JPEG, PNG, and JPG images are allowed.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const aspectRatio = width / height;

        const isValidRatio = aspectRatio >= 1 && aspectRatio <= 1.8;

        if (!isValidRatio) {
          resolve(
            `Please upload an image between 1:1 and 16:9 aspect ratio. Your image is ${width}×${height}px.`,
          );
          return;
        }

        resolve(null);
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
};
