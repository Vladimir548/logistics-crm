import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
    useReactTable,
} from '@tanstack/react-table';
import style from './table.module.scss';
import cn from 'classnames';
import {IContextItem} from "@/app/(home)/_ui/Registry";
import Loading from "@/components/loading/Loading";
import {useMemo} from "react";
import useInfiniteCustom from "@/hooks/useInfiniteCustom";
import {QueryKey} from "@tanstack/react-query";
import useVirtual from "@/hooks/useVirtual";
import TableContextMenu from "@/components/table/TableContextMenu";

import ScrollAreaCustom from "@/components/scroll-area/ScrollAreaCustom";
import useSearch from "@/hooks/useSearch";


interface ITable<T>{
    columns: ColumnDef<T,any>[];
    contextItem?: IContextItem[];
    getDataForContext?:(row:Row<T>) => void
    queryFn: ( pageParam:number, search?:string ) => Promise<any>;
    queryKey: QueryKey;
}

export default function Table<T>({ columns, contextItem, getDataForContext, queryFn, queryKey }: ITable<T>) {
    const search = useSearch()
    const {
        data,
        count,
        isFetchingNextPage,
        fetchNextPage,
        isFetching,
        isPending,
        hasNextPage
    } = useInfiniteCustom({
        queryFn: (pageParam: number, search?: string) => queryFn(pageParam, search),
        queryKey,
        search: search ? search : ''
    })
    const allRows = useMemo(
        () => data?.pages?.flatMap(page => page.data) ?? [],
        [data]);
    const table = useReactTable({
        data: allRows || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        defaultColumn: {
            size: 200,
            minSize: 50,
            maxSize: 500,
        },
    });
    const {rows} = table.getRowModel()
    const {rowVirtualizer, parentRef} = useVirtual({
        rowsLength: rows.length,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        totalCount: count ? count : 0
    })

    if (isPending) return (
        <div className={'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'}>
            <Loading size={34}/>
        </div>
    );

    if (!data) return (
        <div className={'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'}>
            <p>Данные не найдены</p>
        </div>
    );
    if (search && count === 0) return <div
        className={'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'}>
        <p>По запросу ничего не найдено</p>
    </div>

    return (
        <ScrollAreaCustom ref={parentRef}
                          style={{
                              overflow: 'auto',
                              position: 'relative',
                              height: 'calc(100vh - 62px)',
                          }}>

            <table style={{display: 'grid'}}>
                <thead className={' border-b border-b-border bg-table-body/50 backdrop-blur-xl text-text  w-full'}
                       style={{
                           display: 'grid',
                           position: 'sticky',
                           top: 0,
                           zIndex: 1,
                       }}
                >
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr style={{display: 'flex', width: '100%'}} className={cn('text-sm whitespace-nowrap ', style.tr)}
                        key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}
                                className={cn('justify-center items-center', style.th)}
                                {...{
                                    colSpan: header.colSpan,
                                }}
                                style={{
                                    display: 'flex',
                                    width: header.getSize(),
                                }}
                            >
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>

                <tbody style={{
                    display: 'grid',
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    position: 'relative',
                }} className={'bg-table-body text-sm mr-[10px] mb-[10px]  text-center text-cell'}>
                {rowVirtualizer.getVirtualItems().map(virtualRow => {
                    const row = rows[virtualRow.index] as Row<any>;
                    return (
                        contextItem && getDataForContext ? (
                            <TableContextMenu virtualRow={virtualRow} key={row.id} row={row} contextItem={contextItem}
                                              getDataForContext={getDataForContext}>
                                {row.getVisibleCells().map((cell) => {
                                    return (

                                        <td style={{
                                            display: 'flex',
                                            width: cell.column.getSize(),
                                            height: '100%'
                                        }} key={cell.id}
                                            className={cn(` justify-center overflow-hidden border-r border-text-dark items-center h-full   max-h-[50px] text-text`)}
                                        >
                                            <span
                                                className={'line-clamp-1 px-1   text-left'}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                                        </td>

                                    );
                                })}
                            </TableContextMenu>
                        ) : (
                            <tr key={row.id}
                                style={{
                                    display: 'flex',
                                    position: 'absolute',
                                    transform: `translateY(${virtualRow.start}px)`,
                                    width: '100%',
                                    height: '50px'
                                }}
                                className={`cursor-pointer ease-linear rounded-sm duration-300 hover:shadow-[inset_0px_0px_7px_3px] hover:shadow-text `}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td style={{
                                            display: 'flex',
                                            width: cell.column.getSize(),
                                            height: '100%'
                                        }} key={cell.id}
                                            className={cn(` justify-center overflow-hidden border-r border-text-dark items-center h-full   max-h-[50px] text-text`)}
                                        >
                                            <span
                                                className={'line-clamp-1 px-1 text-left'}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                                        </td>
                                    );
                                })}
                            </tr>
                        )
                    );
                })}
                </tbody>
            </table>
            <div className={'flex justify-center items-center'}>
                {isFetching && !isFetchingNextPage ? <Loading size={22}/> : null}
            </div>

        </ScrollAreaCustom>
    );
}
