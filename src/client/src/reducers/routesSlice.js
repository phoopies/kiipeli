import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routesService from '../services/routesService';

const initialState = {
  routes: [], // TODO: FIX!
  loading: 'idle',
};

export const getRoutes = createAsyncThunk(
  'routes/getRoutes',
  async (wall, thunkAPI) => {
    try {
      const response = await routesService.getRoutes(wall);
      if (!response) return thunkAPI.rejectWithValue('Problems getting routes');
      return response;
    } catch (error) {
      const message = 'Problems with fetching routes';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addRoute = createAsyncThunk(
  'routes/addRoute',
  async ({ wall, user, name, grade, description, holds }, thunkAPI) => {
    try {
      return await routesService.addRoute({
        wall,
        user,
        name,
        grade,
        description,
        holds,
      });
    } catch (error) {
      const message = 'Problems with adding route';
      // Palautttaa payloadina messagen.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeRoute = createAsyncThunk(
  'routes/removeRoute',
  async ({ route }, thunkAPI) => {
    try {
      return await routesService.removeRoute({ route });
    } catch (error) {
      const message = 'Problems with removing route';
      // Palautttaa payloadina messagen.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    initializeRoutes: (state, action) => {
      return { ...state, routes: action.payload };
    },
    sortRoutes: (state, action) => {
      return { ...state, routes: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // CASES FOR GETROUTES
      .addCase(getRoutes.pending, (state) => {
        return { ...state, loading: 'pending' };
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        return { routes: action.payload, loading: 'idle' };
      })
      .addCase(getRoutes.rejected, (state) => {
        return { ...state, loading: 'failed' };
      })
      // CASES FOR ADDROUTE
      .addCase(addRoute.pending, (state) => {
        return state;
      })
      .addCase(addRoute.fulfilled, (state, action) => {
        if (action.payload === null) return state; // TODO: Onko tyhmä tarkistaa tässä?
        const userRoutes = JSON.parse(localStorage.getItem('userRoutes'));
        const newRoutes = userRoutes
          ? [...userRoutes, action.payload.id]
          : [action.payload.id];
        localStorage.setItem('userRoutes', JSON.stringify(newRoutes));
        return { ...state, routes: [...state.routes, action.payload] };
      })
      .addCase(removeRoute.fulfilled, (state, action) => {
        if (action.payload === null) return state;
        return {
          ...state,
          routes: state.routes.filter(
            (route) => route.id !== action.payload.id
          ),
        };
      });
  },
});
export const { initializeFinds, sortRoutes } = routesSlice.actions;

export default routesSlice.reducer;
