import { instance } from '@/app/api/axios';
import { IApplication, IApplicationResponse } from '@/interface/interface-application';
import { IRegistryResponse, StatusOrder } from '@/interface/interface-registry';

export const QueryApplication = {
  async create(dto: IApplication) {
    const { data } = await instance.post<IApplication>('/application/create', dto);
    return data as IApplication;
  },
  async getAll() {
    const { data } = await instance.get<IApplicationResponse>('/application/all');
    return data as IApplicationResponse;
  },
  async getNumber(number: string) {
    const { data } = await instance.get<IApplication>('/application/number', {
      params: {
        number: number,
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
  async changeStatus(id: number, status?: StatusOrder) {
    const query = {
      id,
      status,
    };
    const { data } = await instance.post<IApplication>(`/application/change-status`, query);
    return data as IApplication;
  },
};
