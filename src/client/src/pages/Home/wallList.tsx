import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Box, ListItemButton, Typography } from '@mui/material';
import { Wall } from '../../types';

type Props = { walls: Wall[] };

export default function WallList({ walls }: Props) {
  const navigate = useNavigate();
  
  if (walls.length === 0) {
    return <Typography>Ugh, there are no walls here...</Typography>;
  }

  return (
    <List>
      {walls.map((wall) => (
        <Box key={wall.id}>
          <ListItem>
            <ListItemButton onClick={() => navigate(`/walls/${wall.id}/routes`)}>
              <ListItemAvatar>
                <Avatar>{wall.name[0] || '?'}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={wall.name} secondary={wall.description} />
            </ListItemButton>
          </ListItem>
        </Box>
      ))}
    </List>
  );
}
