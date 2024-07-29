import { ICostumer } from '@/interface/interface-costumer';

export interface ICostumerContactResponse{
  data: ICostumerContact[];
  count: number;
  takeCount: number;
}

export interface ICostumerContact {
  id: number;
  fullName: string;
  numberPhone: string;
  costumerId: number;
  costumer: ICostumer;
}
