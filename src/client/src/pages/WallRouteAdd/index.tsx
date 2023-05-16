import { Box, Tab, Tabs, Typography } from '@mui/material';
import useWall from '../../hooks/useWall';
import HoldSelector from './holdSelector';
import { useState } from 'react';
import Splash from '../../components/splash';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import RouteInfoForm from './routeInfoForm';
import { addRoute } from '../../reducers/routesSlice';
import { FormRoute, Hold } from '../../types';
import { useNavigate } from 'react-router-dom';

export default function WallRouteAdd() {
  const { wall, loading } = useWall();
  const [tab, setTab] = useState(0);
  const [holds, setHolds] = useState<Hold[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const onSubmit = async (route: FormRoute) => {
    if (!wall) {
      return;
    }
    const createdRoute = await dispatch(
      addRoute({
        wallId: wall.id,
        route: { ...route, holds },
      })
    );
    navigate(`/walls/${wall.id}/routes/${createdRoute.payload.id}`);
  };

  const holdsSelected = holds.length > 0;

  if (loading) {
    return <Splash full />;
  }

  if (!wall) {
    return <Typography>Oops!?!</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Tabs value={tab} onChange={handleTabChange} aria-label="">
          <Tab label="Reitti" />
          <Tab label="Tiedot" disabled={!holdsSelected} />
        </Tabs>
      </Box>

      {tab === 0 && (
        <HoldSelector
          holds={wall.holds}
          selectedHolds={holds}
          setSelectedHolds={setHolds}
        />
      )}
      {tab === 1 && <RouteInfoForm onSubmit={onSubmit} />}
    </Box>
  );
}
