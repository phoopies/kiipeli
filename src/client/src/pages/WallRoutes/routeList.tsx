import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { removeRoute } from '../../reducers/routesSlice';
import { Route } from '../../types';
import { gradeToColor } from '../../helpers';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { useMe } from '../../contexts/UserContext';

type Props = {
  routes: Route[];
};

export default function RouteList({ routes }: Props) {
  const navigate = useNavigate();
  const me = useMe();

  const dispatch = useDispatch<AppDispatch>();

  const handleRouteDeletion = (route: Route) => {
    dispatch(removeRoute(route));
  };

  console.log(routes, me);

  if (routes.length === 0) {
    return (
      <Typography>
        This wall has no routes at the moment, maybe you should create the first
        one?
      </Typography>
    );
  }

  return (
    <Box sx={{ height: '100%', overflow: 'hidden', paddingBottom: '24px' }}>
      <List
        sx={{
          height: '100%',
        }}
      >
        {routes.map((route, i) => {
          return (
            <div key={route.id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  me && route.user === me.id ? (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRouteDeletion(route);
                      }}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : null
                }
              >
                <ListItemButton
                  onClick={() => navigate(route.id, { relative: 'route' })}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: gradeToColor(route.grade),
                        borderStyle: 'solid',
                        borderColor: 'secondary.main',
                      }}
                    >
                      <Typography color="secondary.main">
                        {route.grade}
                      </Typography>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${route.name}, ${route.grade}`}
                    secondary={`${
                      route.description ? route.description : 'Boulder'
                    }`}
                  />
                </ListItemButton>
              </ListItem>
              {i !== routes.length - 1 && <Divider variant="middle" />}
            </div>
          );
        })}
      </List>
    </Box>
  );
}
