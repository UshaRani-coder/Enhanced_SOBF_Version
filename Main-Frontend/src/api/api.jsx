import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

export const fetchPosts = () => api.get('/api/post/get-posts'); // ? 1 recent activities Endpoints
export const fetchPostById = (id) => api.get(`/api/post/get-post/${id}`);
export const fetchNewsPosts = () => api.get('/api/post/get-newspost'); // ? 2 News Bulletines Endpoints
export const fetchNewsPostById = (id) =>
  api.get(`/api/post/news-bulletine/${id}`);

export const getHeroBanner = () => api.get('/api/post/get-hero-banner'); // ? 3 Hero banner Endpoints
export const getOurImpacts = () => api.get('/api/post/get-impacts'); // ? 4 Our impacts Endpoints
export const getFeaturedVideo = () => api.get('/api/post/get-featured-video'); // ? 5 Featured Video Endpoints
export const getLegalDocs = () => api.get('/api/post/get-legal-doc'); // ? 6  Legal documents Endpoints
export const getTeam = () => api.get('/api/post/get-team'); // ? 7 Our Teams Endpoints
export const getGallery = () => api.get('/api/post/get-gallery-image'); // ? 8 Our Gallery Endpoints
export const getOurServices = () => api.get('/api/post/get-services'); // ? 9 Our Services Endpoints

export const getEvents = () => api.get('/api/post/get-upcoming-events');
export const fetchEventPostById = (id) => api.get(`/api/post/upcoming-events/${id}`); // ? 10 Upcoming Events Endpoints

// !Donate for endpoints
export const getAllDonationCategories = () => api.get('/api/post/');
export const getSingleDonationPostBasedOnId = (id) => api.get(`/api/post/get-donation-by-id/${id}`);
export const addDonationCategory = (data) => api.post('/api/post/create', data);
export const addDonor = (id, data) => api.post(`/api/post/add-donor/${id}`, data);