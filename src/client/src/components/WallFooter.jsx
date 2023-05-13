import { Box, Grow, IconButton, Skeleton, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ListItemText from '@mui/material/ListItemText';

import RouteGradeAvatar from './RouteGradeAvatar';

function WallFooter({ route, handleClick }) {
  if (!route)
    return (
      <Box
        elevation={1}
        sx={{
          width: '100%',
          backgroundColor: 'primary.main',
          color: 'secondary.main',

          alignSelf: 'flex-end',
          marginTop: 'auto',
        }}
      >
        <List sx={{ paddingLeft: '8px', paddingRight: '8px' }}>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="forward"
                color="secondary"
                onClick={handleClick}
              >
                <ArrowForwardIcon />
              </IconButton>
            }
          >
            <ListItemAvatar sx={{ paddingRight: '16px' }}>
              <Skeleton
                variant="circular"
                animation={false}
                width={40}
                height={40}
                sx={{ bgcolor: 'grey.900' }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body2">
                  Valitse reitti reittilistauksesta
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    );

  return (
    <Box
      elevation={1}
      sx={{
        width: '100%',
        backgroundColor: 'primary.main',
        color: 'secondary.main',

        alignSelf: 'flex-end',
        marginTop: 'auto',
      }}
    >
      <List sx={{ paddingLeft: '8px', paddingRight: '8px' }}>
        <Grow in timeout={500}>
          <ListItem>
            <ListItemAvatar sx={{ paddingRight: '16px' }}>
              <RouteGradeAvatar size={40} grade={route.grade} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body1">
                  {route.name}, {route.grade}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="secondary.dark">
                  {route.description ? route.description : 'Boulder'}
                </Typography>
              }
            />
          </ListItem>
        </Grow>
      </List>
    </Box>
  );
}

export default WallFooter;
