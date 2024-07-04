import { IUser } from '@/interface/interface-user';

export type IStatsLogistResponse = IStatsLogist;

export interface IStatsLogist {
  count: number;
  totalSum: number;
  logist: IUser;
}
