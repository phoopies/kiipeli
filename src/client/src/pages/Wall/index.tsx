import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Splash from '../../components/splash';
import WallInfo from './wallInfo';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useWall from '../../hooks/useWall';

export default function Wall() {
  const navigate = useNavigate();
  const { wall, loading } = useWall();

  const wrappedNavigate = (to: string) => () => navigate(to);

  if (loading) {
    return <Splash full />;
  }

  if (!wall) {
    return (
      <Typography>
        Oops, this wall is lost in the abyss and we don't know why
      </Typography>
    );
  }

  return (
    <Box sx={{ my: '1rem' }}>
      <Stack direction="row" gap="0.5rem" justifyContent="center">
        <Button
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={wrappedNavigate('routes')}
        >
          Check routes
        </Button>
        <Button variant="outlined" onClick={wrappedNavigate('routes/add')}>
          Create a route
        </Button>
      </Stack>

      <WallInfo wall={wall} />
    </Box>
  );
}
