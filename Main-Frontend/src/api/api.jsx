import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });


export const fetchPosts = () => api.get('/api/post/get-posts'); // ? 1 recent activities Endpoints
export const fetchNewsPosts = () => api.get('/api/post/get-newspost');  // ? 2 News Bulletines Endpoints
export const getHeroBanner = () => api.get('/api/post/get-hero-banner');  // ? 3 Hero banner Endpoints
export const getOurImpacts = () => api.get('/api/post/get-impacts');  // ? 4 Our impacts Endpoints
export const getFeaturedVideo = () => api.get('/api/post/get-featured-video');  // ? 5 Featured Video Endpoints
export const getLegalDocs = () => api.get('/api/post/get-legal-doc');  // ? 6  Legal documents Endpoints
export const getTeam = () => api.get('/api/post/get-team');  // ? 7 Our Teams Endpoints
export const getGallery = () => api.get('/api/post/get-gallery-image');  // ? 8 Our Gallery Endpoints
export const getOurServices = () => api.get('/api/post/get-services'); // ? 9 Our Services Endpoints