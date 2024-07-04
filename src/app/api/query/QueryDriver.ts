import { axiosClassic, instance } from '@/app/api/axios';
import { IDriver } from '@/interface/interface-driver';

export const QueryDriver = {
  async getCarrierIdDriver(id: number) {
    if (id) {
      const { data } = await axiosClassic.get<IDriver[]>(`/driver/carrier/${id}`);
      return data as IDriver[];
    }
  },
  async getAll() {
    const { data } = await axiosClassic.get<IDriver[]>(`/driver/all`);

    return data as IDriver[];
  },

  async create(value: IDriver) {
    const { data } = await instance.post<IDriver>('/driver/create', value);
    return data as IDriver;
  },
};
