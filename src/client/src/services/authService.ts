import axios from './axios';
import { LoginParams, RegisterParams } from '../types';
import { BASE_URL } from './config';

export const login = async ({ username, password }: LoginParams) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Login failed. Check credentials.');
  }
};

export const register = async ({
  username,
  password,
  passwordConfirm,
}: RegisterParams) => {
  if (password !== passwordConfirm) {
    throw new Error("Passwords don't match");
  }
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error('Registration failed.');
  }
};

export const logout = () => {
  localStorage.clear();
};

export const me = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/me`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch me');
  }
};

export default {
  login,
  register,
  me,
  logout,
};
