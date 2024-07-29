import { instance } from '@/app/api/axios';
import {IInvoice, IInvoiceResponse} from '@/interface/interface-invoice';
import { IApplicationResponse } from '@/interface/interface-application';
import { IStatsLogistResponse } from '@/interface/interface-stats-logist';

export const QueryInvoice = {
  async create(dto: IInvoice) {
    const { data } = await instance.post<IInvoice>('/invoice/create', dto);
    return data as IInvoice;
  },
  async getAll({take,page,query}: {
    take?: number,
    page?: number,
    query?: string
  }) {
    const { data } = await instance.get<IInvoiceResponse>('/invoice/all',{
      params:{
        take,
        offset:page,
        query
      }
    });

    return data as IInvoiceResponse;
  },
  async getNumber(id: number) {

    const { data } = await instance.get<IInvoice>('/invoice/number', {
      params: {
        id
      },
    });
    return data as IInvoice;
  },
  async update(dto: IInvoice, id: number) {
    const { data } = await instance.post<IInvoice>(`/invoice/update/${id}`, dto);
    return data as IInvoice;
  },
  async delete( id: number) {
    const { data } = await instance.post<IInvoice>(`/invoice/delete/${id}`);
    return data as IInvoice;
  },
  async getStatsLogist(start: string | null, end: string | null) {
    const { data } = await instance.get<IStatsLogistResponse>('/application/logist-stats', {
      params: {
        start: start,
        end: end,
      },
    });
    return data as IStatsLogistResponse;
  },
  async user({id,take,page}: {
    id:number
    take?: number,
    page?: number,

  }) {
    const {data} = await instance.get<IInvoiceResponse>(`/invoice/user/${id}`,{
      params:{
        take,
        offset:page
      }
    });
    return data as IInvoiceResponse;
  },
};
