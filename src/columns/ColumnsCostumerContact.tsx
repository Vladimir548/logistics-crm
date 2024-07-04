import { createColumnHelper } from '@tanstack/react-table';
import { ICostumerContact } from '@/interface/interface-costumer-contact';
import { PatternFormat } from 'react-number-format';

const columnHelper = createColumnHelper<ICostumerContact>();

export const ColumnsCostumerContact = [
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
  columnHelper.accessor('costumer.name', {
    header: () => <h3 className={'table_header'}>Заказчик</h3>,
    cell: (info) => info.getValue(),
  }),
];
