import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';

export default function Layout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        width: '100%',
      }}
    >
      <Navbar />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}
