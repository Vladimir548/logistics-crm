import { createColumnHelper } from '@tanstack/react-table';
import { IRegistry } from '@/interface/interface-registry';
import { NumericFormat,  } from 'react-number-format';


import { StatusOrderStyles } from '@/styles/status-order-styles';
interface IAct extends IRegistry {
  summ: number;
}

const columnHelper = createColumnHelper<IAct>();
const nowDate = new Date();
export const ColumnsActOur = [
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

  // columnHelper.accessor('agreement.contractNumber', {
  //   header: () => (
  //     <div className={'flex justify-between w-full items-center gap-x-2'}>
  //       <h3 className={'table_header'}>Номер договора</h3>
  //       <Sorting field={'agreement.contractNumber'} />
  //     </div>
  //   ),
  //   cell: (info) => (
  //     <span
  //       className={'w-full h-full'}
  //       style={StatusOrderStyles[info.row.original.agreement.status]}
  //     >
  //       {' '}
  //       {info.getValue()}
  //     </span>
  //   ),
  // }),
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
  columnHelper.accessor('application.invoice.advancePaymentToUs', {
    header: () => <h3 className={'table_header'}>Предоплата нам/Сумма оплаты</h3>,
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
            info.row.original?.application?.invoice?.amountOfPaymentToUs !== null
              ? info.row.original?.application?.invoice?.amountOfPaymentToUs
              : '0'
          }
          thousandSeparator={' '}
        />
      </span>
    ),
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
  columnHelper.accessor('summ', {
    header: () => <h3 className={'table_header'}>Количество дней просрочки</h3>,
    cell: (info) => {
      return (
        <span className={'whitespace-nowrap'}>
          {Math.ceil(
            Math.abs(
              new Date(
                info.row.original?.application?.invoice.dateOfPaymentToUs?.split('T')[0],
              ).getTime() - nowDate.getTime(),
            ) /
              (1000 * 60 * 60 * 24),
          )}
        </span>
      );
    },
  }),
];
