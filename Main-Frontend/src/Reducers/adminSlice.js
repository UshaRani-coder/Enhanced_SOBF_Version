import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAdmin, deleteAdmin, fetchAdmins, updateAdmins } from '../api/api'; // Import the update API

export const getAdmins = createAsyncThunk('admins/getAdmins', async () => {
  const response = await fetchAdmins();
  return response?.data?.data;
});

export const addAdmin = createAsyncThunk('admins/addAdmin', async (adminData) => {
  const response = await createAdmin(adminData);
  return response.data;
});

export const removeAdmin = createAsyncThunk('admins/removeAdmin', async (id) => {
  await deleteAdmin(id);
  return id;
});

export const updateAdmin = createAsyncThunk("admins/updateAdmin", async ({ id, adminData }) => {
  const response = await updateAdmins(id, adminData); // Call the update API
  return response.data;
}
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
        state.error = action.error.message;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload);
      })
      .addCase(removeAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter((admin) => admin._id !== action.payload);
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const index = state.admins.findIndex((admin) => admin._id === action.payload._id);
        if (index !== -1) {
          state.admins[index] = action.payload; // Update the admin in the state
        }
      });
  },
});

export default adminSlice.reducer;
