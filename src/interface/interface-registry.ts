import { IApplication } from '@/interface/interface-application';
import { IAgreement } from '@/interface/interface-agreement';
import { IInvoice } from '@/interface/interface-invoice';

export type IRegistryResponse = {
  registry: IRegistry[];
  count: number;
  takeCount: number;
  page: number;
  totalPage: number;
};

export interface IRegistry {
  id: number;
  createdAt: string;
  updateAt: Date;
  delta: string;
  accountNumber: AccountNumber;
  advancePaymentToUs: string;
  advancePaymentToTheCarrier: string;
  comment: string;
  application: IApplication;
  agreement: IAgreement;
  invoice: IInvoice;
  receiptFromTheCarrier: string;
  receiptFromUsToTheCustomer: string;
  costumer: Costumer;
  carrier: Carrier;
  carrierContactPerson: CarrierContactPerson;
  costumerContactPerson: CostumerContactPerson;
  driver: Driver;
  user: User;
}

export interface Costumer {
  id: string;
  name: string;
  legalAndActualAddress: string;
  mailingAddress: string;
  inn: string;
  ogrn: string;
  kpp: string;
  bank: string;
  checkingAccount: string;
  cashAccount: string;
  bic: string;
}

export interface Carrier {
  id: string;
  name: string;
  legalAndActualAddress: string;
  mailingAddress: string;
  inn: string;
  ogrn: string;
  kpp: string;
  bank: string;
  checkingAccount: string;
  cashAccount: string;
  bic: string;
}

export interface CarrierContactPerson {
  id: string;
  fullName: string;
  numberPhone: string;
  carrierId: string;
}

export interface CostumerContactPerson {
  id: string;
  fullName: string;
  numberPhone: string;
  costumerId: string;
}

export interface Driver {
  id: string;
  fullName: string;
  numberPhone: string;
  passportNumberAndSeries: string;
  passportIssueDate: string;
  whoIssuedThePassports: string;
  passportSubdivisionCode: string;
  driversLicenseSeriesAndNumber: string;
  dateOfIssueOfDriversLicense: string;
  carrierId: string;
}

export interface User {
  id: string;
  login: string;
  fio: string;
  password: string;
  role: string;
}
export interface AccountNumber {
  id: string;
  account: string;
}
export enum StatusOrder {
  PAID = 'PAID',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  NOT_PAID = 'NOT_PAID',
  DEFAULT = 'DEFAULT',
}
