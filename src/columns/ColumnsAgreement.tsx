import { createColumnHelper } from '@tanstack/react-table';

import { IAgreement } from '@/interface/interface-agreement';
import { PaymentMethodEnum } from '@/interface/interface-payment-method';
import { NumericFormat, PatternFormat } from 'react-number-format';

const columnHelper = createColumnHelper<IAgreement>();
// @ts-ignore
export const ColumnsAgreement = [
  columnHelper.accessor('date', {
    header: () => <h3 className={'table_header'}>Дата</h3>,
    // @ts-ignore
    cell: (info) => <span>{info?.getValue().split('T')[0]}</span>,
  }),
  columnHelper.accessor('contractNumber', {
    header: () => <h3 className={'table_header'}>Номер заявки</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('carrier.name', {
    header: () => <h3 className={'table_header'}>Заказчик</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.group({
    id: 'carrierContactPerson',
    header: () => <h3 className={'table_header_two'}>Контактное лицо перевозчика</h3>,
    columns: [
      columnHelper.accessor('carrierContactPerson.fullName', {
        header: () => <h3 className={'table_header'}>Имя</h3>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('carrierContactPerson.numberPhone', {
        header: () => <h3 className={'table_header'}>Телефон</h3>,
        cell: (info) => (
          <PatternFormat displayType="text" value={info.getValue()} format="+7 (###) ###-##-##" />
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: 'driver',
    header: () => <h3 className={'table_header_two'}>Водитель </h3>,
    columns: [
      columnHelper.accessor('driver.fullName', {
        header: () => <h3 className={'table_header'}>Имя</h3>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('driver.numberPhone', {
        header: () => <h3 className={'table_header'}>Телефон</h3>,
        cell: (info) => (
          <PatternFormat displayType="text" value={info.getValue()} format="+7 (###) ###-##-##" />
        ),
      }),
    ],
  }),
  columnHelper.accessor('route', {
    header: () => <h3 className={'table_header'}>Маршрут</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('dateOfDownload', {
    header: () => <h3 className={'table_header'}>Дата загрузки</h3>,
    // @ts-ignore
    cell: (info) => <span>{info?.getValue().split('T')[0]}</span>,
  }),
  columnHelper.accessor('unloadingDate', {
    header: () => <h3 className={'table_header'}>Дата выгрузки</h3>,
    // @ts-ignore
    cell: (info) => <span>{info?.getValue().split('T')[0]}</span>,
  }),
  columnHelper.accessor('amountOfPaymentToTheCarrier', {
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
  columnHelper.accessor('paymentDeadlineToTheCarrier', {
    header: () => <h3 className={'table_header'}>Срок оплаты</h3>,
    // @ts-ignore
    cell: (info) => info?.getValue(),
  }),
  columnHelper.accessor('dateOfPaymentToTheCarrier', {
    header: () => <h3 className={'table_header'}>Дата оплаты</h3>,
    // @ts-ignore
    cell: (info) => info?.getValue()?.split('T')[0],
  }),
  columnHelper.accessor('methodOfPaymentToTheCarrier', {
    header: () => <h3 className={'table_header'}>Метод оплаты перевозчику</h3>,
    // @ts-ignore
    cell: (info) => PaymentMethodEnum[info.getValue()],
  }),
  columnHelper.accessor('user.fio', {
    header: () => <h3 className={'table_header'}>Логист</h3>,
    cell: (info) => info.getValue(),
  }),
];
