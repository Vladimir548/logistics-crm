import { instance } from '@/app/api/axios';
import { IInvoice } from '@/interface/interface-invoice';
import { IApplicationResponse } from '@/interface/interface-application';
import { IStatsLogistResponse } from '@/interface/interface-stats-logist';

export const QueryInvoice = {
  async create(dto: IInvoice) {
    const { data } = await instance.post<IInvoice>('/invoice/create', dto);
    return data as IInvoice;
  },
  async getAll() {
    const { data } = await instance.get<IInvoice>('/invoice/all');

    return data as IInvoice;
  },
  async getNumber(number: string) {
    const { data } = await instance.get<IInvoice>('/invoice/number', {
      params: {
        number: number,
      },
    });
    return data as IInvoice;
  },
  async update(dto: IInvoice, number: string) {
    const { data } = await instance.post<IInvoice>(`/invoice/update/${number}`, dto);
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
};
