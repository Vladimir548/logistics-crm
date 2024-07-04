import { axiosClassic, instance } from '@/app/api/axios';

import { ICarrierContact } from '@/interface/interface-carrier-contact';
import { ICostumerContact } from '@/interface/interface-costumer-contact';

export const QueryContactCarrier = {
  async getCarrierIdContact(id: number) {
    if (id) {
      const { data } = await axiosClassic.get<ICarrierContact[]>(`/carrier-contact/carrier/${id}`);

      return data as ICarrierContact[];
    }
  },
  async getAll() {
    const { data } = await axiosClassic.get<ICarrierContact[]>(`/carrier-contact/all`);

    return data as ICarrierContact[];
  },

  async create(value: ICarrierContact) {
    const { data } = await instance.post<ICarrierContact>('/carrier-contact/create', value);
    return data as ICarrierContact;
  },
};
