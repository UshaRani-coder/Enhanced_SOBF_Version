import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import postReducer from '../reducers/postSlice';
import bulletinReducer from '../reducers/bulletinSlice';
import ourImpactsReducer from '../reducers/ourImpactsSlice';
import featuredVideoReducer from '../reducers/featuredVideoSlice';
import heroBannerReducer from '../reducers/heroBannerSlice';
import addLegalDocReducer from '../reducers/legalDocSlice';
import teamReducer from '../reducers/TeamSlice';
import galleryReducer from '../reducers/gallerySlice';
import ourServiceReducer from '../reducers/OurServicesSlice';
import upcomingEventReducer from '../reducers/upcomingeventSlice';
import donationReducer from '../reducers/donationSlice';
import donationsReducer from '../reducers/donateForSlice';

const rootReducer = combineReducers({
  posts: postReducer,
  bulletines: bulletinReducer,
  ourImpacts: ourImpactsReducer,
  featuredVideo: featuredVideoReducer,
  heroBanner: heroBannerReducer,
  legalDocs: addLegalDocReducer,
  teams: teamReducer,
  gallery: galleryReducer,
  services: ourServiceReducer,
  events: upcomingEventReducer,
  donation: donationReducer,
  donateFor: donationsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['events'], // only persist event slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
