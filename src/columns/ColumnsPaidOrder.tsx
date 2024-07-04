import { createColumnHelper } from '@tanstack/react-table';
import { IRegistry } from '@/interface/interface-registry';
import { NumericFormat, PatternFormat } from 'react-number-format';

import { StatusOrderStyles } from '@/styles/status-order-styles';

const columnHelper = createColumnHelper<IRegistry>();

export const ColumnsPaidOrder = [
  columnHelper.accessor('createdAt', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        {' '}
        <h3 className={'table_header'}>Дата</h3>

      </div>
    ),
    cell: (info) => (
      <span className={'whitespace-nowrap'}>
        {info.getValue() ? new Date(info.getValue()).toISOString().split('T')[0] : null}
      </span>
    ),
  }),
  columnHelper.accessor('application.applicationNumber', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        <h3 className={'table_header'}>Номер заявки</h3>

      </div>
    ),
    cell: (info) => (
      <span
        className={'w-full h-full'}
        style={StatusOrderStyles[info.row.original.application.status]}
      >
        {' '}
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor('application.costumer.name', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        <h3 className={'table_header '}>Заказчик</h3>

      </div>
    ),
    cell: (info) => info.getValue(),
    size: 180,
  }),

  columnHelper.accessor('application.invoice.amountOfPaymentToUs', {
    header: () => <h3 className={'table_header'}>Сумма оплаты нам</h3>,
    cell: (info) => (
      <NumericFormat
        displayType="text"
        suffix={' ₽'}
        value={info.getValue()}
        thousandSeparator={' '}
      />
    ),
    size: 150,
  }),
  columnHelper.accessor('application.invoice.dateOfPaymentToUs', {
    header: () => <h3 className={'table_header'}>Дата оплаты нам</h3>,
    cell: (info) => (
      <span className={'whitespace-nowrap'}>
        {info.getValue() ? new Date(info.getValue()).toISOString().split('T')[0] : null}
      </span>
    ),
    size: 180,
  }),
  columnHelper.accessor('agreement.amountOfPaymentToTheCarrier', {
    header: () => <h3 className={'table_header'}>Сумма оплаты перевозчику</h3>,
    cell: (info) => (
      <NumericFormat
        displayType="text"
        suffix={' ₽'}
        value={info.getValue()}
        thousandSeparator={' '}
      />
    ),
    size: 150,
  }),

  columnHelper.accessor('agreement.dateOfPaymentToTheCarrier', {
    header: () => <h3 className={'table_header'}>Дата оплаты перевозчику</h3>,
    cell: (info) => (
      <span className={'whitespace-nowrap'}>
        {' '}
        {info.getValue() ? new Date(info.getValue()).toISOString().split('T')[0] : null}
      </span>
    ),
    size: 180,
  }),
];
