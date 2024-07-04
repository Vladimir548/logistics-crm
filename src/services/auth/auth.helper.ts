import Cookies from 'js-cookie';

import { EnumTokens } from './auth.service';
import { jwtDecode } from 'jwt-decode';
import { IDataToken } from '@/interface/interface-data-token';


export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const getIdUser = () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    const dataToken = jwtDecode<IDataToken>(accessToken);
    return dataToken.id;
  }
};
export const saveTokenStorage = (accessToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: 'localhost',
    sameSite: 'strict',
    expires: 1,
  });
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN);
};
