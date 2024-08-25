import {IInvoice} from "@/interface/interface-invoice";
import {IApplication} from "@/interface/interface-application";
import {IAgreement} from "@/interface/interface-agreement";

export interface IUser {
  id: string;
  login: string;
  fio: string;
  role: Role;
  status:StatusUser
  Invoice:IInvoice[]
  application:IApplication[]
  agreement:IAgreement[]
}
export enum Role {
  admin='admin',
  logist='logist',
}

export enum StatusUser {
  ONLINE='ONLINE',
  OFFLINE='OFFLINE',
}