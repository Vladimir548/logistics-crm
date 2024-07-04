import { createColumnHelper } from '@tanstack/react-table';
import { ICarrierContact } from '@/interface/interface-carrier-contact';
import { PatternFormat } from 'react-number-format';

const columnHelper = createColumnHelper<ICarrierContact>();

export const ColumnsCarrierContact = [
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
];
