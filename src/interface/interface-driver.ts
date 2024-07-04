import { ICarrier } from '@/interface/interface-carrier';

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
