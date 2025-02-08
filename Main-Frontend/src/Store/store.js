import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../Reducers/postSlice';
import bulletinReducer from '../Reducers/bulletinSlice';
import ourImpactsReducer from '../Reducers/ourImpactsSlice';
import featuredVideoReducer from '../Reducers/featuredVideoSlice';
import heroBannerReducer from '../Reducers/heroBannerSlice';
import addLegalDocReducer from '../Reducers/legalDocSlice';
import teamReducer from '../Reducers/TeamSlice';
import galleryReducer from '../Reducers/gallerySlice';
import ourServiceRducer from "../Reducers/OurServicesSlice"




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


// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Uses localStorage

// import adminReducer from '../Reducers/adminSlice';
// import postReducer from '../Reducers/postSlice';
// import bulletinReducer from '../Reducers/bulletinSlice';
// import ourImpactsReducer from '../Reducers/ourImpactsSlice';
// import featuredVideoReducer from '../Reducers/featuredVideoSlice';
// import heroBannerReducer from '../Reducers/heroBannerSlice';
// import addLegalDocReducer from '../Reducers/legalDocSlice';
// import teamReducer from '../Reducers/TeamSlice';
// import galleryReducer from '../Reducers/gallerySlice';
// import ourServiceReducer from "../Reducers/OurServicesSlice"

// // 🔹 Configure persist settings
// const persistConfig = {
//   key: 'root', // Key for localStorage
//   storage, // Use localStorage
//   whitelist: ['bulletines'], // Persist only specific reducers
// };

// // 🔹 Combine all reducers
// const rootReducer = combineReducers({
//   admins: adminReducer,
//   posts: postReducer,
//   bulletines: bulletinReducer,
//   ourImpacts: ourImpactsReducer,
//   featuredVideo: featuredVideoReducer,
//   heroBanner: heroBannerReducer,
//   legalDocs: addLegalDocReducer,
//   teams: teamReducer,
//   gallery: galleryReducer,
//   services: ourServiceReducer,
// });

// // 🔹 Wrap the rootReducer with persistReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // 🔹 Create Redux store with persisted reducer
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Required for redux-persist
//     }),
// });

// // 🔹 Create a persistor to control persistence
// export const persistor = persistStore(store);

