import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { getRoutes } from '../../reducers/routesSlice';
import Splash from '../../components/splash';
import { Typography, Box, Divider } from '@mui/material';
import { useEffect } from 'react';
import RouteList from './routeList';
import RouteFilterSortModal from './routeFilterSortModal';
import AddFab from '../../components/addFab';
import useWall from '../../hooks/useWall';

export default function WallRoutes() {
  const { wall } = useWall();
  const { routes, loading } = useSelector((state: RootState) => state.routes);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!wall?.id) {
      return;
    }
    dispatch(getRoutes(wall.id));
  }, [dispatch, wall?.id]);

  if (loading === 'pending') {
    return <Splash full />;
  }

  return (
    <Box textAlign="center">
      <Typography variant="h4" textAlign="center">
        {wall?.name}
      </Typography>
      <Typography>{wall?.description}</Typography>
      <Divider/>
      <RouteFilterSortModal />
      {routes ? (
        <RouteList routes={routes} />
      ) : (
        <Typography>Something went wrong while getting routes</Typography>
      )}
      <AddFab aria-label="create-route" onClick={() => navigate('add')} />
    </Box>
  );
}
