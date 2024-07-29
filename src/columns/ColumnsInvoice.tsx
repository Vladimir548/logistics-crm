import { createColumnHelper } from '@tanstack/react-table';

import { IInvoice } from '@/interface/interface-invoice';
import { PaymentMethodEnum } from '@/interface/interface-payment-method';
import { NumericFormat } from 'react-number-format';

const columnHelper = createColumnHelper<IInvoice>();

export const ColumnsInvoice = [
  columnHelper.accessor('invoiceNumber', {
    header: () => <h3 className={'table_header'}>Номер УПД</h3>,
    cell: (info) => <span>{info?.getValue()}</span>,
  }),
  columnHelper.accessor('application.applicationNumber', {
    header: () => <h3 className={'table_header'}>Номер договора</h3>,
    cell: (info) => <span>{info?.getValue()}</span>,
  }),
  columnHelper.accessor('paymentMethodToUs', {
    header: () => <h3 className={'table_header'}>Метод оплаты нам</h3>,
    cell: (info) => PaymentMethodEnum[info.getValue() as unknown as keyof typeof PaymentMethodEnum] ,
  }),
  columnHelper.accessor('paymentDeadlineToUs', {
    header: () => <h3 className={'table_header'}>Срок оплаты нам</h3>,
    cell: (info) => <span>{info?.getValue()}</span>,
  }),
  columnHelper.accessor('dateOfPaymentToUs', {
    header: () => <h3 className={'table_header'}>Дата оплаты нам</h3>,
    cell: (info) => <span>{info?.getValue()?.split('T')[0]}</span>,
  }),
  columnHelper.accessor('accountNumber.account', {
    header: () => <h3 className={'table_header'}>Номер счета</h3>,
    cell: (info) => <span>{info?.getValue()}</span>,
  }),
  columnHelper.accessor('amountOfPaymentToUs', {
    header: () => <h3 className={'table_header'}>Сумма оплаты</h3>,
    cell: (info) => (
      <NumericFormat
        displayType="text"
        suffix={' ₽'}
        value={info.getValue()}
        thousandSeparator={' '}
      />
    ),
  }),
];
