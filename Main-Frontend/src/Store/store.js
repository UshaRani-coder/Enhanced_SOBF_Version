import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../reducers/postSlice';
import bulletinReducer from '../reducers/bulletinSlice';
import ourImpactsReducer from '../reducers/ourImpactsSlice';
import featuredVideoReducer from '../reducers/featuredVideoSlice';
import heroBannerReducer from '../reducers/heroBannerSlice';
import addLegalDocReducer from '../reducers/legalDocSlice';
import teamReducer from '../reducers/TeamSlice';
import galleryReducer from '../reducers/gallerySlice';
import ourServiceRducer from '../reducers/OurServicesSlice';
import upcomingEventReducer from "../reducers/upcomingeventSlice"
import donationReducer from "../reducers/donationSlice"
import donationsReducer from "../reducers/donateForSlice"

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
    events: upcomingEventReducer,
    donation: donationReducer,
    donateFor: donationsReducer
  },
});

export default store;
