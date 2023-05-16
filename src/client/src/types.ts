import { grades } from "./helpers";

export type Hold = {
  id: string;
  x: number;
  y: number;
  size: number;
};

export type Grade = typeof grades[number];

export type Route = {
  id: string;
  wallId: string;
  grade: Grade;
  description: string;
  name: string;
  holds: Hold[];
};

export type FormRoute = Omit<Route, 'wallId' | 'id' | 'holds'>;

export type Wall = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type HoldedWall = Wall & { holds: Hold[] };

export type SliceLoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';
