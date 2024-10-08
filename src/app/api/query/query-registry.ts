import { instance} from '@/app/api/axios';
import { IRegistry, IRegistryResponse } from '@/interface/interface-registry';
import { IAddTickets } from '@/app/(home)/_ui/registry-context-menu/registry-add-info/RegistryTickets';
import {IFilterResponse} from "@/interface/interface-filter";


export const QueryRegistry = {
  async getAll({take,pageParam,query,order,field,filter}: {
    take?: number,
    pageParam?: number,
    query?: string,
    order?:string,
    field?:string
    filter?:Partial<IFilterResponse>
  }) {
    const { data } = await instance.get<IRegistryResponse>(`/registry/all`, {
      params:{
        take,
        offset:pageParam,
        query,
        order,
        field,
        ...(filter && {
        filter:filter
        })
      }
    });
    return data as IRegistryResponse;
  },
  async getId(id: number) {
    if (id) {
      const { data } = await instance.get<IRegistry>(`/registry/print/${id}`);
      return data as IRegistry;
    }
  },
  async search(query: string | null) {
    const { data } = await instance.get<IRegistryResponse>(`/registry/search/${query}`);

    return data as IRegistryResponse;
  },
  async delete(id: number) {
    if (id) {
      const { data } = await instance.delete<IRegistryResponse>(`/registry/delete/${id}`);
      return data as IRegistryResponse;
    }
  },
  async addComment(id: number | undefined, comment: string) {
    if (id) {
      const query = {
        id,
        comment,
      };

      const { data } = await instance.post<IRegistryResponse>(`/registry/add-comment`, query);
      return data as IRegistryResponse;
    }
  },
  async getComment(id: number) {
    const { data } = await instance.get<IRegistry>(`/registry/comment`, {
      params: {
        id: id,
      },
    });
    return data as IRegistry;
  },
  async addTickets(dataQuery: IAddTickets) {
    if (dataQuery.id) {
      const { data } = await instance.post<IRegistryResponse>(`/registry/add-tickets`, dataQuery);
      return data as IRegistryResponse;
    }
  },
  async getTickets(id: number) {
    const { data } = await instance.get<IRegistry>(`/registry/tickets`, {
      params: {
        id: id,
      },
    });
    return data as IRegistry;
  },


};
