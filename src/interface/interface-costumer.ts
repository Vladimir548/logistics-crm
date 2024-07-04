export type CostumersResponse = {
  costumers: ICostumer[];
  count: number;
  takeCount: number;
};

export interface ICostumer {
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
