import { axiosClassic, instance } from '@/app/api/axios';
import { CarrierResponse, ICarrier } from '@/interface/interface-carrier';

interface IQueryAllParams {
  take?: number;
  offset?: number;
  query?: string;
}
export const QueryCarrier = {
  async getAll(take?: number, pageParam?: number, query?: string) {
    const paramsValue: IQueryAllParams = {};

    if (take) {
      paramsValue.take = Number(take);
      paramsValue.offset = Number(pageParam);
    }
    if (query) {
      paramsValue.query = String(query);
    }
    const { data } = await axiosClassic.get<CarrierResponse>('/carrier/all', {
      params: paramsValue,
    });
    return data as CarrierResponse;
  },
  async create(value: ICarrier) {
    const { data } = await instance.post<ICarrier>('/carrier/create', value);
    return data as ICarrier;
  },
};
