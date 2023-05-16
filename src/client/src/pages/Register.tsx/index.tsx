import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RegisterForm from './registerForm';

export default function Register() {
  return (
    <>
      <Typography variant="h4" align="center" my="1rem">
        Register
      </Typography>
      <RegisterForm />
      <Typography variant="body2" align="center" mt="1rem">
        Already have an account?{' '}
        <Link component={RouterLink} to="/login">
          Login here
        </Link>
      </Typography>
    </>
  );
}
