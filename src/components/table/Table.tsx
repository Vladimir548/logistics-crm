

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,

} from '@tanstack/react-table';
import style from './table.module.scss';
import cn from 'classnames';
import TableContextMenu from "@/components/table/TableContextMenu";
import {IContextItem} from "@/app/(home)/_ui/Registry";
import {AiOutlineLoading3Quarters} from "react-icons/ai";


interface ITable<T>{
  data: T[] | any;
  columns: ColumnDef<T,any>[];
  contextItem?: IContextItem[];
  getDataForContext?:(row:Row<T>) => void
  isLoading?:boolean
}
export default function Table<T>({ data, columns, contextItem,getDataForContext,isLoading }: ITable<T>) {

  if (isLoading) return <div className={'absolute left-1/2 top-1/2 z-10  -translate-x-1/2 -translate-y-1/2'}>
    <AiOutlineLoading3Quarters size={34} className={'animate-spin  text-border'}/></div>

  if (!data) return <div className={'absolute left-1/2 top-1/2 z-10  -translate-x-1/2 -translate-y-1/2'}>
    <p >Данные не найдены</p></div>;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

  });
  return (
      <table
          className={cn('w-full h-full mb-[60px] p-1 ', style.divTable)}
      >
        <thead className={'bg-table-body text-text  w-full  '}>
        {table.getHeaderGroups().map((headerGroup) => (
            <tr className={cn('text-sm whitespace-nowrap', style.tr)} key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                    <th key={header.id}
                        className={
                          style.th
                        }
                        {...{
                          colSpan: header.colSpan,

                        }}
                    >
                      {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                );
              })}
            </tr>
        ))}
        </thead>

        <tbody className={'bg-table-body  text-sm whitespace-nowrap text-center text-cell'}>
              {table.getRowModel().rows.map((row) => (
                  contextItem && getDataForContext ? (
                  <TableContextMenu key={row.id} row={row} contextItem={contextItem}
                                    getDataForContext={getDataForContext}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                          <td key={cell.id}
                              className={cn(`align-middle max-h-[50px] text-text`, style.td)}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                      );
                    })}
                  </TableContextMenu>
                  ) : (
                      <tr className={`h-[50px] cursor-pointer ease-linear duration-300 hover:bg-table-hover `} key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                          return (
                              <td key={cell.id}
                                  className={cn(`align-middle max-h-[50px] text-text`, style.td)}
                              >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                          );
                        })}
                      </tr>
                  )
              ))}


        </tbody>

      </table>

  );
}
