import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LoginForm from './loginForm';

export default function Login() {
  return (
    <>
      <Typography variant="h4" align="center" my="1rem">
        Login
      </Typography>
      <LoginForm />
      <Typography variant="body2" align="center" mt="1rem">
        New to Kiipeli?{' '}
        <Link component={RouterLink} to="/register">
          Register here
        </Link>
      </Typography>
    </>
  );
}
