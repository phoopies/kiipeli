import { useEffect, useRef } from 'react';
import { Marker as IMarker, MarkerComponentProps } from './types';

type MarkerProps<T extends IMarker> = {
  marker: T;
  MarkerComponent?: (props: MarkerComponentProps<T>) => JSX.Element;
  onMarkerClick?: (marker: T) => void;
  onMarkerZoomIn?: (marker: T) => void;
  onMarkerZoomOut?: (marker: T) => void;
  imageWidthToHeight: number;
};

export default function Marker<T extends IMarker>({
  marker,
  imageWidthToHeight,
  MarkerComponent,
  onMarkerClick,
  onMarkerZoomIn,
  onMarkerZoomOut,
}: MarkerProps<T>) {
  const markerRef = useRef<HTMLDivElement>(null);

  // By default react wheel event is passive thus this is required
  useEffect(() => {
    markerRef.current?.addEventListener('wheel', onMarkerWheel, {
      passive: false,
    });
  }, [marker]);

  const getPosition = () => {
    return {
      top: `${marker.y * 100}%`,
      left: `${marker.x * 100}%`,
    };
  };

  const getSize = () => {
    return {
      width: `${marker.width}%`,
      height: `${imageWidthToHeight * marker.width}%`,
    };
  };

  const { width, height } = getSize();
  const { top, left } = getPosition();

  const onMarkerWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0 && onMarkerZoomOut) {
      onMarkerZoomOut(marker);
    } else if (e.deltaY > 0 && onMarkerZoomIn) {
      onMarkerZoomIn(marker);
    }
  };

  return (
    <div
      style={{
        left: left,
        top: top,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        width: width,
        height: height,
        cursor: onMarkerClick ? 'pointer' : 'default',
      }}
      onClick={() => {
        onMarkerClick && onMarkerClick(marker);
      }}
      ref={markerRef}
    >
      {MarkerComponent ? (
        <MarkerComponent marker={marker} />
      ) : (
        'X'
      )}
    </div>
  );
}
