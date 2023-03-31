import { useDispatch, useSelector } from "react-redux";
import { Box, Slide, Typography } from "@mui/material";
import AppBarDefault from "../components/AppBarDefault";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import ContentTabs from "../components/ContentTabs";
import { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import WallFooterSkeleton from "../components/WallFooterSkeleton";
import WallFooter from "../components/WallFooter";
import ClimbingWall from "../components/ClimbingWall";
import useTimeout from "../hooks/useTimeout";
import Splash from "../components/Splash";
import Routes from "../components/Routes";
import { getWall } from "../reducers/wallSlice";
import { getRoutes } from "../reducers/routesSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Wall = () => {
  const { wallId } = useParams();
  console.log("wallid", wallId);
  const { wall } = useSelector((state) => state.wall);
  const { routes, loading } = useSelector((state) => state.routes);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [index, setIndex] = useState(0);
  const show = useTimeout(1000);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleChange = (e, newValue) => {
    setIndex(newValue);
  };

  const handleArrowClick = (e) => {
    setIndex(1);
  };

  const handleRouteClick = (newValue) => {
    setIndex(0);
    setSelectedRoute(newValue);
  };

  const handleEndClick = (e) => {
    navigate(`${location.pathname}/add`);
  };

  const handleStartClick = (e) => {
    navigate(-1);
  };

  useEffect(() => {
    if (!wall) dispatch(getWall(wallId));
  }, [dispatch, wallId, wall]);

  useEffect(() => {
    if (wall) dispatch(getRoutes(wall));
    // dispatch(getRoutes(wallId));
  }, [dispatch, wall]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <AppBarDefault
        icon={<ArrowBackIos />}
        header={wall ? wall.name : "ERROR"}
        endIcon={<AddIcon />}
        startClickHandler={handleStartClick}
        endClickHandler={handleEndClick}
        clickable
      />
      <ContentTabs index={index} handleChange={handleChange} />
      {index === 0 &&
        (show ? (
          <ClimbingWall
            route={
              routes && selectedRoute !== null
                ? routes.find((route) => route.id === selectedRoute)
                : []
            }
            image={"/jklkiipeilykeskus.jpg"}
            mode="route"
          />
        ) : (
          <Splash type="full" speed={500} />
        ))}
      {index === 1 && <Routes routes={routes} handleClick={handleRouteClick} />}
      {index === 2 && (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">
            Ilmoittakaa bugeista/kehitysideoista kassalle, korjataan jos
            ehditään! -J
          </Typography>
        </Box>
      )}
      {/*
<SwipeableViews
        index={index}
        onChangeIndex={(index) => setIndex(index)}
        enableMouseEvents
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
        slideStyle={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {show ? (
          <ClimbingWall
            route={
              routes && selectedRoute !== null ? routes[selectedRoute] : []
            }
            image={"/boulderpaja.jpeg"}
            mode="route"
          />
        ) : (
          <Splash type="full" speed={500} />
        )}

        <Routes routes={routes} handleClick={handleRouteClick} />
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Ei lisätietoja</Typography>
        </Box>
      </SwipeableViews>
        */}

      {wall ? (
        <WallFooter
          route={
            selectedRoute !== null
              ? routes.find((route) => route.id === selectedRoute)
              : null
          }
          handleClick={handleArrowClick}
        />
      ) : (
        <WallFooterSkeleton />
      )}
    </Box>
  );
};

export default Wall;
