import { PaymentMethodEnum } from '@/interface/interface-payment-method';
import { IAccountNumber } from '@/interface/interface-account-number';

import { IApplication } from '@/interface/interface-application';

export type IInvoiceResponse = IInvoice[];

export interface IInvoice {
  invoiceNumber: string;
  amountOfPaymentToUs: string;
  paymentDeadlineToUs: string;
  paymentMethodToUs: PaymentMethodEnum;
  advancePaymentToUs: string;
  dateOfPaymentToUs: string;
  accountNumberId: number;
  accountNumber: IAccountNumber;
  applicationId: number;
  application: IApplication;
  userId: number;
}
