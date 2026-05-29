import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOurServices } from '../api/api';
import hardcodedServices from '../defaultData/ourServices.json';

// GET SERVICES
export const getServices = createAsyncThunk(
  'services/getServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOurServices();

      if (
        response?.status === 200 &&
        Array.isArray(response?.data?.services)
      ) {
        return response.data.services; 
      }

      return hardcodedServices;
    } catch (error) {
      return rejectWithValue(hardcodedServices);
    }
  }
);

const initialState = {
  services: [],
  status: 'idle',
  error: null,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET SERVICES
      .addCase(getServices.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(getServices.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.services = Array.isArray(action.payload)
          ? action.payload
          : [];
      })

      .addCase(getServices.rejected, (state, action) => {
        state.status = 'failed';

        state.services = Array.isArray(action.payload)
          ? action.payload
          : hardcodedServices;

        state.error = 'Failed to fetch services';
      });
  },
});

export default servicesSlice.reducer;