import axios from 'axios';
import { BASE_URL } from './config';

// Tällä hetkellä ottaa vastaan käyttäjän, heittää token+id combon headereihin.
const getRoutes = async (wall) => {
  try {
    const response = await axios.get(`${BASE_URL}/routes/wall/${wall.id}`);
    console.log('Found routes', response.data);
    return response.data;
  } catch (error) {
    console.log('Errors fetching finds data', error);
    return [];
  }
};

const addRoute = async ({ wall, user, name, grade, description, holds }) => {
  const body = { user, name, grade, description, holds };
  console.log(body);
  try {
    const response = await axios.post(
      `${BASE_URL}/routes/wall/${wall.id}`,
      body
    );
    console.log('adding route', response.data);
    return response.data;
  } catch (error) {
    console.log('Errors adding route', error);
    return null;
  }
};

const removeRoute = async ({ route }) => {
  try {
    const response = await axios.delete(`${BASE_URL}/routes/${route.id}`);
    return response.data;
  } catch (error) {
    console.log('Errors deleting route', error);
    return null;
  }
};

const routesService = {
  addRoute,
  getRoutes,
  removeRoute,
};

export default routesService;
