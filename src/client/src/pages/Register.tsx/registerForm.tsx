import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import * as yup from 'yup';
import { Button, CircularProgress, Stack } from '@mui/material';
import { toast } from 'react-toastify';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  passwordConfirm: yup
    .string()
    .required('Password must be confirmed')
    .oneOf([yup.ref('password')], "Passwords don't match")
    .required('Password must be confirmed'),
});

type RegisterParams = {
  username: string;
  password: string;
  passwordConfirm: string;
};

export default function RegisterForm() {
  const initialValues: RegisterParams = {
    username: '',
    password: '',
    passwordConfirm: '',
  };

  const handleSubmit = (values: RegisterParams) => {
    toast('Registration failed', { type: 'error' });
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
            <Field
              component={TextField}
              fullWidth
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              label="Confirm password"
            />
            {isSubmitting && <CircularProgress />}
            <Button
              fullWidth
              disabled={!isValid || isSubmitting}
              variant="contained"
              color="primary"
              type="submit"
            >
              Register
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
