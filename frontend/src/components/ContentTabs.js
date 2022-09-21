import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRoutes } from "../reducers/routesSlice";

const ContentTabs = ({ index, handleChange }) => {
  const dispatch = useDispatch();
  const { wall } = useSelector((state) => state.wall);
  const handleRefresh = (e) => {
    console.log(wall);
    if (index === 0) wall && dispatch(getRoutes(wall));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "primary.main",
      }}
    >
      <Tabs
        value={index}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab
          onClick={handleRefresh}
          sx={{ color: "secondary.dark" }}
          label="Seinä"
        />
        <Tab sx={{ color: "secondary.dark" }} label="Reittilistaus" />
        <Tab sx={{ color: "secondary.dark" }} label="Info" />
      </Tabs>
    </Box>
  );
};

export default ContentTabs;
