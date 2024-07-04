import { createColumnHelper } from '@tanstack/react-table';
import { IApplication } from '@/interface/interface-application';
import { PatternFormat } from 'react-number-format';
import { PaymentMethodEnum } from '@/interface/interface-payment-method';
import Sorting from "@/components/sorting/Sorting";
import {StatusOrderStyles} from "@/styles/status-order-styles";

const columnHelper = createColumnHelper<IApplication>();

export const ColumnsApplication = [
  columnHelper.accessor('date', {
    header: () => <h3 className={'table_header'}>Дата</h3>,
    // @ts-ignore
    cell: (info) => <span className={'whitespace-nowrap'}>{info?.getValue().split('T')[0]}</span>,
  }),
  columnHelper.accessor('applicationNumber', {
    header: () => <div className={'flex justify-between w-full items-center gap-x-2'}>
      <h3 className={'table_header'}>Номер заявки</h3>
      <Sorting field={'application.applicationNumber'}/>
    </div>,
    cell: (info) => <span style={StatusOrderStyles[info.row.original.status]}> {info.getValue()}</span>,
  }),
  columnHelper.accessor('costumer.name', {
    header: () => <h3 className={'table_header'}>Заказчик</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.group({
    id: 'costumerContactPerson',
    header: () => <h3 className={'table_header_two'}>Контактное лицо заказчика</h3>,
    columns: [
      columnHelper.accessor('costumerContactPerson.fullName', {
        header: () => <h3 className={'table_header'}>Имя</h3>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('costumerContactPerson.numberPhone', {
        header: () => <h3 className={'table_header'}>Телефон</h3>,
        cell: (info) => (
          <PatternFormat displayType="text" value={info.getValue()} format="+7 (###) ###-##-##" />
        ),
      }),
    ],
  }),
  columnHelper.accessor('weight', {
    header: () => <h3 className={'table_header'}>Масса</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('unloadingAddress', {
    header: () => <h3 className={'table_header'}>Адрес доставки</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('paymentMethodToUs', {
    header: () => <h3 className={'table_header'}>Метод оплаты нам</h3>,
    cell: (info) => {
      const value = info.getValue();
      if (typeof value === 'string') {
        return PaymentMethodEnum[value as keyof typeof PaymentMethodEnum];
      }
      return '';
    },
  }),
  columnHelper.accessor('user.fio', {
    header: () => <h3 className={'table_header'}>Логист</h3>,
    cell: (info) => info.getValue(),
  }),
];
