import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  createTeam, deleteTeam, getTeam, updateTeam } from '../api/api'; 
import { toast } from 'react-toastify';

export const getTeamData = createAsyncThunk(
  'team/getTeamData', // Unique action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTeam();      
      return response?.data?.teamMembers;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addTeam = createAsyncThunk(
  'team/addTeam',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await createTeam(adminData);
      // toast.success('teamData added successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add teamData');
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeTeam = createAsyncThunk(
  'team/removeTeam', async (id, { rejectWithValue }) => {
    try {
      await deleteTeam(id);
      toast.success('teamData deleted successfully!');
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete teamData');
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateTeamData = createAsyncThunk(
  'team/updateTeamData',
  async ({ id, teamData }, { rejectWithValue }) => {
    try {
      const response = await updateTeam(id, teamData);
      toast.success('teamData updated successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update teamData');
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const teamSlice = createSlice({
  name: 'teams',
  initialState: { teams: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTeamData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teams = action.payload;
      })
      .addCase(getTeamData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error(`Error fetching teams: ${action.payload}`);
      })
      .addCase(addTeam.fulfilled, (state, action) => {
        state.teams.push(action.payload);
        toast.success(`Successfully added team member data`);
      })
      .addCase(addTeam.rejected, (state, action) => {
        state.error = action.payload;
        // toast.error(`Error while adding teams member: ${action.payload}`);
      })
      .addCase(removeTeam.fulfilled, (state, action) => {
        state.teams = state.teams.filter((admin) => admin._id !== action.payload);
      })
      .addCase(removeTeam.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(`Error removing teams: ${action.payload}`);
      })
      .addCase(updateTeamData.fulfilled, (state, action) => {
        const index = state.teams.findIndex((admin) => admin._id === action.payload._id);
        console.log("index in update team data for team " + index);
        if (index !== -1) {
          state.teams[index] = action.payload;
        }
      })
      .addCase(updateTeamData.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(`Error updating teams data: ${action.payload}`);
      });
  },
});


export default teamSlice.reducer;
