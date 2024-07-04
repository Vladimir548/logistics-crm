import { axiosClassic, instance } from '@/app/api/axios';

import { ICostumerContact } from '@/interface/interface-costumer-contact';

export const QueryContactCostumer = {
  async getCostumerIdContact(id: number) {
    if (id) {
      const { data } = await axiosClassic.get<ICostumerContact[]>(
        `/costumer-contact/costumer/${id}`,
      );

      return data as ICostumerContact[];
    }
  },
  async getAll() {
    const { data } = await axiosClassic.get<ICostumerContact[]>(`/costumer-contact/all`);

    return data as ICostumerContact[];
  },

  async create(value: ICostumerContact) {
    const { data } = await instance.post<ICostumerContact>('/costumer-contact/create', value);
    return data as ICostumerContact;
  },
};
