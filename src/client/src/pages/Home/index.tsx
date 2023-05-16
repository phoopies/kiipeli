import { useDispatch, useSelector } from 'react-redux';
import Splash from '../../components/splash';
import WallList from './wallList';
import { Box, Typography } from '@mui/material';
import { AppDispatch, RootState } from '../../store';
import { getWalls } from '../../reducers/wallsSlice';
import { useEffect } from 'react';
import AddFab from '../../components/addFab';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { walls, loading } = useSelector((state: RootState) => state.walls);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getWalls());
  }, [dispatch]);

  if (loading === 'pending') {
    return <Splash full />;
  }

  return (
    <Box>
      {walls ? (
        <WallList walls={walls} />
      ) : (
        <Typography>Oops! Failed to fetch walls</Typography>
      )}
      <AddFab onClick={() => navigate('/walls/add')} aria-label="add-wall" />
    </Box>
  );
}
