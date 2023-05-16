import { Marker } from '@kiipeli/image-marker';
import { Box } from '@mui/material';

type CustomMarkerProps = {
  marker: Marker;
};

export default function CustomMarker({ marker }: CustomMarkerProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        opacity: 0.6,
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: 'red',
      }}
      borderRadius="100%"
    />
  );
}
