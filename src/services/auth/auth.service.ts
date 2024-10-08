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

  // async addUser(data: IFormData) {
  //   const response = await axiosClassic.post<IAuthResponse>('/auth/register', data);
  //   return response;
  // },

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
    const {data} = await instance.get<IUser[]>(`/auth/users`, {});
    return data as IUser[];
  },async userId(id:number) {
    const {data} = await instance.get<IUser>(`/auth/user/${id}`, {});
    return data as IUser;
  },
  async delete(id:number) {
    const {data} = await instance.post<IUser>(`/auth/delete/${id}`, {});
    return data as IUser;
  },
  async editing(id:number,dto:IUser) {
    const {data} = await instance.post<IUser>(`/auth/editing/${id}`, dto);
    return data as IUser;
  },async create(dto:IFormData) {
    const {data} = await instance.post<IUser>(`/auth/create`, dto);
    return data as IUser;
  },
};
