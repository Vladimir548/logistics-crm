import { axiosClassic, instance } from '@/app/api/axios';
import { CostumersResponse, ICostumer } from '@/interface/interface-costumer';
import { tag } from 'postcss-selector-parser';

interface IQueryAllParams {
  take?: number;
  offset?: number;
  query?: string;
}
export const QueryCostumer = {
  async getAll(take?: number, pageParam?: number, query?: string) {
    const paramsValue: IQueryAllParams = {};

    if (take) {
      paramsValue.take = Number(take);
      paramsValue.offset = Number(pageParam);
    }
    if (query) {
      paramsValue.query = String(query);
    }

    const { data } = await axiosClassic.get<CostumersResponse>('/costumer/all', {
      params: paramsValue,
    });

    return data as CostumersResponse;
  },

  async create(value: ICostumer) {
    const { data } = await instance.post<ICostumer>('/costumer/create', value);
    return data as ICostumer;
  },
};
