import { axiosClassic, instance } from '@/app/api/axios';
import { CostumersResponse, ICostumer } from '@/interface/interface-costumer';
import { tag } from 'postcss-selector-parser';

export interface IQueryAllParams {
  take?: number;
  page?: number;
  query?: string;
}
export const QueryCostumer = {
  async getAll({take,query,page}:IQueryAllParams) {
    const { data } = await axiosClassic.get<CostumersResponse>('/costumer/all', {
      params:{
        take,
        query,
        page
      },
    });
    return data as CostumersResponse;
  },
  async create(value: ICostumer) {
    const { data } = await instance.post<ICostumer>('/costumer/create', value);
    return data as ICostumer;
  },
  async delete(id:number) {
    const { data } = await instance.post<ICostumer>(`/costumer/delete/${id}`);
    return data as ICostumer;
  },
  async update(id:number,dto:ICostumer) {
    const { data } = await instance.post<ICostumer>(`/costumer/update/${id}`,dto);
    return data as ICostumer;
  },async getId(id:number) {
    const { data } = await instance.get<ICostumer>(`/costumer/${id}`);
    return data as ICostumer;
  },
};
