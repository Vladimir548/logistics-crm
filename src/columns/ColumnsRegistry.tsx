import { createColumnHelper } from '@tanstack/react-table';
import { IRegistry } from '@/interface/interface-registry';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { PaymentMethodEnum } from '@/interface/interface-payment-method';
import Sorting from '@/components/sorting/Sorting';
import { StatusOrderStyles } from '@/styles/status-order-styles';

const columnHelper = createColumnHelper<IRegistry>();

export const ColumnsRegistry = [
  columnHelper.accessor('createdAt', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        {' '}
        <h3 className={'table_header'}>Дата</h3>
        <Sorting field={'createdAt'} />
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
        <Sorting field={'agreement.contractNumber'} />
      </div>
    ),
    cell: (info) => {
      const value = info.row.original?.agreement?.contractNumber;
     return ( <span
          className={'w-full h-full'}
          style={StatusOrderStyles[info.row.original?.agreement?.status]}
      >
        {value ? value : ''}
      </span>)
    }
  }),
  columnHelper.accessor('application.applicationNumber', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        <h3 className={'table_header'}>Номер заявки</h3>
        <Sorting field={'application.applicationNumber'} />
      </div>
    ),
    cell: (info) =>  {
      const value = info.row.original?.application?.applicationNumber;
      return (
      <span
        className={'w-full h-full'}
        style={StatusOrderStyles[info.row.original?.application?.status]}
      >

        {value}

      </span>
    )
    }
  }),
  columnHelper.accessor('application.invoice.invoiceNumber', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        <h3 className={'table_header'}>Номер УПД</h3>
        <Sorting field={'application.invoice.invoiceNumber'} />
      </div>
    ),
    cell: (info) => {
      const value = info.row.original?.application?.invoice?.invoiceNumber;
      return (
          <span>
        {value}
          </span>
      )
    },
  }),
  columnHelper.accessor('application.costumer.name', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        <h3 className={'table_header '}>Заказчик</h3>
        <Sorting field={'application.costumer.name'} />
      </div>
    ),
    cell: (info) =>{
      const value = info.row.original?.application?.costumer?.name;
      return (
          <span>
        {value}
          </span>
      )
    },

  }),
  columnHelper.group({
    id: 'costumerContactPerson',
    header: () => <h3 className={'table_header_two'}>Контактное лицо заказчика</h3>,

    columns: [
      columnHelper.accessor('application.costumerContactPerson.fullName', {
        header: () => <h3 className={'table_header'}>Имя</h3>,
        cell: (info) => {
          const value = info.row.original?.application?.costumerContactPerson?.fullName;
          return (
              <span>
        {value}
          </span>
          )
        },
      }),
      columnHelper.accessor('application.costumerContactPerson.numberPhone', {
        header: () => <h3 className={'table_header'}>Телефон</h3>,
        cell: (info) => {
          const value = info.row.original?.application?.costumerContactPerson?.numberPhone;
          return (
          <PatternFormat displayType="text" value={value} format="+7 (###) ###-##-##" />
              )
        }
      }),
    ],
  }),
  columnHelper.accessor('agreement.carrier.name', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        <h3 className={'table_header '}>Перевозчик</h3>
        <Sorting field={'agreement.carrier.name'} />
      </div>
    ),
    cell: (info) =>{
      const value = info.row.original?.agreement?.carrier?.name;
      return (
          <span>
        {value}
          </span>
      )
    },
  }),
  columnHelper.group({
    id: 'carrierPerson',
    header: () => (
      <h3 className={'table_header_two flex justify-center'}>Контактное лицо перевозчика</h3>
    ),

    columns: [
      columnHelper.accessor('agreement.carrierContactPerson.fullName', {
        header: () => <h3 className={'table_header'}>Имя</h3>,
        cell: (info) => {
          const value = info.row.original?.agreement?.carrierContactPerson?.fullName;
          return (
              <span>
        {value}
          </span>
          )
        },

      }),
      columnHelper.accessor('agreement.carrierContactPerson.numberPhone', {
        header: () => <h3 className={'table_header'}>Телефон</h3>,
        cell: (info) => {
          const value = info.row.original?.agreement?.carrierContactPerson?.numberPhone;
          return (
              <PatternFormat displayType="text" value={value} format="+7 (###) ###-##-##" />
          )
        }
      }),
    ],
  }),
  columnHelper.group({
    id: 'driver',
    header: () => <h3 className={'table_header_two'}>Водитель</h3>,

    columns: [
      columnHelper.accessor('agreement.driver.fullName', {
        header: () => <h3 className={'table_header'}>ФИО</h3>,
        cell: (info) => {
          const value = info.row.original?.agreement?.driver?.fullName;
          return (
              <span>
        {value}
          </span>
          )
        },
      }),
      columnHelper.accessor('agreement.driver.numberPhone', {
        header: () => <h3 className={'table_header'}>Телефон водителя</h3>,
        cell: (info) =>
      {
        const value = info.row.original?.agreement?.driver?.numberPhone;
        return (
      <span>
       <PatternFormat displayType="text" value={value} format="+7 (###) ###-##-##" />
          </span>
  )
},
      }),
    ],
  }),
  columnHelper.accessor('agreement.route', {
    header: () => <h3 className={'table_header'}>Маршрут</h3>,
    cell: (info) => {
      const value = info.row.original?.agreement?.route;
      return (
          <span>
        {value}
          </span>
      )
    },
  }),
  columnHelper.accessor('application.weight', {
    header: () => <h3 className={'table_header'}>Масса</h3>,
    cell: (info) => {
      const value = info.row.original?.application?.weight;
      return (
          <span>
        {value}
          </span>
      )
    },

  }),
  columnHelper.accessor('application.unloadingAddress', {
    header: () => <h3 className={'table_header'}>Адрес разгрузки</h3>,
    cell: (info) => {
      const value = info.row.original?.application?.unloadingAddress;
      return (
          <span>
        {value}
          </span>
      )
    },

  }),
  columnHelper.accessor('agreement.dateOfDownload', {
    header: () => <h3 className={'table_header'}>Дата загрузки</h3>,
    cell: (info) => {
      const value = info.row.original?.agreement?.dateOfDownload;
      return (
          <span>
       {value ? new Date(value).toISOString().split('T')[0] : null}
          </span>
      )
    },

  }),
  columnHelper.accessor('agreement.unloadingDate', {
    header: () => <h3 className={'table_header'}>Дата выгрузки</h3>,
    cell: (info) => {
      const value = info.row.original?.agreement?.unloadingDate;
      return (
          <span>
       {value ? new Date(value).toISOString().split('T')[0] : null}
          </span>
      )
    },
  }),
  columnHelper.accessor('application.paymentMethodToUs', {
    header: () => <h3 className={'table_header'}>Метод оплаты нам</h3>,
    cell: (info) => {
      const value = info.row.original?.application?.paymentMethodToUs;

        return PaymentMethodEnum[value as keyof typeof PaymentMethodEnum];

    },
  }),
  columnHelper.accessor('agreement.methodOfPaymentToTheCarrier', {
    header: () => <h3 className={'table_header'}>Метод оплаты перевозчику</h3>,
    cell: (info) => {
      const value = info.row.original?.agreement?.methodOfPaymentToTheCarrier;
        return PaymentMethodEnum[value as unknown as keyof typeof PaymentMethodEnum];
    },
  }),
  columnHelper.accessor('application.invoice.accountNumber.account', {
    header: () => <h3 className={'table_header'}>Номер счета</h3>,
    cell: (info) => {
      const value = info.row.original?.application?.invoice?.accountNumber?.account;
      return (
          <span>
        {value}
          </span>
      )
    },
  }),
  columnHelper.accessor('application.invoice.amountOfPaymentToUs', {
    header: () => <h3 className={'table_header'}>Сумма оплаты нам</h3>,
    cell: (info) => {
      const value = info.row.original?.application?.invoice?.amountOfPaymentToUs;
      return (
      <NumericFormat
          displayType="text"
          suffix={' ₽'}
          value={value}
          thousandSeparator={' '}
      />
      )
    },
  }),
  columnHelper.accessor('agreement.amountOfPaymentToTheCarrier', {
    header: () => <h3 className={'table_header'}>Сумма оплаты перевозчику</h3>,
    cell: (info) => {
      const value = info.row.original?.agreement?.amountOfPaymentToTheCarrier;
      return (
          <NumericFormat
              displayType="text"
              suffix={' ₽'}
              value={value}
              thousandSeparator={' '}
          />
      )
    },
  }),
  columnHelper.accessor('delta', {
    header: () => <h3 className={'table_header'}>Дельта</h3>,
    cell: (info) => {
      const value = info.row.original?.delta;
      return (
          <NumericFormat
              displayType="text"
              suffix={' ₽'}
              value={value}
              thousandSeparator={' '}
          />
      )
    },
  }),
  columnHelper.accessor('application.invoice.advancePaymentToUs', {
    header: () => <h3 className={'table_header'}>Предоплата нам</h3>,
    cell: (info) => {
      const value = info.row.original?.application?.invoice?.advancePaymentToUs;
      return (
          <NumericFormat
              displayType="text"
              suffix={' ₽'}
              value={value}
              thousandSeparator={' '}
          />
      )
    },
  }),
  columnHelper.accessor('agreement.advancePaymentToTheCarrier', {
    header: () => <h3 className={'table_header'}>Предоплата перевозчику</h3>,
    cell: (info) => {
      const value = info.row.original?.agreement?.advancePaymentToTheCarrier;
      return (
          <NumericFormat
              displayType="text"
              suffix={' ₽'}
              value={value}
              thousandSeparator={' '}
          />
      )
    },
  }),
  columnHelper.accessor('application.invoice.paymentDeadlineToUs', {
    header: () => <h3 className={'table_header'}>Срок оплаты нам</h3>,
    cell: (info) => {
      const value = info.row.original?.application?.invoice?.paymentDeadlineToUs;
      return (
          <span>
        {value}
          </span>
      )
    },
  }),
  columnHelper.accessor('agreement.paymentDeadlineToTheCarrier', {
    header: () => <h3 className={'table_header'}>Срок оплаты перевозчику</h3>,
    cell: (info) => {
      const value = info.row.original?.agreement?.paymentDeadlineToTheCarrier;
      return (
          <span>
        {value}
          </span>
      )
    },
  }),
  columnHelper.accessor('comment', {
    header: () => <h3 className={'table_header'}>Комментарий</h3>,
    cell: (info) => {
      const value = info.row.original?.comment;
      return (
          <span>
        {value}
          </span>
      )
    },
  }),
  columnHelper.accessor('application.invoice.dateOfPaymentToUs', {
    header: () => <h3 className={'table_header'}>Дата оплаты нам</h3>,
    cell: (info) =>  {
      const value = info.row.original?.application?.invoice?.dateOfPaymentToUs;
      return (
          <span>
       {value ? new Date(value).toISOString().split('T')[0] : null}
          </span>
      )
    },
  }),
  columnHelper.accessor('agreement.dateOfPaymentToTheCarrier', {
    header: () => <h3 className={'table_header'}>Дата оплаты перевозчику</h3>,
    cell: (info) =>  {
      const value = info.row.original?.agreement?.dateOfPaymentToTheCarrier;
      return (
          <span>
       {value ? new Date(value).toISOString().split('T')[0] : null}
          </span>
      )
    },
  }),

  columnHelper.accessor('receiptFromUsToTheCustomer', {
    header: () => <h3 className={'table_header'}>Квиток от нас</h3>,
    cell: (info) =>  {
      const value = info.row.original?.receiptFromUsToTheCustomer;
      return (
          <span>
       {value}
          </span>
      )
    },
  }),
  columnHelper.accessor('receiptFromTheCarrier', {
    header: () => <h3 className={'table_header'}>Квиток от перевозчика</h3>,
    cell: (info) => {
      const value = info.row.original?.receiptFromTheCarrier;
      return (
          <span>
       {value}
          </span>
      )
    },
  }),
  columnHelper.accessor('application.user.fio', {
    header: () => <h3 className={'table_header'}>Логист</h3>,
    cell: (info) =>{
      const value = info.row.original?.application?.user?.fio;
      return (
          <span>
       {value}
          </span>
      )
    },

  }),
];
