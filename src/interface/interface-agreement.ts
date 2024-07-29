import { ICarrier } from '@/interface/interface-carrier';
import { ICarrierContact } from '@/interface/interface-carrier-contact';
import { IDriver } from '@/interface/interface-driver';
import { PaymentMethodEnum } from '@/interface/interface-payment-method';
import { IUser } from '@/interface/interface-user';
import { StatusOrder } from '@/interface/interface-registry';
import {IApplication} from "@/interface/interface-application";

export type IAgreementResponse = {
  data: IApplication[];
  count: number;
  takeCount: number;
  totalPage: number;
};

export interface IAgreement {
  id: number;
  date: string;
  contractNumber: string;
  carrier: ICarrier;
  carrierId: number;
  carrierContactPerson: ICarrierContact;
  carrierContactPersonId: number;
  paymentDeadlineToTheCarrier: string;
  driver: IDriver;
  driverId: number;
  dateOfPaymentToTheCarrier: string;
  amountOfPaymentToTheCarrier: string;
  advancePaymentToTheCarrier: string;
  methodOfPaymentToTheCarrier: PaymentMethodEnum;
  dateOfDownload: string;
  unloadingDate: string;
  route: string;
  user: IUser;
  userId: number;
  applicationId: number;
  application: IApplication;
  status: StatusOrder;
}
