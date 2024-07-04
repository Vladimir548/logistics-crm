export interface IUser {
  id: string;
  login: string;
  fio: string;
  role: Role;
}
export enum Role {
  admin='admin',
  logist='logist',
}