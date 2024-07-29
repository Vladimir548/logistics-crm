import { instance } from '@/app/api/axios';
import { IApplication, IApplicationResponse } from '@/interface/interface-application';
import { IRegistryResponse, StatusOrder } from '@/interface/interface-registry';

export const QueryApplication = {
  async create(dto: IApplication) {
    const { data } = await instance.post<IApplication>('/application/create', dto);
    return data as IApplication;
  },
  async getAll({take,pageParam,query}: {
    take?: number,
    pageParam?: number,
    query?: string
  }) {
    const { data } = await instance.get<IApplicationResponse>('/application/all', {
      params:{
        take,
        offset:pageParam,
        query
      }
    });
    return data as IApplicationResponse;
  },
  async getNumber(id: number) {
    const { data } = await instance.get<IApplication>('/application/number', {
      params: {
        id,
      },
    });
    return data as IApplication;
  },
  async update(dto: IApplication, number: string) {
    const { data } = await instance.post<IApplication>(`/application/update/${number}`, dto);
    return data as IApplication;
  },
  async delete(number: number ) {
    const { data } = await instance.post<IApplication>(`/application/delete/${number}`);
    return data as IApplication;
  },
  async user({id,take,pageParam}: {
    id:number
    take?: number,
    pageParam?: number,
  }) {
    const {data} = await instance.get<IApplicationResponse>(`/application/user/${id}`,{
      params:{
        take,
        offset:pageParam
      }
    });
    return data as IApplicationResponse;
  },
  async changeStatus(number: string, status?: StatusOrder) {
    const query = {
      number,
      status,
    };
    const { data } = await instance.post<IApplication>(`/application/change-status`, query);
    return data as IApplication;
  },
};
