import {
  Box,
  FormControl,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addRoute } from '../reducers/routesSlice';

const grades = [
  '4',
  '4+',
  '5',
  '5+',
  '6A',
  '6A+',
  '6B',
  '6B+',
  '6C',
  '6C+',
  '7A',
  '7A+',
  '7B',
  '7B+',
  '7C',
  '7C+',
  '8A',
  '8A+',
  '8B',
  '8B+',
  '8C',
  '8C+',
  '9A',
];

function AddRouteForm({ route }) {
  const [grade, setGrade] = useState('6A');
  const [errors, setErrors] = useState({
    name: '',
    grade: '',
    description: '',
    holds: '',
  });
  const dispatch = useDispatch();
  const { wall } = useSelector((state) => state.wall);
  const navigate = useNavigate();

  const handleName = (name) => {
    let error = '';
    if (!name) error = 'Anna reitille nimi';
    if (name.length > 24) error = 'Liian pitkä nimi';
    error && setErrors((errors) => ({ ...errors, name: error }));
    if (error) return null;
    return name;
  };

  const handleHolds = (holds) => {
    let error = '';
    if (holds.length === 0)
      error = 'Lisää otteet reittiin edelliseltä sivulta!';
    error && setErrors((errors) => ({ ...errors, holds: error }));
    if (error) return null;
    return holds.map((hold) => ({ id: hold.id, color: hold.color }));
  };

  const handleUser = (user) => {
    console.log(user);
    let error = '';
    if (!user) return 'Tuntematon';
    if (user.length > 24) error = 'Liian pitkä nimi';
    error && setErrors((errors) => ({ ...errors, user: error }));
    if (error) return null;
    return user;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = handleName(e.target.name.value);
    const grade = e.target.grade.value;
    const description = e.target.description.value;
    const user = handleUser(e.target.user.value);
    const holds = handleHolds(route);

    // TODO: Make errorhandling correct
    if (!name || !user || !holds) return;
    console.log('everything correct');
    dispatch(addRoute({ wall, user, name, grade, description, holds }));
    navigate(-1);
  };

  const onGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleErrorRemoval = (target) => {
    console.log(errors);
    console.log(errors[target]);
    return errors[target]
      ? setErrors((errors) => ({ ...errors, [target]: '' }))
      : null;
  };

  return (
    <FormControl fullWidth onClick={() => handleErrorRemoval('holds')}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '8px',
          gap: '8px',
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          name="name"
          error={!!errors.name}
          helperText={errors.name}
          onClick={() => handleErrorRemoval('name')}
          label="Reitin nimi *"
        />
        <TextField
          name="user"
          defaultValue="Tuntematon"
          error={!!errors.user}
          helperText={errors.user}
          onClick={() => handleErrorRemoval('user')}
          label="Reitin tekijä"
        />
        <TextField
          name="grade"
          label="Vaikeustaso *"
          value={grade}
          onChange={onGradeChange}
          select
        >
          {grades.map((grade) => (
            <MenuItem key={grade} value={grade}>
              {grade}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="description"
          error={!!errors.info}
          helperText={errors.info}
          onClick={() => handleErrorRemoval('description')}
          label="Lisätietoa"
          multiline
          rows={4}
        />
        <Button
          sx={{ maxWidth: '50%', alignSelf: 'Center' }}
          variant="contained"
          type="submit"
        >
          Lisää reitti
        </Button>
        {errors.holds && <Typography color="error">{errors.holds}</Typography>}
      </Box>
    </FormControl>
  );
}

export default AddRouteForm;
