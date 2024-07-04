import { ICarrier } from '@/interface/interface-carrier';
import { ICarrierContact } from '@/interface/interface-carrier-contact';
import { IDriver } from '@/interface/interface-driver';
import { PaymentMethodEnum } from '@/interface/interface-payment-method';
import { IUser } from '@/interface/interface-user';
import { IRegistry, StatusOrder } from '@/interface/interface-registry';

export type IAgreementResponse = IAgreement[];

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
  registryId: number;
  registry: IRegistry;
  status: StatusOrder;
}
