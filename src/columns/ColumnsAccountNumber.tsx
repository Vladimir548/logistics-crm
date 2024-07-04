import { createColumnHelper } from '@tanstack/react-table';
import { IAccountNumber } from '@/interface/interface-account-number';

const columnHelper = createColumnHelper<IAccountNumber>();

export const ColumnsAccountNumber = [
  columnHelper.accessor('account', {
    header: () => <h3 className={'table_header'}>Номер счета</h3>,
    cell: (info) => <span>{info?.getValue()}</span>,
  }),
];
