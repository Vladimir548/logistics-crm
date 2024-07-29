import { ICarrier } from '@/interface/interface-carrier';

export type TDriverResponse = {
  data: IDriver[];
  count: number;
  takeCount: number;
  totalPage:number
};

export interface IDriver {
  id: number;
  fullName: string;
  numberPhone: string;
  passportNumberAndSeries: string;
  passportIssueDate: string;
  whoIssuedThePassports: string;
  passportSubdivisionCode: string;
  driversLicenseSeriesAndNumber: string;
  dateOfIssueOfDriversLicense: string;
  carrierId: number;
  carrier: ICarrier;
}
