import { instance } from '@/app/api/axios';
import { IAgreement, IAgreementResponse } from '@/interface/interface-agreement';
import { IApplication } from '@/interface/interface-application';
import { StatusOrder } from '@/interface/interface-registry';

export const QueryAgreement = {
  async create(dto: IAgreement) {
    const { data } = await instance.post<IAgreement>('/agreement/create', dto);
    return data as IAgreement;
  },

  async getAll() {
    const { data } = await instance.get<IAgreementResponse>('/agreement/all');
    return data as IAgreementResponse;
  },
  async getContract(contract: string) {
    const { data } = await instance.get<IAgreement>('/agreement/contract', {
      params: {
        contract: contract,
      },
    });
    return data as IAgreement;
  },
  async update(dto: IAgreement, contract: string) {
    const { data } = await instance.post<IAgreement>(`/agreement/update/${contract}`, dto);
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
};
