import axios from './axios';
import { BASE_URL } from './config';
import { FormRoute, Hold, PopulatedRoute, Route } from '../types';

const get = async (routeId: string): Promise<PopulatedRoute | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/routes/${routeId}`);
    return response.data;
  } catch (error) {
    console.log('Errors fetching finds data', error);
    return null;
  }
};

// Tällä hetkellä ottaa vastaan käyttäjän, heittää token+id combon headereihin.
const getAll = async (wallId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/routes/wall/${wallId}`);
    console.log('Found routes', response.data);
    return response.data;
  } catch (error) {
    console.log('Errors fetching finds data', error);
    return [];
  }
};

const add = async ({
  wallId,
  route: { name, grade, description, holds },
}: {
  wallId: string;
  route: FormRoute & {holds: Hold[]};
}) => {
  const body = { name, grade, description, holds }; // TODO get user from token
  try {
    const response = await axios.post(
      `${BASE_URL}/routes/wall/${wallId}`,
      body
    );
    console.log('adding route', response.data);
    return response.data;
  } catch (error) {
    console.log('Errors adding route', error);
    return null;
  }
};

const remove = async ({ route }: { route: Route }) => {
  try {
    const response = await axios.delete(`${BASE_URL}/routes/${route.id}`);
    return response.data;
  } catch (error) {
    console.log('Errors deleting route', error);
    return null;
  }
};

const routesService = {
  add,
  get,
  getAll,
  remove,
};

export default routesService;
