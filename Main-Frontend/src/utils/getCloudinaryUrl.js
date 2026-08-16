 export const getCloudinaryUrl = (url, width) => {
    if (!url?.includes('res.cloudinary.com')) return url;

    return url.replace(
      '/image/upload/',
      `/image/upload/f_auto,q_auto,w_${width}/`,
    );
  };