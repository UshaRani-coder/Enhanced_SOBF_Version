import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

//! Admin Endpoints
export const fetchAdmins = () => API.get('/api/admin/get-admin');
export const createAdmin = (adminData) => API.post('/api/admin/create-admin', adminData);
export const updateAdmins = (id, updatedAdmin) => API.put(`/api/admin/update-admin/${id}`, updatedAdmin);
export const deleteAdmin = (id) => API.delete(`/api/admin/delete-admin/${id}`);





//! Post Endpoints => recent activities
export const fetchPosts = () => API.get('/api/post/get-posts');
export const createPost = (postData) => API.post('/api/post/create-post', postData);
export const updatePostApi = (id, updatedPost) => API.put(`/api/post/update/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/api/post/delete/${id}`);






//! News Bulletines Endpoints
export const fetchNewsPosts = () => API.get('/api/post/get-newspost');
export const createNewsPosts = (postData) => API.post('/api/post/create-newspost', postData);
export const updateNewsPostsApi = (id, updatedPost) => API.put(`/api/post/update-news-post/${id}`, updatedPost);
export const deleteNewsPosts = (id) => API.delete(`/api/post/delete-news-post/${id}`);


// ! Hero banner Endpoints
export const createHeroBanner = (postdata) => API.post('/api/post/create-banner', postdata)
export const getHeroBanner = () => API.get('/api/post/get-hero-banner')
export const updateHeroBanner = (id, updatedPost) => API.put(`/api/post/update-hero-banner/${id}`, updatedPost)
export const deleteHeroBanner = () => API.delete(`/api/post/delete-hero-banner/${id}`)



// ! Our impacts Endpoints
export const createOurImpacts = (postdata) => API.post('/api/post/create-impacts', postdata)
export const getOurImpacts = () => API.get('/api/post/get-impacts')
export const updateOurImpacts = (id, updatedPost) => API.put(`/api/post/update-impacts/${id}`, updatedPost)
export const deleteOurImpacts = (id) => API.delete(`/api/post/delete-impacts/${id}`);



//! Featured Video Endpoints
export const createFeaturedVideo = (postData) => API.post('/api/post/create-featured-video', postData);
export const getFeaturedVideo = () => API.get('/api/post/get-featured-video')
export const updateFeaturedVideo = (id, updatedPost) => API.put(`/api/post/update-featured-video/${id}`, updatedPost);
export const deleteFeaturedVideo = (id) => API.delete(`/api/post/delete-featured-video/${id}`);





// ! Legal documents Endpoints
export const createLegalDocs = (postData) => API.post('/api/post/create-legal-doct', postData);
export const getLegalDocs = () => API.get('/api/post/get-legal-doc')
export const updateLegalDocs = (id, updatedPost) => API.put(`/api/post/update-legal-doc/${id}`, updatedPost);
export const deleteLegalDocs = (id) => API.delete(`/api/post/delete-legal-doc/${id}`);





// ! Our Teams Endpoints
export const createTeam = (postData) => API.post('/api/post/create-team', postData);
export const getTeam = () => API.get('/api/post/get-team')
export const updateTeam = (id, updatedPost) => API.put(`/api/post/update-team/${id}`, updatedPost);
export const deleteTeam = (id) => API.delete(`/api/post/delete-team/${id}`);


// ! Our Gallery Endpoints
export const createGallery = (postData) => API.post('/api/post/create-gallery-image', postData);
export const getGallery = () => API.get('/api/post/get-gallery-image')
export const updateGallery = (id, updatedPost) => API.put(`/api/post/update-gallery-image/${id}`, updatedPost);
export const deleteGallery = (id) => API.delete(`/api/post/delete-gallery-image/${id}`);
