import { createSlice } from '@reduxjs/toolkit';
import { createOfflineAsyncThunk } from './config';
import wallService from '../services/wallService';

const localWall = null; // JSON.parse(localStorage.getItem("wall"));

/* eslint-disable */
const loadingStates = "idle" | "pending" | "succeeded" | "failed";

const initialState = {
  wall: localWall ? localWall : null,
  loading: "idle",
};

export const getWall = createOfflineAsyncThunk(
  "wall/getWall",
  async (wallId, thunkAPI) => {
    try {
      const response = await wallService.getWall(wallId);
      if (!response) return thunkAPI.rejectWithValue("Problems fetching wall");
      return response;
    } catch (error) {
      console.log("ERROR");
      const message = "Problems with fetching wall";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const wallSlice = createSlice({
  name: "wall",
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
      // CASES FOR GETWALL
      .addCase(getWall.pending, (state, action) => {
        console.log("pending", { ...state, loading: "pending" });
        return { ...state, loading: "pending" };
      })
      .addCase(getWall.fulfilled, (state, action) => {
        console.log("fulfilled");
        console.log("payload", action.payload);
        //localStorage.setItem("wall", JSON.stringify(action.payload));
        return { wall: action.payload, loading: "idle" };
      })
      .addCase(getWall.rejected, (state, action) => {
        console.log("rejected");
        console.log("Trying to find last update");
        const oldData = JSON.parse(localStorage.getItem("wall"));
        console.log("OLD DATA", oldData);
        return { ...state, loading: "failed" };
      });
  },
});

export const { initialize, reset } = wallSlice.actions;

export default wallSlice.reducer;
