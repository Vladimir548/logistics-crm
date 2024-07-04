import { createColumnHelper } from '@tanstack/react-table';
import { IRegistry } from '@/interface/interface-registry';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { PaymentMethodEnum } from '@/interface/interface-payment-method';

import { StatusOrderStyles } from '@/styles/status-order-styles';
interface IAct extends IRegistry {
  summ: number;
}

const columnHelper = createColumnHelper<IAct>();
const nowDate = new Date();
export const ColumnsActCarrier = [
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

  columnHelper.accessor('agreement.contractNumber', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        <h3 className={'table_header'}>Номер договора</h3>

      </div>
    ),
    cell: (info) => (
      <span
        className={'w-full h-full'}
        style={StatusOrderStyles[info.row.original.agreement.status]}
      >
        {' '}
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor('agreement.carrier.name', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        <h3 className={'table_header '}>Перевозчик</h3>

      </div>
    ),
    cell: (info) => info.getValue(),
    size: 250,
  }),

  columnHelper.accessor('agreement.advancePaymentToTheCarrier', {
    header: () => <h3 className={'table_header'}>Предоплата перевозчику/Сумма оплаты</h3>,
    cell: (info) => (
      <span>
        <NumericFormat
          displayType="text"
          suffix={' ₽'}
          value={info.getValue() !== null ? info.getValue() : '0'}
          thousandSeparator={' '}
        />{' '}
        /{' '}
        <NumericFormat
          displayType="text"
          suffix={' ₽'}
          value={
            info.row.original?.agreement?.amountOfPaymentToTheCarrier !== null
              ? info.row.original?.agreement?.amountOfPaymentToTheCarrier
              : '0'
          }
          thousandSeparator={' '}
        />
      </span>
    ),
  }),
  columnHelper.accessor('agreement.dateOfPaymentToTheCarrier', {
    header: () => <h3 className={'table_header'}>Дата оплаты перевозчику</h3>,
    cell: (info) => (
      <span className={'whitespace-nowrap'}>
        {info.getValue() ? new Date(info.getValue()).toISOString().split('T')[0] : null}
      </span>
    ),
    size: 180,
  }),
  columnHelper.accessor('summ', {
    header: () => <h3 className={'table_header'}>Количество дней просрочки</h3>,
    cell: (info) => {
      return (
        <span className={'whitespace-nowrap'}>
          {Math.ceil(
            Math.abs(
              new Date(
                info.row.original.agreement.dateOfPaymentToTheCarrier.split('T')[0] ,
              ).getTime() - nowDate.getTime(),
            ) /
              (1000 * 60 * 60 * 24),
          )}
        </span>
      );
    },
  }),
];
