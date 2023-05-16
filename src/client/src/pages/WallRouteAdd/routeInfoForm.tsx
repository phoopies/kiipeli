import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { FormRoute } from '../../types';
import { TextField } from 'formik-mui';
import * as yup from 'yup';
import { grades } from '../../helpers';
import { useFormik, Formik, Field, Form } from 'formik';

type Props = {
  onSubmit: (route: FormRoute) => void | any | any[];
};

const validationSchema = yup.object({
  name: yup.string().required('A route name is required').max(24),
  description: yup.string().optional(),
  grade: yup.string().oneOf(grades).required('A route must have a grade'),
});

export default function RouteInfoForm({ onSubmit }: Props) {
  const initialValues: FormRoute = {
    name: '',
    grade: '6C',
    description: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  console.log(formik.touched);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '8px',
              gap: '8px',
            }}
          >
            <Field
              component={TextField}
              id="name"
              name="name"
              required
              label="Reitin nimi"
            />
            <Field
              component={TextField}
              id="grade"
              name="grade"
              required
              label="Greidi"
              select
            >
              {grades.map((grade) => (
                <MenuItem key={grade} value={grade}>
                  {grade}
                </MenuItem>
              ))}
            </Field>
            <Field
              component={TextField}
              id="description"
              name="description"
              label="Lisätietoa"
              multiline
              rows={4}
            />
            {isSubmitting && <CircularProgress />}
            <br />
            <Button
              sx={{ maxWidth: '50%', alignSelf: 'Center' }}
              variant="contained"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Lisää reitti
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
