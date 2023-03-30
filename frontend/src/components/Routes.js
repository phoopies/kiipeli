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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import RouteGradeAvatar from "./RouteGradeAvatar";
import { useDispatch } from "react-redux";
import { removeRoute } from "../reducers/routesSlice";
import { useState } from "react";

const Routes = ({ routes, handleClick }) => {
  const [sort, setSort] = useState(
    localStorage.getItem("sort") ? localStorage.getItem("sort") : "Date"
  );
  const [direction, setDirection] = useState(
    localStorage.getItem("direction") ? localStorage.getItem("direction") : "Up"
  );

  const userRoutes = JSON.parse(localStorage.getItem("userRoutes"));
  const dispatch = useDispatch();

  const handleSort = () => {
    localStorage.setItem("sort", sort === "Date" ? "Grade" : "Date");
    setSort((sort) => (sort === "Date" ? "Grade" : "Date"));
  };

  const handleDirection = () => {
    localStorage.setItem("direction", direction === "Down" ? "Up" : "Down");
    setDirection((direction) => (direction === "Down" ? "Up" : "Down"));
  };

  const sortByGrade = (a, b) => {
    return direction === "Down" ? a.grade > b.grade : a.grade < b.grade;
  };

  const sortByDate = (array) => {
    return direction === "Down" ? array : array.reverse();
  };

  const customRoutes = (amount) => {
    return Array(amount).fill({
      id: "asdfasf",
      name: "testireitti",
      grade: "6A",
      description: "ei tietoja",
    });
  };

  const sortAndDirect = (array) => {
    if (sort === "Date") return sortByDate(array);
    if (sort === "Grade") return array.sort(sortByGrade);
    console.error("Nyt meni jotain pieleen sorttauksessa pahasit");
    return [];
  };

  return (
    <Box sx={{ height: "100%", overflow: "hidden", paddingBottom: "24px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          textAlign: "center",
          padding: "8px 12px",
          backgroundColor: "primary.main",
          color: "secondary.main",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: "24px" }}>
          <Box onClick={handleSort}>
            <Button variant="outlined" color="secondary">
              {sort === "Date" ? "PÄIVÄ" : "GREIDI"}
            </Button>
          </Box>
          <Box onClick={handleDirection}>
            {direction === "Down" ? (
              <IconButton color="secondary">
                <SouthIcon />
              </IconButton>
            ) : (
              <IconButton color="secondary">
                <NorthIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
      <List
        sx={{
          height: "100%",
          overflow: "auto",
        }}
      >
        {routes.length === 0 && <div>Ei vielä reittejä</div>}
        {/* TODO PURKKA!! Päivämääräsortti vähän purkkailtu */}
        {sortAndDirect([...routes]).map((route, i) => {
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
              {i !== routes.length - 1 && <Divider variant="middle" />}
            </div>
          );
        })}
      </List>
    </Box>
  );
};

export default Routes;
