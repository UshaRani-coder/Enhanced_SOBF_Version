import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNewsPosts, fetchNewsPostById } from '../api/api';
import hardcodedBulletins from '../defaultData/newsbulletine.json';

/**
 * GET ALL BULLETINS
 */
export const getBulletine = createAsyncThunk(
  'bulletines/getBulletine',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchNewsPosts();

      if (response?.status === 200 && response?.data?.posts?.length) {
        return {
          data: response.data.posts,
          isFallback: false,
        };
      }

      // API returned empty
      return {
        data: hardcodedBulletins,
        isFallback: true,
      };
    } catch (error) {
      return rejectWithValue({
        data: hardcodedBulletins,
        isFallback: true,
        error: error.message,
      });
    }
  }
);

/**
 * GET SINGLE BULLETIN BY ID
 */
export const getSpecificBulletine = createAsyncThunk(
  'bulletines/getSpecificBulletine',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchNewsPostById(id);

      if (response?.status === 200 && response?.data?.post) {
        return {
          data: response.data.post,
          isFallback: false,
        };
      }

      throw new Error('Bulletin not found');
    } catch (error) {
      const fallbackPost = hardcodedBulletins.find(
        (item) => String(item._id) === String(id)
      );

      if (fallbackPost) {
        return {
          data: fallbackPost,
          isFallback: true,
        };
      }

      return rejectWithValue({
        data: null,
        isFallback: true,
        error: 'Post not found',
      });
    }
  }
);

/**
 * SLICE
 */
const bulletinSlice = createSlice({
  name: 'bulletines',
  initialState: {
    bulletines: [],
    specificBulletine: null,
    status: 'idle',
    error: null,
    isFallback: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      /**
       * GET ALL
       */
      .addCase(getBulletine.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBulletine.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bulletines = action.payload.data;
        state.isFallback = action.payload.isFallback;
        state.error = null;
      })
      .addCase(getBulletine.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.error || 'Failed to fetch bulletins';

        // fallback safe data
        state.bulletines = action.payload?.data || [];
        state.isFallback = true;
      })

      /**
       * GET SINGLE
       */
      .addCase(getSpecificBulletine.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSpecificBulletine.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.specificBulletine = action.payload.data;
        state.isFallback = action.payload.isFallback;
        state.error = null;
      })
      .addCase(getSpecificBulletine.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.error || 'Failed to fetch bulletin';

        state.specificBulletine = null;
        state.isFallback = true;
      });
  },
});

export default bulletinSlice.reducer;