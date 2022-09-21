const parseTransformString = (string) => {
  if (!string) return { translate: "0", scale: "0" };
  const array = string
    .split("scale")
    .map((string) =>
      string.slice(string.indexOf("(") + 1, string.lastIndexOf(")"))
    );
  return { translate: array[0], scale: array[1] };
};

const getTranslation = (element) => {
  const transform = element.style?.transform;
  if (!transform) return { translate: "0,0,0", scale: "0" };
  return parseTransformString(transform);
};

const getDimensions = (element) => {
  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
};

const getScaledDimensions = (element, scale) => {
  return {
    width: element.offsetWidth * scale,
    height: element.offsetHeight * scale,
  };
};

const getRelativePosition = (
  clickPosition,
  offsetOrigin,
  offsetTranslate,
  imageDimensions
) => {
  return {
    x:
      (clickPosition.x - offsetTranslate.left - offsetOrigin.left) / // TÄÄ OLI ENNEN + Math.abs(offsetranslate.left)
      imageDimensions.width, // Get relative TODO: MAKE NOT DUMB
    y:
      (clickPosition.y - offsetTranslate.top - offsetOrigin.top) /
      imageDimensions.height,
  }; // Get relative
};

const getCoordinatePosition = (relativeCoordinates, imageDimensions) => {
  return {
    x: imageDimensions.width * relativeCoordinates.x,
    y: imageDimensions.height * relativeCoordinates.y,
  };
};

const getCanvasPosition = (clickPosition, offsetOrigin, canvasDimensions) => {
  return {
    x: (clickPosition.x - offsetOrigin.left) / canvasDimensions.width, // Get relative TODO: MAKE NOT DUMB
    y: (clickPosition.y - offsetOrigin.top) / canvasDimensions.height, // Get relative
  };
};

const getCanvasCoordinates = (canvasPosition, canvasDimensions) => {
  return {
    x: canvasPosition.x * canvasDimensions.width,
    y: canvasPosition.y * canvasDimensions.height,
  };
};

const getTranslatedOffsets = (translate) => {
  return {
    left: parseInt(translate.split(",")[0]),
    top: parseInt(translate.split(",")[1]),
  };
};

const getOffsets = (element) => {
  // these are relative to the viewport, i.e. the window
  var viewportOffset = element.getBoundingClientRect();
  return {
    left: viewportOffset.left,
    top: viewportOffset.top,
  };
};

const getClickPosition = (event) => {
  return {
    x: event.pageX,
    y: event.pageY,
  };
};

const getTouchPosition = (event) => {
  return {
    x: event.changedTouches[0]?.clientX,
    y: event.changedTouches[0]?.clientY,
  };
};

export {
  getCanvasCoordinates,
  getCanvasPosition,
  getClickPosition,
  getCoordinatePosition,
  getDimensions,
  getOffsets,
  getRelativePosition,
  getScaledDimensions,
  getTouchPosition,
  getTranslatedOffsets,
  getTranslation,
};
