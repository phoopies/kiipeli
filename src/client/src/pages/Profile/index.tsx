import { Button, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

export default function Profile() {
  const { logout } = useAuth();
  const user = {
    username: 'JohnDoe',
  };

  const handleLogout = () => {
    logout();
    toast('Goodbye', { type: 'success' });
  };

  return (
    <Stack spacing="1rem">
      <Typography variant="h4" align="center" gutterBottom>
        Profile
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Username: {user.username}
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        More information will be available at some point:
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        - Created Routes: [Count]
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        - Routes Climbed: [Count]
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        - Climbs on user Routes: [Count]
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        - Total Likes on user Routes: [Count]
      </Typography>
      <Typography variant="body2" align="center">
        - Average Like Count on Route: [Count]
      </Typography>
      <Typography variant="body2" align="center">
        - A list of all user routes
      </Typography>
      <Button onClick={handleLogout} variant="contained">
        Logout
      </Button>
    </Stack>
  );
}
