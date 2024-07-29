import { ICarrier } from '@/interface/interface-carrier';
export type TCarrierContactResponse = {
  data: ICarrierContact[];
  count: number;
  takeCount: number;
  totalPage:number
};
export interface ICarrierContact {
  id: number;
  fullName: string;
  numberPhone: string;
  carrierId: number;
  carrier: ICarrier;
}
