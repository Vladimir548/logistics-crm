import { ICostumer } from '@/interface/interface-costumer';
import { ICostumerContact } from '@/interface/interface-costumer-contact';
import { IUser } from '@/interface/interface-user';
import { IInvoice } from '@/interface/interface-invoice';
import { StatusOrder } from '@/interface/interface-registry';
import {IAgreement} from "@/interface/interface-agreement";

export type IApplicationResponse = {
  data:IApplication[]
  count: number;
  takeCount: number;
  totalPage: number;
};

export interface IApplication {
  id: number;
  date: Date;
  agreementId:number
  agreement:IAgreement
  applicationNumber: string;
  costumer: ICostumer;
  costumerId: number;
  costumerContactPerson: ICostumerContact;
  costumerContactPersonId: number;
  weight: string;
  invoice: IInvoice;
  paymentDeadlineToUs: string;
  dateOfPaymentToUs: Date;
  unloadingAddress: string;
  paymentMethodToUs: string;
  user: IUser;
  userId: number;
  status: StatusOrder;
}
