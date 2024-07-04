import { ICostumer } from '@/interface/interface-costumer';

export interface ICostumerContact {
  id: number;
  fullName: string;
  numberPhone: string;
  costumerId: number;
  costumer: ICostumer;
}
