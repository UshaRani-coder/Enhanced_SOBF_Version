import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../reducers/RecentActivityPostPageSlice.js';
import bulletinReducer from '../reducers/bulletinSlice.js';
import ourImpactsReducer from '../reducers/ourImpactsSlice.js';
import featuredVideoReducer from '../reducers/featuredVideoSlice.js';
import heroBannerReducer from '../reducers/heroBannerSlice.js';
import addLegalDocReducer from '../reducers/legalDocSlice.js';
import teamReducer from '../reducers/TeamSlice.js';
import galleryReducer from '../reducers/gallerySlice.js';
import ourServiceRducer from '../reducers/OurServicesSlice.js';
import upcomingEventReducer from '../reducers/upcomingEventsSlice.js';
import eventUserReducer from "../reducers/eventuserSlice.js"
import donationsReducer from "../reducers/donateForSlice.js"

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
    eventUser: eventUserReducer,
    donateFor: donationsReducer
  },
});

export default store;
