import {
  Box,
  Button,
  Grow,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ListItemText from "@mui/material/ListItemText";

import RouteGradeAvatar from "./RouteGradeAvatar";

const WallFooterAddRoute = ({ index, handleClick }) => {
  return (
    <Box
      elevation={1}
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "primary.main",
        color: "secondary.main",
        alignSelf: "flex-end",
        justifyContent: "flex-end",
        marginTop: "auto",
      }}
    >
      <List
        dense={true}
        sx={{
          paddingLeft: "8px",
          paddingRight: "8px",
          height: "60px",
        }}
      >
        <ListItem>
          <Grow in={index === 0} timeout={500}>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<ArrowForwardIcon />}
              onClick={handleClick}
            >
              Tiedot
            </Button>
          </Grow>
        </ListItem>
      </List>
    </Box>
  );
};

export default WallFooterAddRoute;
