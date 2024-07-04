import { createColumnHelper } from '@tanstack/react-table';
import { IRegistry } from '@/interface/interface-registry';
import { NumericFormat, PatternFormat } from 'react-number-format';

import { IStatsLogist } from '@/interface/interface-stats-logist';
interface IAct extends IRegistry {
  summ: number;
}

const columnHelper = createColumnHelper<IStatsLogist>();

export const ColumnsStatsLogist = [

  columnHelper.accessor('logist.fio', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        <h3 className={'table_header'}>Логист</h3>

      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('count', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        <h3 className={'table_header'}>Количество заявок</h3>
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('totalSum', {
    header: () => (
      <div className={'flex justify-between w-full items-center gap-x-2'}>
        <h3 className={'table_header '}>Общая сумма</h3>
      </div>
    ),
    cell: (info) => (
      <NumericFormat
        displayType="text"
        suffix={' ₽'}
        value={info.getValue()}
        thousandSeparator={' '}
      />
    ),
    size: 180,
  }),
];
