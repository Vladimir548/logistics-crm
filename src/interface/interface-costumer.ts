export type CostumersResponse = {
  data: ICostumer[];
  count: number;
  takeCount: number;
  totalPage: number;
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
