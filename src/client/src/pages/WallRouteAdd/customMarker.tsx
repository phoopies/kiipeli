import { Marker } from '@kiipeli/image-marker';
import { Box } from '@mui/material';

type CustomMarkerProps = {
  marker: Marker & {selected: boolean};
};

export default function CustomMarker({ marker }: CustomMarkerProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        opacity: 0.4,
        border: marker.selected ?'4px solid' : 'none',
        borderColor: 'red'
      }}
      borderRadius="100%"
    />
  );
}
