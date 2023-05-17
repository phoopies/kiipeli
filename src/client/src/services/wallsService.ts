import axios from './axios';
import { BASE_URL } from './config';
import { HoldedWall, Wall } from '../types';

const getAll = async (): Promise<Wall[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/walls`);
    console.log(response)
    return response.data as Wall[];
  } catch (error) {
    console.log('Errors fetching walls', error);
    return [];
  }
};

const get = async (wallId: string): Promise<HoldedWall | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/walls/${wallId}`);
    return response.data as HoldedWall;
  } catch (error) {
    console.log('Errors fetching wall', error);
    return null;
  }
};

const wallService = {
  get,
  getAll,
};

export default wallService;
