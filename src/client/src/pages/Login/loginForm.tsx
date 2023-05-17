import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import * as yup from 'yup';
import { Button, CircularProgress, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { LoginParams } from '../../types';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginForm() {
  const {login} = useAuth();

  const navigate = useNavigate();
  const initialValues: LoginParams = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values: LoginParams) => {
    try {
      await login(values);
      toast('You are now logged in', { type: 'success' });
      navigate('/')
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Login failed';
      toast(msg, { type: 'error' });
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Stack spacing="1rem">
            <Field
              component={TextField}
              fullWidth
              id="username"
              name="username"
              label="Username"
            />
            <Field
              component={TextField}
              fullWidth
              type="password"
              id="password"
              name="password"
              label="Password"
            />
            {isSubmitting && <CircularProgress />}
            <Button
              fullWidth
              disabled={!isValid || isSubmitting}
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
