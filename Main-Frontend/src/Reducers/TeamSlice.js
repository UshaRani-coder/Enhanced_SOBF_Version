import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTeam } from '../api/api';
import teamData from '../defaultData/team.json';

export const getTeams = createAsyncThunk(
  'team/getTeam',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTeam();
      if (
        !response ||
        response.status !== 200 ||
        response.data?.teamMembers?.length === 0
      ) {
        return teamData;
      }
      return response?.data?.teamMembers || teamData;
    } catch (error) {
      return rejectWithValue(teamData);
    }
  },
);

const teamSlice = createSlice({
  // name: 'teams',
  name: teamData,
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
        state.error = action.payload;
        state.teams = teamData; // Use hardcoded data when API fails
      });
  },
});

export default teamSlice.reducer;
