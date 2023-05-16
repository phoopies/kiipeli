import {
  AppBar,
  Box,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';

export default function Navbar() {
  const isLoggedIn = false;
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(isLoggedIn ? '/profile' : '/login');
  };

  const handleMenuClick = () => {
    navigate('/');
  };

  return (
    <Box>
      <AppBar color="primary" position="static">
        <Slide
          direction="right"
          in
          timeout={{ enter: 400 }}
          mountOnEnter
          unmountOnExit
        >
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="Home icon"
              sx={{ mr: 2 }}
              onClick={handleMenuClick}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Kiipeli
            </Typography>
            <IconButton
              size="small"
              edge="end"
              color="inherit"
              aria-label="icon"
              sx={{ mr: 2 }}
              onClick={handleProfileClick}
            >
              {isLoggedIn ? <PersonIcon /> : <LoginIcon />}
            </IconButton>
          </Toolbar>
        </Slide>
      </AppBar>
    </Box>
  );
}
