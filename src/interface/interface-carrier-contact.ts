import { ICarrier } from '@/interface/interface-carrier';

export interface ICarrierContact {
  id: string;
  fullName: string;
  numberPhone: string;
  carrierId: string;
  carrier: ICarrier;
}
