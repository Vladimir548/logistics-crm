import { instance } from '@/app/api/axios';
import { IUser } from '@/interface/interface-user';

export const QueryUser = {
  async getUserID(id: number) {
    const { data } = await instance.get<IUser>(`/auth/${id}/user`);

    return data as IUser;
  },
};
