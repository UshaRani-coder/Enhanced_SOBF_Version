import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDonationCategory, addDonor, getAllDonationCategories, getSingleDonationPostBasedOnId } from '../api/api';


// ! Get all donation categories
export const fetchAllDonations = createAsyncThunk(
  'donations/fetchAllDonations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllDonationCategories();
      // console.log("API Response:", response?.data?.categories);
      return response?.data?.categories;
    } catch (error) {
      return rejectWithValue("No data found"); // Return fallback data on failure
    }
  }
);

// ! Get a specific donation by ID
export const fetchDonationById = createAsyncThunk(
  'donations/fetchDonationById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getSingleDonationPostBasedOnId(id);
      // console.log("API Response:", response);
      if (!response || !response.data) {
        throw new Error('Invalid response structure');
      }
      return response.data.post || response.data;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ! Add new donation category
export const createDonationCategory = createAsyncThunk(
  'donations/createCategory',
  async (formDataToSend, { rejectWithValue }) => {
    try {
      // console.log("API Data:", formDataToSend);
      const response = await addDonationCategory(formDataToSend);
      if (!response || response.status !== 201) {
        throw new Error('Failed to create category');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ! Add donor to a donation
export const addDonorToDonation = createAsyncThunk(
  'donations/addDonor',
  async ({ donationId, donorData }, { rejectWithValue }) => {
    try {
      const response = await addDonor(donationId, donorData);
      if (!response || response.status !== 200) {
        throw new Error('Failed to add donor');
      }
      return {
        donationId,
        donor: response.data.donor
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const donationsSlice = createSlice({
  name: 'donateFor',
  initialState: {
    categories: [], // Add this line
    currentDonation: null,
    status: 'idle',
    error: null,
    donorStatus: 'idle',
    donorError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getAllDonations actions
      .addCase(fetchAllDonations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllDonations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchAllDonations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        // state.categories = hardcodedDonations;
      })

      // Handle getDonationById actions
      .addCase(fetchDonationById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDonationById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentDonation = action.payload;
      })
      .addCase(fetchDonationById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle createDonationCategory actions
      .addCase(createDonationCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createDonationCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories.push(action.payload);
      })
      .addCase(createDonationCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle addDonor actions
      .addCase(addDonorToDonation.pending, (state) => {
        state.donorStatus = 'loading';
      })
      .addCase(addDonorToDonation.fulfilled, (state, action) => {
        state.donorStatus = 'succeeded';
        // Update the specific donation with new donor
        const index = state.categories.findIndex(
          item => String(item._id) === String(action.payload.donationId)
        );
        if (index !== -1) {
          if (!state.categories[index].donors) {
            state.categories[index].donors = [];
          }
          state.categories[index].donors.push(action.payload.donor);

          // Also update currentDonation if it's the one being viewed
          if (state.currentDonation &&
            String(state.currentDonation._id) === String(action.payload.donationId)) {
            if (!state.currentDonation.donors) {
              state.currentDonation.donors = [];
            }
            state.currentDonation.donors.push(action.payload.donor);
          }
        }
      })
      .addCase(addDonorToDonation.rejected, (state, action) => {
        state.donorStatus = 'failed';
        state.donorError = action.payload;
      });
  }
});

export default donationsSlice.reducer;