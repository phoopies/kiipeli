import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import * as yup from 'yup';
import { Button, CircularProgress, Stack } from '@mui/material';
import { toast } from 'react-toastify';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

type LoginParams = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const initialValues: LoginParams = {
    username: '',
    password: '',
  };

  const handleSubmit = (values: LoginParams) => {
    toast('Login failed', { type: 'error' });
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
