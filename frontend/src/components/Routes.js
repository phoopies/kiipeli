import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RouteGradeAvatar from "./RouteGradeAvatar";
import { useDispatch } from "react-redux";
import { removeRoute } from "../reducers/routesSlice";

const Routes = ({ routes, handleClick }) => {
  const userRoutes = JSON.parse(localStorage.getItem("userRoutes"));
  const dispatch = useDispatch();

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <List
        sx={{
          height: "100%",
          overflow: "auto",
        }}
      >
        {routes.length === 0 && <div>Ei vielä reittejä</div>}
        {routes.map((route, i) => {
          return (
            <div key={i + 1}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  userRoutes?.includes(route.id) ? (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeRoute({ route }));
                        handleClick(null);
                      }}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : null
                }
              >
                <ListItemButton onClick={() => handleClick(i)}>
                  <ListItemAvatar>
                    <RouteGradeAvatar size={40} grade={route.grade} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${route.name}, ${route.grade}`}
                    secondary={`${
                      route.description ? route.description : "Boulder"
                    }`}
                  />
                </ListItemButton>
              </ListItem>
              <Divider variant="middle" />
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default Routes;
