import { axiosClassic, instance } from '@/app/api/axios';

import {ICarrierContact, TCarrierContactResponse} from '@/interface/interface-carrier-contact';
import {IQueryAllParams} from "@/app/api/query/QueryCostumer";

export const QueryContactCarrier = {
  async getCarrierIdContact({id,take,offset,query}: {
    id: number,
    take?: number,
    offset?: number,
    query?: string
  }) {

      const { data } = await axiosClassic.get<TCarrierContactResponse>(`/carrier-contact/carrier/${id}`, {
        params:{
          take,
          offset,
          query
        }
      });

      return data as TCarrierContactResponse;

  },
  async getAll({take, offset, query}:{take?: number,
    offset?: number,
    query?: string}) {
    const { data } = await axiosClassic.get<TCarrierContactResponse>(`/carrier-contact/all`,{
      params:{
        take,
        offset,
        query
      }
    });

    return data as TCarrierContactResponse;
  },

  async create(value: ICarrierContact) {
    const { data } = await instance.post<ICarrierContact>('/carrier-contact/create', value);
    return data as ICarrierContact;
  },
  async update(value: ICarrierContact,id:number) {
    const { data } = await instance.post<ICarrierContact>(`/carrier-contact/update/${id}`, value);
    return data as ICarrierContact;
  },
  async delete(id: number) {
    const { data } = await instance.post<ICarrierContact>(`/carrier-contact/delete/${id}`);
    return data as ICarrierContact;
  },async getId(id: number) {
    const { data } = await instance.get<ICarrierContact>(`/carrier-contact/${id}`);
    return data as ICarrierContact;
  },
};
