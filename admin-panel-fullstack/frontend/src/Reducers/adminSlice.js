import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createAdmin,
  deleteAdmin,
  fetchAdmins,
  updateAdmins,
} from '../api/api'; // Import the API functions
// import { toast } from 'react-toastify';

export const getAdmins = createAsyncThunk(
  'admins/getAdmins',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAdmins();
      // console.log(response.data);
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const addAdmin = createAsyncThunk(
  'admins/addAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await createTeam(adminData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error while adding Admin');
    }
  },
);

export const removeAdmin = createAsyncThunk(
  'admins/removeAdmin',
  async (id, { rejectWithValue }) => {
    try {
      await deleteAdmin(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateAdmin = createAsyncThunk(
  'admins/updateAdmin',
  async ({ id, adminData }, { rejectWithValue }) => {
    try {
      const response = await updateAdmins(id, adminData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const adminSlice = createSlice({
  name: 'admins',
  initialState: { admins: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdmins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admins = action.payload;
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload);
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter(
          (admin) => admin._id !== action.payload,
        );
      })
      .addCase(removeAdmin.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const index = state.admins.findIndex(
          (admin) => admin._id === action.payload._id,
        );
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
