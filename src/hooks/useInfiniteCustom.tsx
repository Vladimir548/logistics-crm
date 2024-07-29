import { QueryKey, useInfiniteQuery} from "@tanstack/react-query";
import {useEffect, useMemo, useState} from "react";
import {ISelectItem} from "@/components/combobox/Combobox";



interface IQueryFn {
    data: { id: number; [key: string]: any }[];
    count: number;
    takeCount: number;
    totalPage:number
}

interface IInfiniteCustom<TData extends IQueryFn> {
    queryKey: QueryKey;
    queryFn: ( pageParam:number,search?:string) => Promise<TData>;
    search?: string;
    nameField?: any
    enabled?: boolean

}

export default function useInfiniteCustom<TData extends IQueryFn>({  queryFn, queryKey,search,nameField,enabled }: IInfiniteCustom<TData >) {

    const { data, isFetchingNextPage,isPending, isFetching, fetchNextPage, hasNextPage } =
        useInfiniteQuery({
            queryKey: [...queryKey, search],
            queryFn: ({ pageParam = 0 }) => queryFn( pageParam, search ? search : '' ),
            initialPageParam: 0,
            getNextPageParam: (lastPage, pages) => {
                const totalItems = pages.reduce((acc, page) => acc + page?.data?.length, 0);
                if ( !lastPage ||  totalItems >= lastPage.count ) {
                    return undefined;
                }
                return  totalItems
            },
enabled:enabled,
        });

    const allRows = useMemo(()=>{
        return  data ? data?.pages.flatMap((d) => d?.data) : []
    },[data]);
    const [items, setItems] = useState<ISelectItem[]>([]);
    const count = data?.pages[0]?.count;
    if (nameField){
    useEffect(() => {
        const itemsObj = allRows.map(item => ({
            id: item?.id,
            name: item && item[nameField] !== undefined ? item[nameField] as string : '',
        }));
        setItems(itemsObj);
    }, [data, nameField]);
    }
    return { items, data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage,count,allRows,isPending };
}
