import { Box, Typography } from '@mui/material';
import { Wall } from '../../types';

type Props = { wall: Wall };

export default function WallInfo({ wall }: Props) {
  return (
    <Box>
      <Typography>{wall.name}</Typography>
      <img
        src="/jklkiipeilykeskus.jpg"
        style={{ objectFit: 'contain', maxWidth: '90%' }}
      ></img>
      <Typography>{wall.description}</Typography>
    </Box>
  );
}
