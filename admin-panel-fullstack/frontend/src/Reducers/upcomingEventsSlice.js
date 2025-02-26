// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   posts: JSON.parse(localStorage.getItem('posts')) || [],
// };

// const upcomingEventsSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {
//     addPost: (state, action) => {
//       state.posts.push(action.payload);
//       localStorage.setItem('posts', JSON.stringify(state.posts));
//     },
//     updatePost: (state, action) => {
//       const index = state.posts.findIndex(post => post.id === action.payload.id);

//       if (index !== -1) {
//         // Create a new updated array
//         const updatedPosts = state.posts.map(post =>
//           post.id === action.payload.id ? { ...post, ...action.payload } : post
//         );

//         state.posts = updatedPosts; // Update state immutably
//         localStorage.setItem('posts', JSON.stringify(updatedPosts)); // Update LocalStorage
//       }
//     },

//     deletePost: (state, action) => {
//       state.posts = state.posts.filter(post => post.id !== action.payload);
//       localStorage.setItem('posts', JSON.stringify(state.posts));
//     },
//   },
// });

// export const { addPost, updatePost, deletePost } = upcomingEventsSlice.actions;
// export default upcomingEventsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [], // Removed localStorage initialization
};

const upcomingEventsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
      // Removed localStorage.setItem
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id,
      );

      if (index !== -1) {
        // Create a new updated array
        const updatedPosts = state.posts.map((post) =>
          post.id === action.payload.id ? { ...post, ...action.payload } : post,
        );

        state.posts = updatedPosts; // Update state immutably
        // Removed localStorage.setItem
      }
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      // Removed localStorage.setItem
    },
  },
});

export const { addPost, updatePost, deletePost } = upcomingEventsSlice.actions;
export default upcomingEventsSlice.reducer;
