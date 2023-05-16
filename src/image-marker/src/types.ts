export type Marker = {
  y: number;
  x: number;
  width: number;
};

export type MarkerComponentProps<T extends Marker> = { marker: T };
