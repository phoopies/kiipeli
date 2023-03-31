import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWall } from "../reducers/wallSlice";
import { Box, Button, Typography } from "@mui/material";
import useTimeout from "../hooks/useTimeout";
import Splash from "../components/Splash";
import AppBarDefault from "../components/AppBarDefault";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { getWalls } from "../reducers/wallsSlice";
import ListTwoLine from "../components/ListTwoLine";
import { Person } from "@mui/icons-material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home = () => {
  const [open, setOpen] = useState(false);
  const { walls, loading } = useSelector((state) => state.walls);
  console.log("walls", walls);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleEndClick = (e) => {
    console.log("clicked");
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getWalls());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <AppBarDefault
        clickable
        icon={<MenuIcon />}
        header="KIIPELI"
        endIcon={<Person />}
        endClickHandler={handleEndClick}
      />
      {loading === "pending" ? (
        <Splash type="full" timeout={2000} />
      ) : (
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            paddingRight: "16px",
          }}
        >
          <ListTwoLine items={walls} />
        </Box>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Ei valitettavasti vielä toteutettu"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Ei vaadi sisäänkirjautumista. Käyttäjienhallinta tulee
            tulevaisuudessa!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
