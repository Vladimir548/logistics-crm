import { axiosClassic, instance } from '@/app/api/axios';
import { AccountNumberResponse, IAccountNumber } from '@/interface/interface-account-number';

export const QueryAccountNumber = {
  async getAll({take,pageParam,query}: {
    take?: number,
    pageParam?: number,
    query?: string
  }) {
    const { data } = await axiosClassic.get<AccountNumberResponse>('/account/all',{
      params:{
        take,
        offset:pageParam,
        query
      }
    });
    return data as AccountNumberResponse;
  },
  async create(dto: IAccountNumber) {
    const { data } = await instance.post<IAccountNumber>('/account/create', dto);
    return data as IAccountNumber;
  },
  async delete (id:number){
    const {data} = await  instance.post<IAccountNumber>(`/account/delete/${id}`)
    return data as IAccountNumber
  },
  async update (id:number,dto:IAccountNumber){
    console.log(dto)
    const {data} = await  instance.post<IAccountNumber>(`/account/update/${id}`,dto)
    return data as IAccountNumber
  },
  async getIdAccount (id:number){
    const {data} = await  instance.get<IAccountNumber>(`/account/${id}`)
    return data as IAccountNumber
  }
};
