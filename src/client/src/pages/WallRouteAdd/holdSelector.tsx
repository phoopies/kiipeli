import ImageMarker from '@kiipeli/image-marker';
import CustomMarker from './customMarker';
import { Hold } from '../../types';

type Props = {
  holds: Hold[];
  selectedHolds: Hold[];
  setSelectedHolds: React.Dispatch<React.SetStateAction<Hold[]>>;
};

type HoldMarker = {
  id: string;
  y: number;
  x: number;
  width: number;
};

export default function HoldSelector({
  holds,
  selectedHolds,
  setSelectedHolds,
}: Props) {
  const isHoldSelected = (hold: Hold | HoldMarker) =>
    !!selectedHolds.find((sHold) => sHold.id === hold.id);

  const handleHoldClick = (hold: HoldMarker) => {
    const alreadySelected = isHoldSelected(hold);
    if (alreadySelected) {
      return setSelectedHolds((prev) =>
        prev.filter((pHold) => pHold.id !== hold.id)
      );
    }
    setSelectedHolds((prev) => [
      ...prev,
      { id: hold.id, x: hold.x, y: hold.y, size: hold.width },
    ]);
  };

  return (
    <ImageMarker
      markers={holds.map((hold) => ({
        id: hold.id,
        selected: isHoldSelected(hold),
        y: hold.y,
        x: hold.x,
        width: 5,
      }))}
      image="/jklkiipeilykeskus.jpg"
      onMarkerClick={handleHoldClick}
      MarkerComponent={CustomMarker}
    />
  );
}
