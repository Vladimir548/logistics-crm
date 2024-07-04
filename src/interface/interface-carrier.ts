export type CarrierResponse = {
  carrier: ICarrier[];
  count: number;
  takeCount: number;
};

export interface ICarrier {
  id: number;
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
