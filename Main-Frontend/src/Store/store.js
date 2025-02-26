import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../Reducers/postSlice';
import bulletinReducer from '../Reducers/bulletinSlice';
import ourImpactsReducer from '../Reducers/ourImpactsSlice';
import featuredVideoReducer from '../Reducers/featuredVideoSlice';
import heroBannerReducer from '../Reducers/heroBannerSlice';
import addLegalDocReducer from '../Reducers/legalDocSlice';
import teamReducer from '../Reducers/TeamSlice';
import galleryReducer from '../Reducers/gallerySlice';
import ourServiceRducer from '../Reducers/OurServicesSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
    bulletines: bulletinReducer,
    ourImpacts: ourImpactsReducer,
    featuredVideo: featuredVideoReducer,
    heroBanner: heroBannerReducer,
    legalDocs: addLegalDocReducer,
    teams: teamReducer,
    gallery: galleryReducer,
    services: ourServiceRducer,
  },
});

export default store;
