import { createColumnHelper } from '@tanstack/react-table';
import { ICostumer } from '@/interface/interface-costumer';
import { PatternFormat } from 'react-number-format';

const columnHelper = createColumnHelper<ICostumer>();

export const ColumnsCostumer = [
  columnHelper.accessor('name', {
    header: () => <h3 className={'table_header'}>Название</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('legalAndActualAddress', {
    header: () => <h3 className={'table_header'}>Юридический и фактический адрес</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('mailingAddress', {
    header: () => <h3 className={'table_header'}>Почтовый адрес</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('bank', {
    header: () => <h3 className={'table_header'}>Банк</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('inn', {
    header: () => <h3 className={'table_header'}>ИНН</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('ogrn', {
    header: () => <h3 className={'table_header'}>ОГРН</h3>,
    cell: (info) => (
      <PatternFormat displayType="text" value={info.getValue()} format={'#-##-##-##-#####-#'} />
    ),
  }),
  columnHelper.accessor('kpp', {
    header: () => <h3 className={'table_header'}>КПП</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('checkingAccount', {
    header: () => <h3 className={'table_header'}>Расчетный счет</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('cashAccount', {
    header: () => <h3 className={'table_header'}>Кассовый счет</h3>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('bic', {
    header: () => <h3 className={'table_header'}>БИК</h3>,
    cell: (info) => info.getValue(),
  }),
];
