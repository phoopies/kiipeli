import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBarDefault from '../components/AppBarDefault';
import WallFooterSkeleton from '../components/WallFooterSkeleton';
import ClimbingWall from '../components/ClimbingWall';
import useTimeout from '../hooks/useTimeout';
import Splash from '../components/Splash';
import { getWall } from '../reducers/wallSlice';
import { getRoutes } from '../reducers/routesSlice';
import WallFooterAddRoute from '../components/WallFooterAddRoute';
import ContentTabsAddRoute from '../components/ContentTabsAddRoute';
import AddRouteForm from '../components/AddRouteForm';

function WallAddRoute() {
  const { wallId } = useParams();
  const { wall } = useSelector((state) => state.wall);
  const [newRoute, setNewRoute] = useState([]);
  const [index, setIndex] = useState(0);
  const show = useTimeout(1000);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e, newValue) => {
    setIndex(newValue);
  };

  const handleArrowClick = () => {
    setIndex(1);
  };

  const handleStartClick = () => {
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
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
    >
      <AppBarDefault
        icon={<ArrowBackIos />}
        startClickHandler={handleStartClick}
        header="Lisää Reitti"
        clickable
      />
      <ContentTabsAddRoute index={index} handleChange={handleChange} />
      {index === 0 &&
        (show ? (
          <ClimbingWall
            route={[]}
            mode="add"
            newRoute={newRoute}
            setNewRoute={setNewRoute}
            image="/jklkiipeilykeskus.jpg"
          />
        ) : (
          <Splash type="full" speed={500} />
        ))}
      {index === 1 && (
        <AddRouteForm sx={{ display: 'none' }} route={newRoute} />
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
            route={[]}
            mode={"add"}
            newRoute={newRoute}
            setNewRoute={setNewRoute}
            image={`/boulderpaja.jpeg`}
          />
        ) : (
          <Splash type="full" speed={500} />
        )}

        <AddRouteForm sx={{ display: "none" }} route={newRoute} />
      </SwipeableViews>

        */}

      {wall ? (
        <WallFooterAddRoute index={index} handleClick={handleArrowClick} />
      ) : (
        <WallFooterSkeleton />
      )}
    </Box>
  );
}

export default WallAddRoute;
