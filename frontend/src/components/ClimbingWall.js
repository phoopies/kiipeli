import { useEffect, useRef, useState } from "react";
import PinchZoomPan from "react-image-zoom-pan";
import {
  getClickPosition,
  getDimensions,
  getOffsets,
  getRelativePosition,
  getScaledDimensions,
  getTouchPosition,
  getTranslatedOffsets,
  getTranslation,
} from "./helpers";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const createHold = (position) => {
  return {
    id: Date.now(),
    x: position.x, // Get relative TODO: MAKE NOT DUMB
    y: position.y, // Get relative
    color: "red",
    size: 10,
  };
};

const calculateHoldSize = (holdSize, imageDimensions) => {
  const size =
    imageDimensions.width >= imageDimensions.height
      ? imageDimensions.height / 3.5 / holdSize
      : imageDimensions.width / 3.5 / holdSize;
  return size;
};

const ClimbingWall = ({
  display = true,
  route,
  mode = "route",
  newRoute = [], // This is for getting new route
  setNewRoute,
  image = null,
}) => {
  console.log(mode);

  // TODO: NÄIDEN PITÄÄ OLLA TÄSSÄ NYT!
  const [maxWidth, setMaxWidth] = useState(
    800 >= window.innerWidth ? window.innerWidth : 800
  );
  const [maxHeight, setMaxHeight] = useState(0); // Get this on imgLoad;
  const [canvasHeight, setCanvasHeight] = useState(0); // Get this on imgLoad;
  const { holds } = useSelector((state) => state.wall.wall);
  console.log("holds", holds);
  const canvasRef = useRef(null);
  const handleRightClick = () => null;
  /*
  const handleRightClick = () =>
    setNewHolds((holds) => [...holds].slice(0, -1));
*/
  const calculateClosestToPoint = (relativePosition, holdArray) => {
    if (!holdArray) return null;
    let closestHold = null;
    let closestDistance = Number.POSITIVE_INFINITY;
    for (let hold of holdArray) {
      let x = Math.abs(relativePosition.x - hold.x);
      let y = Math.abs(relativePosition.y - hold.y);
      if (x + y < closestDistance) {
        closestDistance = x + y;
        closestHold = hold;
      }
      console.log("Distance of Hold:", x + y);
    }
    console.log("ClosestDistance = ", closestDistance);
    console.log("Closest Hold = ", closestHold);
    return closestHold ? closestHold : holdArray[0];
  };

  // Handles image loading
  const handleImageLoad = (e) => {
    // Get width / height, then set maxheight based on this
    // console.log("IMAGE LOADING");
    const { offsetWidth, offsetHeight } = e.target;
    // console.log(offsetWidth, offsetHeight);
    const ratio = maxWidth / offsetWidth;
    // setMaxHeight(ratio * offsetHeight);
  };

  // This is the clickhandler
  useEffect(() => {
    if (mode !== "add") return;

    const getHold = (relativePosition) => {
      const image = document.getElementById("image");
      const translation = getTranslation(image);
      const imageDimensions = getScaledDimensions(image, translation.scale);

      const foundHolds = [];
      for (const hold of holds) {
        // Check if inside the radius
        const elementWidth =
          calculateHoldSize(hold.size, imageDimensions) / 1000;
        // console.log(elementWidth);
        if (
          Math.sqrt(
            (relativePosition.x - hold.x) * (relativePosition.x - hold.x) +
              (relativePosition.y - hold.y) * (relativePosition.y - hold.y)
          ) < elementWidth
        ) {
          foundHolds.push(hold);
          // return hold;
        }
      }
      if (foundHolds.length)
        return calculateClosestToPoint(relativePosition, foundHolds);
      return null;
    };

    // HANDLERS
    const handleClick = (e) => {
      // We need info of canvas
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Get wanted elements
      const image = document.getElementById("image");
      const wallContainer = document.getElementById("wallContainer");

      const translation = getTranslation(image);
      const imageDimensions = getScaledDimensions(image, translation.scale);
      const canvasDimensions = getDimensions(wallContainer); // These we have to get from the container, no idea why

      const offsets = getOffsets(wallContainer); // These need to be from the container
      const translatedOffsets = getTranslatedOffsets(translation.translate); // Somehow these are not 0 on start

      // Check if its touch
      const clickPosition =
        e.type === "touchend" ? getTouchPosition(e) : getClickPosition(e);

      const relativePosition = getRelativePosition(
        clickPosition,
        offsets,
        translatedOffsets,
        imageDimensions
      ); // Relative to the image
      console.log("click", clickPosition);
      console.log("relative", relativePosition);
      /*

      if (e.button === 0) {
        const newHold = createHold(relativePosition);
        setNewHolds((holds) => [...holds, newHold]);
      }
      if (e.button === 2) {
        handleRightClick();
      }
      */

      const hold = getHold(relativePosition);

      if (!hold) return;
      const oldHold = newRoute.find((r) => r.id === hold.id);
      // console.log(oldHold);
      if (oldHold) {
        // Delete by just left clicking
        if (oldHold.color === "green")
          return setNewRoute(newRoute.filter((el) => el.id !== hold.id));
        // Generate new reoute
        const fullRoute = newRoute.map((h) => {
          if (h.id === hold.id)
            // Modify the color
            return { ...h, color: h.color === "red" ? "green" : "red" };
          return h;
        });
        return setNewRoute(fullRoute);
      }
      hold && setNewRoute((route) => [...route, { ...hold, color: "red" }]);
    };

    // Creates click handler, handles also long clicks and drags.
    const createClickHandler = (element) => {
      // CLICKHANDLER
      const delta = 6;
      const timeDelta = 200;
      let startTime;
      let startX;
      let startY;

      const mouseDownListener = (event) => {
        // console.log("touching/mouse");
        startX = event.pageX;
        startY = event.pageY;
        startTime = new Date();
      };

      const mouseUpListener = (event) => {
        const diffX = Math.abs(event.pageX - startX);
        const diffY = Math.abs(event.pageY - startY);
        const diffTime = new Date() - startTime;

        // On valid click
        if (diffX < delta && diffY < delta && diffTime < timeDelta) {
          // console.log("valid click");
          handleClick(event);
        }
      };

      const touchDownListener = (event) => {
        event.preventDefault();
        startX = event.changedTouches[0]?.clientX;
        startY = event.changedTouches[0]?.clientY;
        startTime = new Date();
      };

      const touchUpListener = (event) => {
        const diffX = Math.abs(event.changedTouches[0]?.clientX - startX);
        const diffY = Math.abs(event.changedTouches[0]?.clientY - startY);
        const diffTime = new Date() - startTime;

        // On valid click
        if (diffX < delta && diffY < delta && diffTime < timeDelta) {
          // console.log("valid click");
          handleClick(event);
        }
      };

      const createListeners = (element, listeners) => {
        for (const { event, listener } of listeners) {
          element.addEventListener(event, listener);
        }
      };

      const removeListeners = (element, listeners) => {
        // console.log("removing event listeners");
        for (const { event, listener } of listeners) {
          element.removeEventListener(event, listener);
        }
      };

      // Listeners for the click
      const listeners = [
        { event: "mousedown", listener: mouseDownListener },
        { event: "mouseup", listener: mouseUpListener },
        { event: "touchstart", listener: touchDownListener },
        { event: "touchend", listener: touchUpListener },
      ];

      createListeners(element, listeners);
      return () => removeListeners(element, listeners);
    };

    const imageElement = document.getElementById("image");
    const listenerRemover = createClickHandler(imageElement);

    return () => {
      listenerRemover();
    };
  }, [holds, mode, newRoute, setNewRoute]);

  // Drawhandler
  useEffect(() => {
    const drawHold = (context, hold, imageDimensions, canvasDimensions) => {
      // const { x, y } = getCanvasCoordinates(hold, canvasDimensions);
      context.save(); // STEP 1

      context.strokeStyle = hold.color ? hold.color : "red";
      context.lineWidth = 4;
      context.beginPath();
      context.arc(
        hold.x,
        hold.y,
        calculateHoldSize(hold.size, imageDimensions),
        0,
        2 * Math.PI
      );

      /* TODO: Make sure this works */
      // First we clip
      context.clip();
      // CLears only the clipped
      context.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
      context.stroke();
      // Restore
      context.restore();
      //context.stroke();
    };

    const draw = (canvas, context) => {
      const canvasDimensions = getDimensions(canvas);

      // Get coordinates relative to the image
      const image = document.getElementById("image");
      const wallContainer = document.getElementById("wallContainer");
      const translation = getTranslation(image);
      const imageDimensions = getScaledDimensions(image, translation.scale);
      const offsets = getOffsets(wallContainer); // These need to be from the container
      const translatedOffsets = getTranslatedOffsets(translation.translate); // Somehow these are not 0 on start

      const getCoordinatesFromTranslation = (
        hold,
        offsetOrigin,
        offsetTranslate,
        canvasDimensions,
        imageDimensions
      ) => {
        return {
          x: hold.x * imageDimensions.width + offsetTranslate.left,
          y: hold.y * imageDimensions.height + offsetTranslate.top,
        };
      };

      if (mode === "route") {
        // Make it dark
        context.clearRect(
          0,
          0,
          canvasDimensions.width,
          canvasDimensions.height
        );
        if (!route?.holds) return;
        context.globalAlpha = 0.5;
        context.fillStyle = "black";
        context.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
        for (let routeHold of route.holds) {
          const hold = holds.find((hold) => hold.id === routeHold.id);

          // console.log(hold);
          // Get the canvas coordinates
          const { x, y } = getCoordinatesFromTranslation(
            hold,
            offsets,
            translatedOffsets,
            canvasDimensions,
            imageDimensions
          );
          if (x >= 0 && y >= 0) {
            const coordinateCorrectedHold = {
              ...hold,
              x,
              y,
              color: routeHold.color,
            };
            drawHold(
              context,
              coordinateCorrectedHold,
              imageDimensions,
              canvasDimensions
            );
          }
        }
      }

      if (mode === "add") {
        context.clearRect(
          0,
          0,
          canvasDimensions.width,
          canvasDimensions.height
        );

        for (let hold of newRoute) {
          // Get the canvas coordinates
          const { x, y } = getCoordinatesFromTranslation(
            hold,
            offsets,
            translatedOffsets,
            canvasDimensions,
            imageDimensions
          );
          if (x >= 0 && y >= 0) {
            const coordinateCorrectedHold = {
              ...hold,
              x,
              y,
              color: hold.color,
            };
            drawHold(
              context,
              coordinateCorrectedHold,
              imageDimensions,
              canvasDimensions
            );
          }
        }
      }
    };

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Observe the zoom
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutationRecord) {
        draw(canvas, context);
      });
    });

    const element = document.getElementById("wallContainer");
    setCanvasHeight(element.offsetHeight);

    var target = document.getElementById("image");
    observer.observe(target, { attributes: true, attributeFilter: ["style"] });

    // Draw once
    draw(canvas, context);
  }, [holds, mode, newRoute, route.holds]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "hidden",
        display: display ? "flex" : "none",
        flexDirection: "column",
        backgroundColor: "primary.light",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        id="wallContainer"
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: `${maxWidth}px`, // Make everything related to this
          // Tässä oli aiemmin myös maxheight
          aspectRatio: `${maxWidth} / ${maxHeight}`,
          position: "relative", // relative / absolute for the canvas positioning
          display: "block",
        }}
      >
        <PinchZoomPan maxScale={2} zoomButtons={false} position="center">
          <img
            onLoad={handleImageLoad}
            id="image"
            alt="Climbing Wall"
            src={image}
          />
        </PinchZoomPan>
        <canvas
          ref={canvasRef}
          onContextMenu={handleRightClick}
          height={canvasHeight}
          width={maxWidth}
          className="canvas"
          id="canvas"
        />
      </Box>
    </Box>
  );
};

export default ClimbingWall;
