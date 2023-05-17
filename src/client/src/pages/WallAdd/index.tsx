import { Stack, Button, Input, Typography } from '@mui/material';
import ImageMarker, { Marker } from '@kiipeli/image-marker';
import { useState } from 'react';
import CustomMarker from '../../components/customMarker';

const MARKER_MAX_WIDTH = 50;
const MARKER_MIN_WIDTH = 3;

export default function WallAdd() {
  const [holds, setHolds] = useState<Marker[]>([]);
  const [name, setName] = useState('');
  const [uploadedImage, setUploadedImage] = useState<null | File>(null);

  const canCreateWall = !!uploadedImage && holds.length > 0 && !!name

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

  const handleCreateWall = async () => {
    if (!canCreateWall) {
      return
    }
    return;
  }

  return (
    <Stack sx={{ my: '1rem' }}>
      <Button component="label">
        {uploadedImage ? 'Upload other image' : 'Upload image'}
        <input
          type="file"
          accept="image/png, image/jpeg"
          hidden
          onChange={(event) =>
            setUploadedImage(event.target.files ? event.target.files[0] : null)
          }
        />
      </Button>
      <Input
        placeholder="Wall name"
        onChange={(e) => setName(e.target.value)}
      />
      {uploadedImage && (
        <>
          <Typography>Mark all the holds on the wall</Typography>
          <ImageMarker
            markers={holds}
            image={URL.createObjectURL(uploadedImage)}
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
        </>
      )}
      <Button
        variant="contained"
        onClick={handleCreateWall}
        disabled={!canCreateWall}
      >
        Create wall
      </Button>
    </Stack>
  );
}
