import { cloneElement } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Divider, IconButton, ListItemButton } from "@mui/material";

function generate(element) {
  return Array(100)
    .fill(0)
    .map((value, i) =>
      cloneElement(element, {
        key: i,
      })
    );
}

const ListTwoLine = ({ items = [] }) => {
  console.log(items);
  const navigate = useNavigate();

  return (
    <List>
      {items.map((item) => (
        <Box key={item?.id}>
          <ListItem
            secondaryAction={
              <IconButton
                onClick={() => navigate(`/wall/${item?.id}`)}
                edge="end"
                aria-label="delete"
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={() => navigate(`/wall/${item?.id}`)}>
              <ListItemAvatar>
                <Avatar>{item?.name[0] || "K"}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item?.name}
                secondary={item?.description}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      ))}
      {/* generate(
          ) */}
    </List>
  );
};

export default ListTwoLine;
