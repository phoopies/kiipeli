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
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeRoute } from '../../reducers/routesSlice';
import { Grade, Route } from '../../types';
import { gradeToColor, gradeToNumber } from '../../helpers';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';

type Props = {
  routes: Route[];
};

export default function RouteList({ routes }: Props) {
  const navigate = useNavigate();

  const userRoutesJson = localStorage.getItem('userRoutes');
  const userRoutes = userRoutesJson ? JSON.parse(userRoutesJson) : [];
  const dispatch = useDispatch<AppDispatch>();

  const handleRouteDeletion = (route: Route) => {
    dispatch(removeRoute(route));
  };

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
            <div key={i + 1}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  userRoutes.includes(route.id) ? (
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
