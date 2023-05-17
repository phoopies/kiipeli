import { LoginParams, RegisterParams } from '../types';
import authService from '../services/authService';
import { useContext } from 'react';
import { UserContext, UserContextType } from '../contexts/UserContext';

export default function useAuth() {
  const { setUser } = useContext<UserContextType>(UserContext);
  const login = async (params: LoginParams) => {
    const data = await authService.login(params);
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const register = async (params: RegisterParams) => {
    const data = await authService.register(params);
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  return { register, login, logout };
}
