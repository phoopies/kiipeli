import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import wallService from '../services/wallsService';
import { HoldedWall, SliceLoadingState } from '../types';

const localWall = null; // JSON.parse(localStorage.getItem("wall"));

type InitialState = {
  wall: HoldedWall | null;
  loading: SliceLoadingState;
};

const initialState: InitialState = {
  wall: localWall ? localWall : null,
  loading: 'idle',
};

export const getWall = createAsyncThunk(
  'wall/getWall',
  async (wallId: string, thunkAPI) => {
    try {
      const response = await wallService.get(wallId);
      if (!response) return thunkAPI.rejectWithValue('Problems fetching wall');
      return response;
    } catch (error) {
      console.log('ERROR');
      const message = 'Problems with fetching wall';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const wallSlice = createSlice({
  name: 'wall',
  initialState: initialState, // Kurkataan onko localstoragessa entiset
  reducers: {
    initialize: (state, action) => {
      return { ...state, wall: action.payload };
    },
    reset: (state, _action) => {
      return { ...state, wall: null };
    },
  },
  extraReducers: (builder) => {
    builder
      // CASES FOR GETWALL
      .addCase(getWall.pending, (state, _action) => {
        return { ...state, loading: 'pending' };
      })
      .addCase(getWall.fulfilled, (_state, action) => {
        //localStorage.setItem("wall", JSON.stringify(action.payload));
        return { wall: action.payload, loading: 'idle' };
      })
      .addCase(getWall.rejected, (state, _action) => {
        return { ...state, loading: 'failed' };
      });
  },
});

export const { initialize, reset } = wallSlice.actions;

export default wallSlice.reducer;
