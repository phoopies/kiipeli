import axios from 'axios';
import { BASE_URL } from './config';

/* eslint-disable */
const getWalls = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/walls`);
    return response.data;
  } catch (error) {
    console.log("Errors fetching walls", error);
    return [];
  }
};

/* eslint-disable */
const getWall = async (wallId) => {
  console.log(`${BASE_URL}/walls/${wallId}`);

  try {
    const response = await axios.get(`${BASE_URL}/walls/${wallId}`);
    return response.data;
  } catch (error) {
    console.log("Errors fetching wall", error);
    return null;
  }
};

const wallService = {
  getWall,
  getWalls,
};

export default wallService;
