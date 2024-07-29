import { createColumnHelper } from '@tanstack/react-table';
import { IApplication } from '@/interface/interface-application';
import { PatternFormat } from 'react-number-format';
import { PaymentMethodEnum } from '@/interface/interface-payment-method';
import Sorting from "@/components/sorting/Sorting";
import {StatusOrderStyles} from "@/styles/status-order-styles";

const columnHelper = createColumnHelper<IApplication>();

export const ColumnsApplication = [
  columnHelper.accessor('date', {

    header: () => <h3>Дата</h3>,
    // @ts-ignore
    cell: (info) => <span className={'whitespace-nowrap'}>{info?.getValue().split('T')[0]}</span>,
    size:120,

  }),
  columnHelper.accessor('applicationNumber', {
    header: () => <div className={'flex justify-center w-full items-center gap-x-2'}>
      <h3 >Номер заявки</h3>
      <Sorting field={'application.applicationNumber'}/>
    </div>,
    cell: (info) => <span style={StatusOrderStyles[info.row.original.status]}> {info.getValue()}</span>,
    size:160,
  }),
  columnHelper.accessor('costumer.name', {
    header: () => <h3 >Заказчик</h3>,
    cell: (info) => info.getValue(),
    size:250,
  }),
  columnHelper.group({
    id: 'costumerContactPerson',
    header: () => <h3 >Контактное лицо заказчика</h3>,
    columns: [
      columnHelper.accessor('costumerContactPerson.fullName', {
        header: () => <h3 >Имя</h3>,
        cell: (info) => info.getValue(),
        size:250,
      }),
      columnHelper.accessor('costumerContactPerson.numberPhone', {
        header: () => <h3 >Телефон</h3>,
        cell: (info) => (
          <PatternFormat displayType="text" value={info.getValue()} format="+7 (###) ###-##-##" />
        ),
        size:150,
      }),
    ],

  }),
  columnHelper.accessor('weight', {
    header: () => <h3 >Масса</h3>,
    cell: (info) => info.getValue(),
    size:100,
  }),
  columnHelper.accessor('unloadingAddress', {
    header: () => <h3 >Адрес доставки</h3>,
    cell: (info) => info.getValue(),
    size:200,
    maxSize:400,
  }),
  columnHelper.accessor('paymentMethodToUs', {
    header: () => <h3 >Метод оплаты</h3>,
    cell: (info) => {
      const value = info.getValue();
        return PaymentMethodEnum[value as keyof typeof PaymentMethodEnum];

    },
    size:120,
  }),
  columnHelper.accessor('user.fio', {

    header: () => <h3 >Логист</h3>,
    cell: (info) =>{

      return info.row.original?.user?.fio;
    },
    size:250,
    maxSize:300
  }),
];
