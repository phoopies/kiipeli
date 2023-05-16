import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import wallsService from '../services/wallsService';
import { SliceLoadingState, Wall } from '../types';

type InitialState = {
  walls: Wall[] | null;
  loading: SliceLoadingState;
}

const initialState: InitialState = {
  walls: [],
  loading: "idle",
};

export const getWalls = createAsyncThunk("walls/getWalls", async (_, thunkAPI) => {
  try {
    const response = await wallsService.getAll();
    if (!response) return thunkAPI.rejectWithValue("Problems fetching walls");
    return response;
  } catch (error) {
    const message = "Problems with fetching routes";
    // Palautttaa payloadina messagen.
    return thunkAPI.rejectWithValue(message);
  }
});

export const wallsSlice = createSlice({
  name: "walls",
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
      .addCase(getWalls.pending, (state, _action) => {
        console.log("pending", { ...state, loading: "pending" });
        return { ...state, loading: "pending" };
      })
      .addCase(getWalls.fulfilled, (state, action) => {
        console.log("fulfilled");
        localStorage.setItem("walls", JSON.stringify(action.payload));
        return { ...state, walls: action.payload, loading: "idle" };
      })
      .addCase(getWalls.rejected, (state, _action) => {
        return { ...state, loading: "failed" };
      });
  },
});

export const { initialize, reset } = wallsSlice.actions;

export default wallsSlice.reducer;
