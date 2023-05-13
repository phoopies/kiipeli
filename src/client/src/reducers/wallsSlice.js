import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import wallsService from '../services/wallsService';

/* eslint-disable */
const loadingStates = "idle" | "pending" | "succeeded" | "failed";

const initialState = {
  walls: [],
  loading: "idle",
};

export const getWalls = createAsyncThunk("walls/getWalls", async (thunkAPI) => {
  try {
    const response = await wallsService.getWalls();
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
    reset: (state, action) => {
      return { ...state, wall: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWalls.pending, (state, action) => {
        console.log("pending", { ...state, loading: "pending" });
        return { ...state, loading: "pending" };
      })
      .addCase(getWalls.fulfilled, (state, action) => {
        console.log("fulfilled");
        localStorage.setItem("walls", JSON.stringify(action.payload));
        return { ...state, walls: action.payload, loading: "idle" };
      })
      .addCase(getWalls.rejected, (state, action) => {
        return { ...state, loading: "failed" };
      });
  },
});

export const { initialize, reset } = wallsSlice.actions;

export default wallsSlice.reducer;
