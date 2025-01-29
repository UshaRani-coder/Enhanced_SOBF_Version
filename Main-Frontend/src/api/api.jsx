import axios from 'axios';

// const api = axios.create({ baseURL: 'https://backend.sobf.in' });
const api = axios.create({ baseURL: 'http://localhost:5000' });

//! Admin Endpoints
export const fetchAdmins = () => api.get('/api/admin/get-admin');
export const createAdmin = (adminData) => api.post('/api/admin/create-admin', adminData);
export const updateAdmins = (id, updatedAdmin) => api.put(`/api/admin/update-admin/${id}`, updatedAdmin);
export const deleteAdmin = (id) => api.delete(`/api/admin/delete-admin/${id}`);





//! Post Endpoints => recent activities
export const fetchPosts = () => api.get('/api/post/get-posts');
export const createPost = (postData) => api.post('/api/post/create-post', postData);
export const updatePostApi = (id, updatedPost) => api.put(`/api/post/update/${id}`, updatedPost);
export const deletePost = (id) => api.delete(`/api/post/delete/${id}`);






//! News Bulletines Endpoints
export const fetchNewsPosts = () => api.get('/api/post/get-newspost');
export const createNewsPosts = (postData) => api.post('/api/post/create-newspost', postData);
export const updateNewsPostsApi = (id, updatedPost) => api.put(`/api/post/update-news-post/${id}`, updatedPost);
export const deleteNewsPosts = (id) => api.delete(`/api/post/delete-news-post/${id}`);


// ! Hero banner Endpoints
export const createHeroBanner = (postdata) => api.post('/api/post/create-banner', postdata)
export const getHeroBanner = () => api.get('/api/post/get-hero-banner')
export const updateHeroBanner = (id, updatedPost) => api.put(`/api/post/update-hero-banner/${id}`, updatedPost)
export const deleteHeroBanner = (id) => api.delete(`/api/post/delete-hero-banner/${id}`)



// ! Our impacts Endpoints
export const createOurImpacts = (postdata) => api.post('/api/post/create-impacts', postdata)
export const getOurImpacts = () => api.get('/api/post/get-impacts')
export const updateOurImpacts = (id, updatedPost) => api.put(`/api/post/update-impacts/${id}`, updatedPost)
export const deleteOurImpacts = (id) => api.delete(`/api/post/delete-impacts/${id}`);



//! Featured Video Endpoints
export const createFeaturedVideo = (postData) => api.post('/api/post/create-featured-video', postData);
export const getFeaturedVideo = () => api.get('/api/post/get-featured-video')
export const updateFeaturedVideo = (id, updatedPost) => api.put(`/api/post/update-featured-video/${id}`, updatedPost);
export const deleteFeaturedVideo = (id) => api.delete(`/api/post/delete-featured-video/${id}`);





// ! Legal documents Endpoints
export const createLegalDocs = (postData) => api.post('/api/post/create-legal-doct', postData);
export const getLegalDocs = () => api.get('/api/post/get-legal-doc')
export const updateLegalDocs = (id, updatedPost) => api.put(`/api/post/update-legal-doc/${id}`, updatedPost);
export const deleteLegalDocs = (id) => api.delete(`/api/post/delete-legal-doc/${id}`);





// ! Our Teams Endpoints
export const createTeam = (postData) => api.post('/api/post/create-team', postData);
export const getTeam = () => api.get('/api/post/get-team')
export const updateTeam = (id, updatedPost) => api.put(`/api/post/update-team/${id}`, updatedPost);
export const deleteTeam = (id) => api.delete(`/api/post/delete-team/${id}`);


// ! Our Gallery Endpoints
export const createGallery = (postData) => api.post('/api/post/create-gallery-image', postData);
export const getGallery = () => api.get('/api/post/get-gallery-image')
export const updateGallery = (id, updatedPost) => api.put(`/api/post/update-gallery-image/${id}`, updatedPost);
export const deleteGallery = (id) => api.delete(`/api/post/delete-gallery-image/${id}`);