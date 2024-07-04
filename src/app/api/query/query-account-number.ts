import { axiosClassic, instance } from '@/app/api/axios';
import { AccountNumberResponse, IAccountNumber } from '@/interface/interface-account-number';

export const QueryAccountNumber = {
  async getAll() {
    const { data } = await axiosClassic.get<IAccountNumber[]>('/account/accounts');
    return data as IAccountNumber[];
  },
  async create(dto: IAccountNumber) {
    const { data } = await instance.post<IAccountNumber>('/account/create', dto);
    return data as IAccountNumber;
  },
};
