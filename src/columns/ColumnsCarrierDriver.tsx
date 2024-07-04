import { createColumnHelper } from '@tanstack/react-table';
import { IDriver } from '@/interface/interface-driver';
import { PatternFormat } from 'react-number-format';

const columnHelper = createColumnHelper<IDriver>();
export const ColumnsCarrierDriver = [
  columnHelper.accessor('fullName', {
    header: () => <h3 className={'table_header'}>ФИО</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('numberPhone', {
    header: () => <h3 className={'table_header'}>Номер телефона</h3>,
    cell: (info) => (
      <PatternFormat displayType="text" value={info.getValue()} format="+7 (###) ###-##-##" />
    ),
  }),
  columnHelper.accessor('carrier.name', {
    header: () => <h3 className={'table_header'}>Перевозчик</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.group({
    id: 'passport',
    header: () => <h3 className={'table_header_two'}>Паспорт</h3>,
    columns: [
      columnHelper.accessor('passportNumberAndSeries', {
        header: () => <h3 className={'table_header'}>Серия и номер</h3>,
        cell: (info) => (
          <PatternFormat displayType="text" value={info.getValue()} format="## ## ######" />
        ),
      }),
      columnHelper.accessor('passportIssueDate', {
        header: () => <h3 className={'table_header'}>Дата выдачи</h3>,
        cell: (info) => info?.getValue().split('T')[0],
      }),
      columnHelper.accessor('whoIssuedThePassports', {
        header: () => <h3 className={'table_header'}>Выдан</h3>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('passportSubdivisionCode', {
        header: () => <h3 className={'table_header'}>Код подразделения</h3>,
        cell: (info) => (
          <PatternFormat displayType="text" value={info.getValue()} format="###-###" />
        ),
      }),
    ],
  }),
  columnHelper.group({
    id: 'driversLicense',
    header: () => <h3 className={'table_header_two'}>Водительское удостоверение</h3>,
    columns: [
      columnHelper.accessor('driversLicenseSeriesAndNumber', {
        header: () => <h3 className={'table_header'}>Серия и номер</h3>,
        cell: (info) => (
          <PatternFormat displayType="text" value={info.getValue()} format="## ## ######" />
        ),
      }),
      columnHelper.accessor('dateOfIssueOfDriversLicense', {
        header: () => <h3 className={'table_header'}>Дата выдачи</h3>,
        cell: (info) => info?.getValue().split('T')[0],
      }),
    ],
  }),
];
