import { Box, Fade } from "@mui/material";

const Splash = ({ type, speed }) => {
  const style = {
    width: "100%",
    height: type === "full" ? "100%" : "min-content",
    backgroundColor: "primary.main",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Box sx={style}>
      <Fade appear={true} in={true} timeout={speed}>
        <img alt="splash" src={process.env.PUBLIC_URL + "/kiipeli.svg"} />
      </Fade>
    </Box>
  );
};

export default Splash;
