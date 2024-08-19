import { axiosClassic, instance } from '@/app/api/axios';

import { removeFromStorage, saveTokenStorage } from './auth.helper';
import { IAuthResponse, IFormData } from './auth.types';
import { IUser } from '@/interface/interface-user';

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken',
}

export const authService = {
  async login(data: IFormData) {
    const response = await axiosClassic.post<IAuthResponse>(`/auth/login`, data);

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },
  async register(data: IFormData) {
    const response = await axiosClassic.post<IAuthResponse>(`/auth/register`, data);

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },

  async addUser(data: IFormData) {
    const response = await axiosClassic.post<IAuthResponse>('/auth/register', data);
    return response;
  },

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>('/auth/login/access-token');

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },

  async logout() {
    const response = await axiosClassic.post<boolean>('/auth/logout');
    if (response.data) removeFromStorage();

    return response;
  },

  async users() {
    const response = await instance.get<IUser[]>(`/auth/users`, {});
    return response;
  },
};
