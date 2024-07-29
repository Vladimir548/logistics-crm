export type AccountNumberResponse ={
  data:IAccountNumber[],
  count: number;
  takeCount: number;
  totalPage: number;
};

export interface IAccountNumber {
  id: number;
  account: string;
}
