import { instance } from '@/app/api/axios';
import { IUser } from '@/interface/interface-user';

export const QueryUser = {
  async getUserID(id: string | undefined) {
    const { data } = await instance.get<IUser>(`/auth/user/${id}`);

    return data as IUser;
  },
};
