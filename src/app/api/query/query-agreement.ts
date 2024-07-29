import { instance } from '@/app/api/axios';
import { IAgreement, IAgreementResponse } from '@/interface/interface-agreement';
import {IApplication, IApplicationResponse} from '@/interface/interface-application';
import { StatusOrder } from '@/interface/interface-registry';

export const QueryAgreement = {
  async create(dto: IAgreement) {
    const { data } = await instance.post<IAgreement>('/agreement/create', dto);
    return data as IAgreement;
  },

  async getAll({take,pageParam,query}: {
    take?: number,
    pageParam?: number,
    query?: string
  }) {
    const { data } = await instance.get<IAgreementResponse>('/agreement/all',{
     params:{
       take,
       offset:pageParam,
       query
     }
    });
    return data as IAgreementResponse;
  },
  async getContract(id: number) {
    const { data } = await instance.get<IAgreement>('/agreement/contract', {
      params: {
        id,
      },
    });
    return data as IAgreement;
  },
  async update(dto: IAgreement, id: number) {
    const { data } = await instance.post<IAgreement>(`/agreement/update/${id}`, dto);
    return data as IAgreement;
  },
  async delete( id: number) {
    const { data } = await instance.post<IAgreement>(`/agreement/delete/${id}`);
    return data as IAgreement;
  },
  async changeStatus(contract: string, status?: StatusOrder) {
    const query = {
      contract,
      status,
    };
    const { data } = await instance.post<IAgreement>(`/agreement/change-status`, query);
    return data as IAgreement;
  },
  async user({id,take,pageParam}: {
    id:number,
    take?: number,
    pageParam?: number,

  }) {
    const {data} = await instance.get<IAgreementResponse>(`/agreement/user/${id}`,{
      params:{
        take,
        offset:pageParam,
      }
    });
    return data as IAgreementResponse;
  },
};
