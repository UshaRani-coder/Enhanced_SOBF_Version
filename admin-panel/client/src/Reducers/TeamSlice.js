import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createTeam, deleteTeam, getTeam, updateTeam } from '../api/api';


export const getTeams = createAsyncThunk('team/getTeam', async () => {
  const response = await getTeam();

  return response.data.teamMembers;
});

export const createTeamMember = createAsyncThunk('team/addTeam', async (postData) => {
  const response = await createTeam(postData);
  console.log("postData for create team " + postData);
  
  return response.data;
});

export const updateTeamMember = createAsyncThunk(
  'team/updateTeam',
  async ({ id, updatedData }) => {
    const response = await updateTeam(id, updatedData);
    console.log("response of updateTeam", response);
    
    return response.data;
  }
);

export const removeTeamMember = createAsyncThunk('team/removeTeam', async (id) => {
  await deleteTeam(id);
  return id;
});

const teamSlice = createSlice({
  name: 'teams',
  initialState: { teams: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teams = action.payload;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTeamMember.fulfilled, (state, action) => {
        state.teams.push(action.payload);
      })
      .addCase(updateTeamMember.fulfilled, (state, action) => {
        const index = state.teams.findIndex((impact) => impact._id === action.payload._id);
        if (index !== -1) state.teams[index] = action.payload;
      })
      .addCase(removeTeamMember.fulfilled, (state, action) => {
        state.teams = state.teams.filter((impact) => impact._id !== action.payload);
      });
  },
});

export default teamSlice.reducer;
