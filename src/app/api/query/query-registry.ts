import { instance } from '@/app/api/axios';
import { IRegistry, IRegistryResponse, StatusOrder } from '@/interface/interface-registry';
import { IAddTickets } from '@/app/(home)/_ui/registry-context-menu/registry-add-info/RegistryTickets';
interface IQueryAllParams {
  query: string | null;
  field?: string;
  order?: string;
  take?: number;
  page?: number | string | null;
}
export const QueryRegistry = {
  async getAllRegistry(
    query: string | null,
    order?: string,
    field?: string,
    take?: number,
    page?: number | string | null ,
  ) {
    const paramsValue: IQueryAllParams = {
      query: query !== '' ? query : null,
      take: Number(take),
      page: Number(page) !== null ? page : undefined,
      field: field !== null ? field : undefined,
      order: order !== null ? order : undefined,
    };

    const { data } = await instance.get<IRegistryResponse>(`/registry/registries`, {
      params: paramsValue,
    });

    return data as IRegistryResponse;
  },
  async getAll() {
    const { data } = await instance.get<IRegistry[]>(`/registry/all`);
    return data as IRegistry[];
  },
  async getId(id: number) {
    if (id) {
      console.log('start ' + id);
      const { data } = await instance.get<IRegistry>(`/registry/print/${id}`);
      return data as IRegistry;
    }
  },
  async search(query: string | null) {
    const { data } = await instance.get<IRegistryResponse>(`/registry/search/${query}`);

    return data as IRegistryResponse;
  },
  // async changeStatus(id?: number, status?: StatusOrder) {
  //   const query = {
  //     id,
  //     status,
  //   };
  //   const { data } = await instance.post<IRegistryResponse>('/registry/change-status', query);
  //   return data as IRegistryResponse;
  // },
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
  async getPaid() {
    const { data } = await instance.get<IRegistry[]>(`/registry/paid`);
    return data as IRegistry[];
  },
  async getNotPaidOur() {
    const { data } = await instance.get<IRegistry[]>(`/registry/not-paid-our`);
    return data as IRegistry[];
  },
  async getNotPaidCarrier() {
    const { data } = await instance.get<IRegistry[]>(`/registry/not-paid-carrier`);
    return data as IRegistry[];
  },
};
