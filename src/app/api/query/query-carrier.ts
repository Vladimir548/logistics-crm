import { axiosClassic, instance } from '@/app/api/axios';
import { CarrierResponse, ICarrier } from '@/interface/interface-carrier';


interface IQueryAllParams {
  take?: number;
  offset?: number;
  query?: string;
}
export const QueryCarrier = {
  async getAll({take,query,offset}:IQueryAllParams) {

    const { data } = await axiosClassic.get<CarrierResponse>('/carrier/all', {
      params: {
        take,
        offset,
        query
      },
    });
    return data as CarrierResponse;
  },
  async create(value: ICarrier) {
    const { data } = await instance.post<ICarrier>('/carrier/create', value);
    return data as ICarrier;
  },
  async update(value: ICarrier,id:number) {
    const { data } = await instance.post<ICarrier>(`/carrier/update/${id}`, value);
    return data as ICarrier;
  },
  async delete(id: number) {
    const { data } = await instance.post<ICarrier>(`/carrier/delete/${id}`);
    return data as ICarrier;
  },async getId(id: number) {
    const { data } = await instance.get<ICarrier>(`/carrier/${id}`);
    return data as ICarrier;
  },
};
