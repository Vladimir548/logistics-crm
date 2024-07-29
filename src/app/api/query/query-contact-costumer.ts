import { axiosClassic, instance } from '@/app/api/axios';

import {ICostumerContact, ICostumerContactResponse} from '@/interface/interface-costumer-contact';
import {IQueryAllParams} from "@/app/api/query/QueryCostumer";

export const QueryContactCostumer = {
  async getCostumerIdContact({id,take,offset,query}: {
    id: number,
    take?: number,
    offset?: number,
    query?: string
  }) {
      const { data } = await axiosClassic.get<ICostumerContactResponse>(`/costumer-contact/costumer/${id}`,{
        params: {
          id,
          query,
          take,
          offset
        },
      });

      return data as ICostumerContactResponse;

  },
  async getAll({take,offset,query}: {

    take?: number,
    offset?: number,
    query?: string
  }) {
    const { data } = await axiosClassic.get<ICostumerContactResponse>(`/costumer-contact/all` , {
      params: {
        take,
        query,
        offset
      },
    });
    return data as ICostumerContactResponse;
  },

  async create(value: ICostumerContact) {
    const { data } = await instance.post<ICostumerContact>('/costumer-contact/create', value);
    return data as ICostumerContact;
  },
  async update(value: ICostumerContact,id:number) {
    const { data } = await instance.post<ICostumerContact>(`/costumer-contact/update/${id}`, value);
    return data as ICostumerContact;
  },
  async delete(id: number) {
    const { data } = await instance.post<ICostumerContact>(`/costumer-contact/delete/${id}`);
    return data as ICostumerContact;
  },async getId(id: number) {
    const { data } = await instance.get<ICostumerContact>(`/costumer-contact/${id}`);
    return data as ICostumerContact;
  },
};
