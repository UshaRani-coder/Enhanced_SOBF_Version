import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createDonation, getAllDonations, getDonationById, getDonationsByDonor, sendTaxCertificate } from '../../../admin-panel-fullstack/frontend/src/api/api';

const apiClient = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

// Get All Donations
export const fetchDonations = createAsyncThunk(
  'donation/fetchDonations',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getAllDonations(params);
      return response.data.donations;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch donations'
      );
    }
  }
);

// Create New Donation
export const addDonation = createAsyncThunk(
  'donation/addDonation',
  async (donationData, { rejectWithValue }) => {
    try {
      const response = await createDonation(donationData);
      return response.data.donation;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create donation'
      );
    }
  }
);

// Get Single Donation
export const fetchDonationById = createAsyncThunk(
  'donation/fetchDonationById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getDonationById(id);
      return response.data.donation;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch donation'
      );
    }
  }
);

// Get Donations by Donor
export const fetchDonationsByDonor = createAsyncThunk(
  'donation/fetchDonationsByDonor',
  async ({ donorId, params }, { rejectWithValue }) => {
    try {
      const response = await getDonationsByDonor(donorId, params);
      return response.data.donations;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch donor donations'
      );
    }
  }
);

// Send Tax Certificate
export const sendDonationTaxCertificate = createAsyncThunk(
  'donation/sendTaxCertificate',
  async (donationId, { rejectWithValue }) => {
    try {
      const response = await sendTaxCertificate(donationId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to send tax certificate'
      );
    }
  }
);

// Delete Donation
export const removeDonation = createAsyncThunk(
  'donation/removeDonation',
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/api/post/delete-donation/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete donation'
      );
    }
  }
);

// Slice Definition
const donationSlice = createSlice({
  name: 'donation',
  initialState: {
    donations: [],
    currentDonation: null,
    donorDonations: [],
    status: 'idle',
    error: null,
    taxCertificateStatus: 'idle'
  },
  reducers: {
    clearCurrentDonation: (state) => {
      state.currentDonation = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Donations
      .addCase(fetchDonations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.donations = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add New Donation
      .addCase(addDonation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addDonation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.donations.unshift(action.payload);
      })
      .addCase(addDonation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch Single Donation
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

      // Fetch Donations by Donor
      .addCase(fetchDonationsByDonor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDonationsByDonor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.donorDonations = action.payload;
      })
      .addCase(fetchDonationsByDonor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Send Tax Certificate
      .addCase(sendDonationTaxCertificate.pending, (state) => {
        state.taxCertificateStatus = 'loading';
      })
      .addCase(sendDonationTaxCertificate.fulfilled, (state) => {
        state.taxCertificateStatus = 'succeeded';
      })
      .addCase(sendDonationTaxCertificate.rejected, (state, action) => {
        state.taxCertificateStatus = 'failed';
        state.error = action.payload;
      })

      // Remove Donation
      .addCase(removeDonation.fulfilled, (state, action) => {
        state.donations = state.donations.filter(
          donation => donation._id !== action.payload
        );
      })
      .addCase(removeDonation.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { clearCurrentDonation } = donationSlice.actions;
export default donationSlice.reducer;