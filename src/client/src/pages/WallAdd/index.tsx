import { Box, Button, Input, Typography } from '@mui/material';
import ImageMarker, { Marker } from '@kiipeli/image-marker';
import { useState } from 'react';
import CustomMarker from '../../components/customMarker';

const MARKER_MAX_WIDTH = 50;
const MARKER_MIN_WIDTH = 3;

export default function WallAdd() {
  const [holds, setHolds] = useState<Marker[]>([]);

  const isSameMarker = (m1: Marker, m2: Marker) =>
    m1.x === m2.x && m1.y === m2.y;

  const updateHoldWidth = (hold: Marker, width: number) => {
    const updatedHold = { ...hold, width };
    setHolds((prev) =>
      prev.map((pHold) => (isSameMarker(pHold, hold) ? updatedHold : pHold))
    );
    return updatedHold;
  };

  const handleMarkerZoom = (marker: Marker, dir: 'IN' | 'OUT') => {
    const updatedMarkerW = marker.width + (dir === 'IN' ? -1 : 1);
    const newMarkerW = Math.min(
      MARKER_MAX_WIDTH,
      Math.max(MARKER_MIN_WIDTH, updatedMarkerW)
    );
    updateHoldWidth(marker, newMarkerW);
  };

  return (
    <Box sx={{ my: '1rem' }}>
      <Input placeholder="Wall name" />
      <Typography>Mark all the holds on the wall</Typography>
      <ImageMarker
        markers={holds}
        image="/jklkiipeilykeskus.jpg"
        MarkerComponent={CustomMarker}
        defaultNewMarkerWidth={5}
        onMarkerZoomIn={(marker) => handleMarkerZoom(marker, 'IN')}
        onMarkerZoomOut={(marker) => handleMarkerZoom(marker, 'OUT')}
        onAddMarker={(marker) => setHolds((prev) => [...prev, marker])}
        onMarkerClick={(marker) =>
          setHolds((prev) =>
            prev.filter((pHold) => !isSameMarker(pHold, marker))
          )
        }
      />
      <Button>Create wall</Button>
    </Box>
  );
}
