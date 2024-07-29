import { axiosClassic, instance } from '@/app/api/axios';
import {IDriver, TDriverResponse} from '@/interface/interface-driver';
import {IQueryAllParams} from "@/app/api/query/QueryCostumer";

export const QueryDriver = {
  async getCarrierIdDriver({id,take,offset,query}: {
    id: number,
    take?: number,
    offset?: number,
    query?: string
  }) {
      const { data } = await axiosClassic.get<TDriverResponse>(`/driver/carrier/${id}`, {
        params:{
              take,
              offset,
              query
        }
          });
      return data as TDriverResponse;
  },
  async getAll({take,offset,query}: {
    take?: number,
    offset?: number,
    query?: string
  }) {
    const { data } = await axiosClassic.get<TDriverResponse>(`/driver/all`,{
      params:{
        take,
        offset,
        query
      }
    });
    return data as TDriverResponse;
  },

  async create(value: IDriver) {
    const { data } = await instance.post<IDriver>('/driver/create', value);
    return data as IDriver;
  },
  async update(value: IDriver,id:number) {
    const { data } = await instance.post<IDriver>(`/driver/update/${id}`, value);
    return data as IDriver;
  },
  async delete(id: number) {
    const { data } = await instance.post<IDriver>(`/driver/delete/${id}`);
    return data as IDriver;
  },async getId(id: number) {
    const { data } = await instance.get<IDriver>(`/driver/${id}`);
    return data as IDriver;
  },
};
