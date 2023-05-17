import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routesService from '../services/routesService';
import { FormRoute, Hold, PopulatedRoute, Route, SliceLoadingState } from '../types';

type initialState = {
  route: PopulatedRoute | null;
  routes: Route[];
  loading: SliceLoadingState;
};

const initialState: initialState = {
  route: null,
  routes: [], // TODO: FIX!
  loading: 'idle',
};

export const getRoute = createAsyncThunk(
  'routes/getRoute',
  async (routeId: string, thunkAPI) => {
    try {
      const response = await routesService.get(routeId);
      if (!response) return thunkAPI.rejectWithValue('Problems getting route');
      return response as PopulatedRoute;
    } catch (error) {
      const message = 'Problems with fetching route';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRoutes = createAsyncThunk(
  'routes/getRoutes',
  async (wallId: string, thunkAPI) => {
    try {
      const response = await routesService.getAll(wallId);
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
  async (
    { wallId, route }: { wallId: string; route: FormRoute & { holds: Hold[] } },
    thunkAPI
  ) => {
    try {
      const newRoute = await routesService.add({
        wallId,
        route: {
          ...route,
          holds: route.holds.map((hold) => ({ ...hold, color: 'red' })),
        },
      });
      return newRoute;
    } catch (error) {
      const message = 'Problems with adding route';
      // Palautttaa payloadina messagen.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeRoute = createAsyncThunk(
  'routes/removeRoute',
  async (route: Route, thunkAPI) => {
    try {
      const removedRoute = await routesService.remove({ route });
      return removedRoute;
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
        return { ...state, routes: action.payload, loading: 'idle' };
      })
      .addCase(getRoutes.rejected, (state) => {
        return { ...state, loading: 'failed' };
      })
            // CASES FOR GETROUTE
      .addCase(getRoute.pending, (state) => {
        return { ...state, loading: 'pending' };
      })
      .addCase(getRoute.fulfilled, (state, action) => {
        return { ...state, route: action.payload, loading: 'idle' };
      })
      .addCase(getRoute.rejected, (state) => {
        return { ...state, loading: 'failed' };
      })
      // CASES FOR ADDROUTE
      .addCase(addRoute.pending, (state) => {
        return state;
      })
      .addCase(addRoute.fulfilled, (state, action) => {
        if (action.payload === null) return state; // TODO: Onko tyhmä tarkistaa tässä?
        const userRoutesJson = localStorage.getItem('userRoutes');
        if (!userRoutesJson) {
          return state;
        }
        const userRoutes = JSON.parse(userRoutesJson);
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

export const { initializeRoutes, sortRoutes } = routesSlice.actions;

export default routesSlice.reducer;
