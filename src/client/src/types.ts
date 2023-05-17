import { grades } from './helpers';

export type Hold = {
  id: string;
  x: number;
  y: number;
  size: number;
};

export type Grade = (typeof grades)[number];

export type Route = {
  id: string;
  wallId: string;
  grade: Grade;
  description: string;
  user: string;
  name: string;
};

export type FormRoute = Omit<Route, 'wallId' | 'id' | 'holds'>;

export type PopulatedRoute = {
  id: string;
  wallId: string;
  grade: Grade;
  description: string;
  name: string;
  holds: Hold[];
  user?: User;
};

export type Wall = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type User = {
  id: string;
  username: string;
};

export type HoldedWall = Wall & { holds: Hold[] };

export type SliceLoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';

export type LoginParams = {
  username: string;
  password: string;
};

export type RegisterParams = {
  username: string;
  password: string;
  passwordConfirm: string;
};
