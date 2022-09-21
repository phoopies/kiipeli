import axios from "axios";
import { BASE_URL } from "./config";
// import { parseObjectsArray } from './helpers';

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
const wallService = {
  getWalls,
};

export default wallService;
