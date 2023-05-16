import * as React from 'react';
import { calculateMarkerPosition } from './util';
import { Marker as IMarker, MarkerComponentProps } from './types';
import Marker from './Marker';

type Props<T extends IMarker> = React.HTMLProps<HTMLDivElement> & {
  image: string;
  markers: T[];
  onAddMarker?: (marker: IMarker) => void;
  onMarkerClick?: (marker: T) => void;
  onMarkerZoomIn?: (marker: T) => void;
  onMarkerZoomOut?: (marker: T) => void;
  MarkerComponent?: (props: MarkerComponentProps<T>) => JSX.Element;
  imageProps?: React.HTMLProps<HTMLImageElement>;
  defaultNewMarkerWidth?: number;
};

export default function ImageMarker<T extends IMarker>({
  image,
  markers,
  onAddMarker,
  onMarkerClick,
  onMarkerZoomIn,
  onMarkerZoomOut,
  MarkerComponent,
  imageProps,
  defaultNewMarkerWidth,
  ...props
}: Props<T>) {
  const imageRef = React.useRef<HTMLImageElement>(null);
  const [imageNaturalDimensions, setImageNaturalDimensions] = React.useState({
    height: 0,
    width: 0,
  });
  const isWider = imageNaturalDimensions.width > imageNaturalDimensions.height;

  const handleImageClick = (event: React.MouseEvent) => {
    if (!imageRef.current || !onAddMarker) {
      return;
    }
    const imageDimensions = imageRef.current.getBoundingClientRect();

    const [y, x] = calculateMarkerPosition(
      event,
      imageDimensions,
      window.scrollY,
      0,
      0
    );

    onAddMarker({
      x,
      y,
      width: defaultNewMarkerWidth || 10,
    });
  };

  const widthToHeight =
    imageNaturalDimensions.height > 0
      ? imageNaturalDimensions.width / imageNaturalDimensions.height
      : 0;

  return (
    <>
      <div
        {...props}
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          // height: isWider ? '-moz-fit-content' : '100%',
          // width: isWider ? '100%' : '-moz-fit-content',

        }}
      >
        <img
          style={{
            width: '100%',
            // height: isWider ? 'auto' : '100%',
            // width: isWider ? '100%' : 'auto',
          }}
          {...imageProps}
          src={image}
          onClick={handleImageClick}
          ref={imageRef}
          onLoad={() => {
            if (imageRef.current) {
              setImageNaturalDimensions({
                height: imageRef.current.naturalHeight,
                width: imageRef.current.naturalWidth,
              });
            }
          }}
        />

        {markers.map((marker, i) => (
          <Marker
            marker={marker}
            key={i}
            imageWidthToHeight={widthToHeight}
            MarkerComponent={MarkerComponent}
            onMarkerClick={onMarkerClick}
            onMarkerZoomIn={onMarkerZoomIn}
            onMarkerZoomOut={onMarkerZoomOut}
          />
        ))}
      </div>
    </>
  );
}
