import ImageMarker from '@kiipeli/image-marker';
import Splash from '../../components/splash';
import useRoute from '../../hooks/useRoute';
import CustomMarker from '../../components/customMarker';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useWall from '../../hooks/useWall';

export default function WallRoute() {
  const { route, loading } = useRoute();
  const { wall } = useWall();
  const navigate = useNavigate();

  const goBack = () => {
    if (!wall) {
      return navigate(-1);
    }
    navigate(`/walls/${wall.id}/routes`);
  };

  if (loading) {
    return <Splash full />;
  }

  if (!route) {
    return <Typography>Something went wrong</Typography>;
  }

  return (
    <>
      <>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button onClick={goBack}>Go back</Button>
          <Box mx="2rem">
            <Typography>
              {route.grade} | {route.name} | {route?.user ? route.user.username : "Tuntematon"}
            </Typography>
          </Box>
        </Box>
        <Typography marginX={'2rem'} textAlign="end">
          {route.description}
        </Typography>
      </>

      <ImageMarker
        image="/jklkiipeilykeskus.jpg"
        MarkerComponent={CustomMarker}
        markers={route.holds.map((hold) => ({
          ...hold,
          width: 5,
        }))}
      />
    </>
  );
}
