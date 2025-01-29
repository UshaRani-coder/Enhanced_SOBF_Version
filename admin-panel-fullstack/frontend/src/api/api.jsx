import axios from 'axios';

// const apiClient = axios.create({ baseURL: 'https://backend.sobf.in' });
const apiClient = axios.create({ baseURL: 'http://localhost:5000' })

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});




//! Admin Endpoints  ======= DONE WITH ALL VALIDATIONS 
export const fetchAdmins = () => apiClient.get('/api/admin/get-admin');
export const createAdmin = (adminData) => apiClient.post('/api/admin/create-admin', adminData);
export const updateAdmins = (id, updatedAdmin) => apiClient.put(`/api/admin/update-admin/${id}`, updatedAdmin);
export const deleteAdmin = (id) => apiClient.delete(`/api/admin/delete-admin/${id}`);





// ! Our Teams Endpoints  ======= DONE WITH ALL VALIDATIONS 
export const getTeam = async () => apiClient.get('/api/post/get-team');
export const createTeam = async (data) => apiClient.post('/api/post/create-team', data);
export const updateTeam = async (id, data) => apiClient.put(`/api/post/update-team/${id}`, data);
export const deleteTeam = async (id) => apiClient.delete(`/api/post/delete-team/${id}`);



// ! Hero banner Endpoints  ======= DONE WITH ALL VALIDATIONS 
export const createHeroBanner = (postdata) => apiClient.post('/api/post/create-banner', postdata)
export const getHeroBanner = () => apiClient.get('/api/post/get-hero-banner')
export const updateHeroBanner = (id, updatedPost) => apiClient.put(`/api/post/update-hero-banner/${id}`, updatedPost)
export const deleteHeroBanner = () => apiClient.delete(`/api/post/delete-hero-banner/${id}`)

//! Post Endpoints => recent activities   ======= DONE WITH ALL VALIDATIONS 
export const fetchPosts = () => apiClient.get('/api/post/get-posts');
export const createPost = (postData) => apiClient.post('/api/post/create-post', postData);
export const updatePostApi = (id, updatedPost) => apiClient.put(`/api/post/update/${id}`, updatedPost);
export const deletePost = (id) => apiClient.delete(`/api/post/delete/${id}`);


//! News Bulletines Endpoints  ======= DONE WITH ALL VALIDATIONS 
export const fetchNewsPosts = () => apiClient.get('/api/post/get-newspost');
export const createNewsPosts = (postData) => apiClient.post('/api/post/create-newspost', postData);
export const updateNewsPostsApi = (id, updatedPost) => apiClient.put(`/api/post/update-news-post/${id}`, updatedPost);
export const deleteNewsPosts = (id) => apiClient.delete(`/api/post/delete-news-post/${id}`);




// ! Our impacts Endpoints   ======= DONE WITH ALL VALIDATIONS 
export const createOurImpacts = (postdata) => apiClient.post('/api/post/create-impacts', postdata)
export const getOurImpacts = () => apiClient.get('/api/post/get-impacts')
export const updateOurImpacts = (id, updatedPost) => apiClient.put(`/api/post/update-impacts/${id}`, updatedPost)
export const deleteOurImpacts = (id) => apiClient.delete(`/api/post/delete-impacts/${id}`);


//! Featured Video Endpoints   ======= DONE WITH ALL VALIDATIONS 
export const createFeaturedVideo = (postData) => apiClient.post('/api/post/create-featured-video', postData);
export const getFeaturedVideo = () => apiClient.get('/api/post/get-featured-video')
export const updateFeaturedVideo = (id, updatedPost) => apiClient.put(`/api/post/update-featured-video/${id}`, updatedPost);
export const deleteFeaturedVideo = (id) => apiClient.delete(`/api/post/delete-featured-video/${id}`);


// ! Legal documents Endpoints
export const createLegalDocs = (postData) => apiClient.post('/api/post/create-legal-doc', postData);
export const getLegalDocs = () => apiClient.get('/api/post/get-legal-doc')
export const updateLegalDocs = (id, updatedPost) => apiClient.put(`/api/post/update-legal-doc/${id}`, updatedPost);
export const deleteLegalDocs = (id) => apiClient.delete(`/api/post/delete-legal-doc/${id}`);





// ! Our Gallery Endpoints  
export const createGallery = (postData) => apiClient.post('/api/post/create-gallery-image', postData);
export const getGallery = () => apiClient.get('/api/post/get-gallery-image')
export const updateGallery = (id, updatedPost) => apiClient.put(`/api/post/update-gallery-image/${id}`, updatedPost);
export const deleteGallery = (id) => apiClient.delete(`/api/post/delete-gallery-image/${id}`);



// ! Our Services Endpoints  
export const createOurServices = (postData) => apiClient.post('/api/post/create-services', postData);
export const getOurServices = () => apiClient.get('/api/post/get-services')
export const updateOurServices = (id, updatedPost) => apiClient.put(`/api/post/update-services/${id}`, updatedPost);
export const deleteOurServices = (id) => apiClient.delete(`/api/post/delete-services/${id}`);